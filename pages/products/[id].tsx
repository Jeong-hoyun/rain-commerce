import {GetServerSidePropsContext } from 'next'
import axios from 'axios'
import { products } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { EditorState, convertFromRaw } from 'draft-js';
import Image from 'next/image';

export async function getServerSideProps(context:GetServerSidePropsContext) {
    try {
        const products=await axios.get(
            `http://localhost:3000/api/products?id=${Number(context.params?.id)}`)
        const data:{item:products}=await products.data  
        return {
            props:{
              products:{
               ...data,images:[data.item.image_url,data.item.image_url]
              }       
            }                  
           }
        } catch (error) {
            console.dir(error)
        }
  }



export default function Product(props:{
    products:products&{images:string[]}
}) {
   const [index,setIndex]=useState(0)
   const [editorState,setEditorState]=useState<EditorState|undefined>(
    ()=>props.products.contents?EditorState.createWithContent(
        convertFromRaw(JSON.parse(props.products.contents))
    ):EditorState.createEmpty())
   const router=useRouter()
   const {id:productId}=router.query
   const product=props.products


  return (
    <div>
   {product.images.map((url,idx)=>{
    return(
<div>
<Image
key={`${url}-main-img-${idx}`}
src={url}
alt="img"
width={100}
height={60}
layout="responsive"
/>

</div>

    )
      
 

   })}

    </div>
  )
}
