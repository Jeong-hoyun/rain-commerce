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

async function takeProduct(skip:number,take:number) {
    try {
        const response =await prisma.products.findMany(
            {
               skip:skip,
               take:take
            }
        )   
        return response       
    } catch (error) {
        console.error(error)
    }
}

async function countProduct() {
    try {
        const response =await prisma.products.count()   
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
            const {skip,take}=req.query
            const {count}=req.query      
          if(count!=null){
            const response=await countProduct() 
            res.status(200).json({item:response,msg:"success"})
          }else if(skip!=null&&take!=null){
                const response=await takeProduct(Number(skip),Number(take)) 
                res.status(200).json({item:response,msg:"success"})
            }else if(id===undefined){
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