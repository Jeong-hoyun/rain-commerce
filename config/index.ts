import axios from "axios"

export const TAKE=9

export const categoryArray=["우산","우의","장화","소모품"]

export const FILTERS=[
    {
        label:"최신순",value:"latest",
    },
    {
        label:"가격 높은 순",value:"expensive",
    },
    {
        label:"가격 낮은 순",value:"cheap",
    },
]

 export const getOrderBy=(orderBy?:string)=>{
    return orderBy
    ?orderBy==='latest'
    ?{orderBy:{     createdAt:"desc" }}
    :orderBy==='expensive'
    ?{orderBy:{     price:"desc" }}
    :{orderBy:{     price:"asc" }}
    :undefined
} 

export const getContains=(keyword?:string)=>{
   return keyword&&keyword!==""
    ?{
        name:{contains:String(keyword)}
    }
    :undefined;
}

export const fetchUrl = (url:string) => axios.get(url).then(response => response.data)


