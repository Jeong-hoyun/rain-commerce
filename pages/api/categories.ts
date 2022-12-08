import { PrismaClient } from '@prisma/client';
import type {NextApiRequest,NextApiResponse} from 'next';


const prisma=new PrismaClient()


async function getCategories() {
    try {
        const response =await prisma.categories.findMany({})     
        return response       
    } catch (error) {
        console.error(error)
    }
}



export default async function handler(
    req:NextApiRequest,res:NextApiResponse
    ) {    
          try {              
          const categories=await getCategories() 
          res.status(200).json({item:categories,msg:"success"})  
          return;          
        }catch(error){
            res.status(400).json({msg:"Failed"}) 
        }
    
}