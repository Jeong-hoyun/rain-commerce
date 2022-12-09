import { useQuery } from '@tanstack/react-query';
import { products } from '@prisma/client';
import { useState } from 'react';
import { TAKE } from './../config/index';
import axios from 'axios';

const useProducts=()=>{
    const [activePage,setPage]=useState<number>(0)
    const [selectedCategory,setCategory]=useState<string>("-1")
    const [selectedFilter, setFilter] = useState<string|null>(FILTERS[0].value);
    
    const {data:products}=useQuery<{item:products[]},unknown,products[]>(
        [`/api/products?skip=${
          TAKE*(activePage-1)<0?1:TAKE*(activePage-1)    
        }&take=${TAKE}&category=${selectedCategory}&filter=${selectedFilter}&keyword=${debouncedKeyword}`
      ],
      ()=>
      axios.get(`/api/products?skip=${
        TAKE*(activePage-1)<0?1:TAKE*(activePage-1)    
      }&take=${TAKE}&category=${selectedCategory}&filter=${selectedFilter}&keyword=${debouncedKeyword}`)
      ,
      {   
        select:({data})=>data.item
      }
      )

      return {
        products,
        activePage,
        setPage,
        selectedCategory,
        setCategory,
        selectedFilter,
        setFilter
      }

}

export default useProducts