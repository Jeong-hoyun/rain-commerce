
import { categories, products } from '@prisma/client';
import axios from "axios";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Pagination, SegmentedControl,Select,Input  } from '@mantine/core';
import { TAKE,categoryArray,FILTERS } from '../../config';
import {  IconSearch } from '@tabler/icons';
import useDebounce from './../../hooks/useDebounce';


export default function Products() {
    const [activePage,setPage]=useState<number>(0)
    const [total,setTotal]=useState<number>(0)
    const [products,setProducts]=useState<products[]>([])
    const [categories,setCategories]=useState<categories[]>([])
    const [selectedCategory,setCategory]=useState<string>("-1")
    const [selectedFilter, setFilter] = useState<string|null>(FILTERS[0].value);
    const [keyword, setKeyword] = useState<string>("");

    const debouncedKeyword=useDebounce<string>(keyword)

    useEffect(()=>{
        const setItems=async ()=>{
         const response=await axios.get(`/api/products?skip=0&take=${TAKE}`)
         const data=await response.data
         setProducts(data.item)
        }
    
        const setCategory=async ()=>{      
          const response=await axios.get(`/api/categories`)
          const categories=await response.data        
          setCategories(categories.item)           
      }       
        setItems()
        setCategory()    
    },[])

   useEffect(()=>{
    const setCount=async ()=>{      
      const response=await axios.get(`/api/products?count=1&category=${selectedCategory}&keyword=${debouncedKeyword}`)
      const data=await response.data        
      setTotal(Math.ceil(data.item/TAKE))
   }
  setCount()
   },[selectedCategory,])

   
  useEffect(()=>{
      let skip=TAKE*(activePage-1)
      if(skip<0) {skip=1} 
      axios.get(`/api/products?skip=${skip}&take=${TAKE}&category=${selectedCategory}&filter=${selectedFilter}&keyword=${debouncedKeyword}`)
      .then(data=>setProducts(data.data.item))
    }
,[activePage,selectedCategory,selectedFilter,debouncedKeyword])

  const onSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setKeyword(e.target.value)
  }

    return (
        <div className='px-36 mt-10 mb-10'> 
     <div>
     <Input
      icon={<IconSearch />}
      placeholder="상품을 검색해주세요"
      onChange={onSearch}
    />
     </div>
      <Select value={selectedFilter} onChange={setFilter} data={FILTERS} />
       {categories&&
       <div className='mb-4'>
          <SegmentedControl
          value={selectedCategory}
          data={[
            {label:"ALL",value:"-1"},
            ...categories.map((ct:categories)=>({           
                 label: ct.name, value:String(ct.id) 
            })
            )]}
          onChange={setCategory}
          color={'dark'}          
        />  
        </div>      
        }
         

        <div className='flex flex-wrap -m-4'>    
            {products&&products.map((item:products)=>{
               const {id,name,image_url,category_id}=item  
               const price=new Intl.NumberFormat('ko-KR',{
                style:"currency",
                currency:"krw"
               }).format(item.price)              
               return(
                <>
                <div key={`${id*Math.random()} uniq${name}`} className="p-4 lg:w-1/3  ">
                  <Image 
                 src={`${image_url}`}
                 height={512}
                 width={512}
                 alt={name}
                 placeholder="blur"
                 blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8b8FQDwAFLQG463LdcAAAAABJRU5ErkJggg=="                 
                 />     

            <div className="text-center">
            <span className="mr-3  items-center leading-none text-sm pr-3 py-1 border-gray-200">
              {name}
            </span>
            <p>{}</p>
            <span className="text-gray-400 mr-3  items-center leading-none text-sm pr-3 py-1 border-gray-200">
              가격:{price}
            </span>
            <span className="text-gray-400  items-center leading-none text-sm">
           <span>카테고리:{categoryArray[category_id-1]}</span>
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
        </div>
    )
  
}
