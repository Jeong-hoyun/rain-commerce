import { PrismaClient } from '@prisma/client';
import type {NextApiRequest,NextApiResponse} from 'next';

const prisma=new PrismaClient()

async function getProducts() {
    try {
        const response =await prisma.products.findMany()     
        return response       
    } catch (error) {
        console.error(error)
    }
}

async function getProduct(id:number) {
    try {
        const response =await prisma.products.findUnique(
            {
                where:{
                    id:id
                }
            }
        )   
        return response       
    } catch (error) {
        console.error(error)
    }
}




export default async function handler(
    req:NextApiRequest,res:NextApiResponse
    ) {
     
          try {             
            const {id}=req.query 
           if(id===undefined){
                const response=await getProducts()
                res.status(200).json({item:response,msg:"success"})
                return
            }else{
                const response=await getProduct(Number(id))
                if(response===null){ throw "상품이 존재하지 않습니다" } 
                res.status(200).json({item:response,msg:"success"})
            }                 
        }catch(error){
            res.status(400).json({msg:"Failed"}) 
        }
    
}