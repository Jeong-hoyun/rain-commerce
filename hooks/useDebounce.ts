import { useEffect, useState } from "react"

const useDebounce=<T>(value:T,time=600)=>{
  const [delay,setDelay]=useState<T>(()=>value)

  useEffect(()=>{
   const timer=setTimeout(()=>{
    setDelay(value)
   },time)

   return()=>{
    clearTimeout(timer)
   }

  },[value,delay])

  return delay


}

export default useDebounce