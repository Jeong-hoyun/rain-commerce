import { PrismaClient } from '@prisma/client';
import type {NextApiRequest,NextApiResponse} from 'next';

const prisma=new PrismaClient()

async function updateProduct(productId:number,itemContents:string) {
  console.log(productId)
    try{
      const response=await prisma.products.update({
        where:{
            id:productId,
        },
        data:{
            contents:itemContents
        }
      })
      return response
    }catch(e){
      console.error(e)
    }
    
}


type Data={
  item?:any,
  msg:string
}


export default async function handler(
    req:NextApiRequest,res:NextApiResponse<Data>
    ) {
      const {productId,itemContents}=JSON.parse(req.body)      
      if(productId===null||itemContents==null){
        res.status(400).json({msg:"no id or contents"})
        return;   
      }
        try {              
          const product=await updateProduct(Number(productId),itemContents) 
          res.status(200).json({item:product,msg:"success"})        
           
        }catch(error){
            res.status(400).json({msg:"Failed"}) 
        }
    
}



