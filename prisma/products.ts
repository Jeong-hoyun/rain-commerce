import { PrismaClient,Prisma } from "@prisma/client";

const prisma=new PrismaClient()

const productData:Prisma.productsCreateInput[]=Array.apply(
    null,Array(20)
    ).map((_,index)=>({
        name:`장화 ${index+1}`,
        contents :`{"blocks":[{"key":"feris","text":"우산입니다","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
        category_id :3,
        image_url: `/img/rainboots/Rainboots${(index+1)%10===0?10:(index+1)%10}.jpg`,
        price:Math.floor(Math.random()*(100000-20000)+20000),
    }))

async function main() {

    for (const x of productData){
        const product=await prisma.products.create({
            data:x,
        })
        console.log(`create id :${product.id}`)
    }
}

main().then(()=>{
   async()=>{
    await prisma.$disconnect()
   }
})
.catch(async(e)=>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})