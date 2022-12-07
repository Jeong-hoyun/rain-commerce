import { PrismaClient,Prisma } from "@prisma/client";

const prisma=new PrismaClient()

const productData:Prisma.productsCreateInput[]=Array.apply(
    null,Array(100)
    ).map((_,index)=>({
        name:`우의 ${index+1}`,
        contents :`{"blocks":[{"key":"feris","text":"우의입니다","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
        category_id :2,
        image_url: `/img/coats/rainbowcoat${(index+1)%10===0?10:(index+1)%10}.jpg`,
        price:Math.floor(Math.random()*(100000-20000)+20000),

    }))

async function main() {
    await prisma.products.deleteMany({})

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