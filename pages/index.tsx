import Head from 'next/head'
import Image from 'next/image'
import {  useLayoutEffect, useState } from 'react'


export default function Home() {
   const [products,setProducts]=useState<{id:string;name:string}[]>([])
useLayoutEffect(()=>{
  fetch('/api/get-products')
  .then((res)=>res.json())
  .then((data)=>setProducts(data.item))
},[])
 
console.log(products)

  return (
    <div >
      <Head>
        <title></title>
      </Head>
       <main>
       <h1>상품 리스트</h1>   
      {products&&products.map(item=><div key={item.id}>{item.name}</div>)}

       </main>
     

    </div>
  )
}
