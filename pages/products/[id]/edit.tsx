import {useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import { EditorState, convertToRaw,convertFromRaw} from 'draft-js';
import axios from 'axios';
import CustomEditor from './../../../components/common/editor';

const Editor = () => {

     const [editorState,setEditorState]=useState<EditorState|undefined>(undefined)
     const [itemName,setItemName]=useState<string>("")
     const router=useRouter()
     const {id:productId}=router.query
     useEffect(()=>{
      const setEditData=async()=>{
        if(productId!=null){
          const res=await axios.get(`/api/products?id=${productId}`)
          const data=await res.data
          setItemName(data.item.name)     
          if(data.item.contents){
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.item.contents))
              )
            )
         
          }else{   setEditorState(EditorState.createEmpty())
          }}}
      setEditData()
   
},[productId])


     const onSave= async()=>{
      try {
      const res= await axios.post('/api/product',
      {     
            productId:productId,
            itemContents:
              editorState?
              JSON.stringify( convertToRaw(editorState.getCurrentContent()))
              :  null           
        
        })
        console.log(res)
        alert("저장되었습니다")
      } catch (error) {
        console.error(error)
      }
     
     }

   return(
    <>
       {itemName&&`${itemName}에 대한 설명을 입력해주세요` }
    {editorState!=null&&    
       <CustomEditor
       editorState={editorState}
       onEditorStateChange={setEditorState}
       onSave={onSave}
       />
    } 
    </>
   )


  
};

export default Editor;