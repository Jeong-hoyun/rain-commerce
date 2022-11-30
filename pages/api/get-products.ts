import { PrismaClient } from '@prisma/client';
import type {NextApiRequest,NextApiResponse} from 'next';

const prisma=new PrismaClient()

async function getProducts() {
    try {
        const response =await prisma.products.findMany()
        console.log(response)
        return response       
    } catch (error) {
        console.error(error)
    }
}

export default async function handler(
    req:NextApiRequest,res:NextApiResponse
    ) {
        try {
         const response=await getProducts()
         res.status(200).json({item:response,msg:"success"})
            
        } catch (error) {
            res.status(400).json({msg:"Failed"}) 
        }
    
}