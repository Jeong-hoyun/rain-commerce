
import { categories, products } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { Pagination, SegmentedControl,Select,Input  } from '@mantine/core';
import { TAKE,categoryArray,FILTERS, fetchUrl } from '../../config';
import {  IconSearch } from '@tabler/icons';
import useDebounce from './../../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';

export default function Products() {
    const [activePage,setPage]=useState<number>(0)
    const [selectedCategory,setCategory]=useState<string>("-1")
    const [selectedFilter, setFilter] = useState<string|null>(FILTERS[0].value);
    const [keyword, setKeyword] = useState<string>("");
    const debouncedKeyword=useDebounce<string>(keyword)
    
    const {data:categories}=useQuery(['/api/categories'],
    ()=>
    fetchUrl(`/api/categories`), 
    {select:(data)=>data.item}
    )

   const {data:total}=useQuery<{item:number},unknown,number>([`/api/products?count=1&category=${selectedCategory}&keyword=${debouncedKeyword}`],
   ()=>
   fetchUrl(`/api/products?count=1&category=${selectedCategory}&keyword=${debouncedKeyword}`),
   {select:(data)=>Math.ceil(data.item/TAKE)}
   )   

const {data:products}=useQuery<{item:products[]},unknown,products[]>(
  [`/api/products?skip=${
    TAKE*(activePage-1)<0?1:TAKE*(activePage-1)    
  }&take=${TAKE}&category=${selectedCategory}&filter=${selectedFilter}&keyword=${debouncedKeyword}`
  ], ()=>
fetchUrl(`/api/products?skip=${
  TAKE*(activePage-1)<0?1:TAKE*(activePage-1)    
}&take=${TAKE}&category=${selectedCategory}&filter=${selectedFilter}&keyword=${debouncedKeyword}`)
,
{   
  select:(data)=>data.item
}
)
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
            {total?
                 <div className='w-full flex mt-5 justify-center'>         
                 <Pagination page={activePage} onChange={setPage} total={total}  />
                 </div>:null            
            }         
        </div>
        </div>
    )
  
}
