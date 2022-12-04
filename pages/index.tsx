import axios from 'axios';
import Head from 'next/head'
import {  useEffect, useState } from 'react'


export default function Home() {
   const [products,setProducts]=useState<{id:string;name:string}[]>([])

useEffect( ()=>{
  const getData= async()=>{
  const response= await axios.get('/api/products')
  const data=response.data
  setProducts(data.item)
  }  
  getData()

},[])

 return (
    <div className="flex flex-col min-h-screen bg-red overflow-hidden">
      <Head>
        <title></title>
      </Head>
      <main className="flex-grow">
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">Make your website <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 animate-pulse">wonderful</span></h1>
      {products&&products.map(item=><div key={item.id}>{item.name}</div>)}
       </main>
    </div>
  )
}
