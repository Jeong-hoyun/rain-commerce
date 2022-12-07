
import { products } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { Pagination } from '@mantine/core';

const TAKE=9
export default function Products() {
    const [activePage,setPage]=useState<number>(0)
    const [total,setTotal]=useState<number>(0)
    const [products,setProducts]=useState<products[]>([])

    useEffect(()=>{
        const setItems=async ()=>{
         const response=await axios.get(`/api/products?skip=0&take=${TAKE}`)
         const data=await response.data
         setProducts(data.item)
        }
        const setCount=async ()=>{      
            const response=await axios.get(`/api/products?count=1`)
            const data=await response.data        
            setTotal(Math.ceil(data.item/TAKE))
        }
        setCount()
        setItems()
    },[])
   
  useEffect(()=>{
    const skip=TAKE*(activePage-1)
    axios.get(`/api/products?skip=${skip}&take=${TAKE}`)
    .then(data=>setProducts(data.data.item))
  },[activePage])

    return (
        <>
        <div className='flex flex-wrap -m-4'>
            {products&&products.map((item:products)=>{
               const {id,name,image_url,category_id}=item  
               const price=new Intl.NumberFormat('ko-KR',{
                style:"currency",
                currency:"krw"
               }).format(item.price)  

               return(
                <>
                <div key={`${id*Math.random()} uniq${name}`} className="p-4 lg:w-1/3 ">
                 <p>{name}</p>
                <Image 
                 src={`${image_url}`}
                 height={252}
                 width={252}
                 alt={name}
                 placeholder="blur"
                 blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8b8FQDwAFLQG463LdcAAAAABJRU5ErkJggg=="                 
                 />     

            <div className="text-center ">
            <span className="text-gray-400 mr-3  items-center leading-none text-sm pr-3 py-1 border-gray-200">
              가격:{price}
            </span>
            <span className="text-gray-400  items-center leading-none text-sm">
           <span>카테고리:{category_id===2&&"우의"}</span>
            </span>
          </div>    
        </div>
       </>
               )
            })}
              <div className='w-full flex mt-5 justify-center'>         
          <Pagination page={activePage} onChange={setPage} total={total}  />
          </div>
        </div>
        </>
    )
  
}
