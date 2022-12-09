
import { PrismaClient } from '@prisma/client';
import jwtDecode from 'jwt-decode';
import type {NextApiRequest,NextApiResponse} from 'next';

const prisma=new PrismaClient()

async function signUp(credential:string) {
    const decoded:{name:string,email:string, picture:string}=jwtDecode(credential)   
    try {
     const response=await prisma.user.upsert({
        where:{
            email:decoded.email
        },
        update:{
            name:decoded.name,
            image:decoded.picture
        },
        create:{
            email:decoded.email,
            name:decoded.name,
            image:decoded.picture
        }
     })
     return response
    } catch (error) {
        console.error(error)
    }
}


export default async function handler(
    req:NextApiRequest,res:NextApiResponse<{item?:any,msg:string}>
    ) {    
          try {   
          const {credential}=req.query           
          const login=await signUp(String(credential))
          console.log(login) 
          res.status(200).json({item:login,msg:"success"})  
          return;          
        }catch(error){
            res.status(400).json({msg:"Failed"}) 
        }
    
}