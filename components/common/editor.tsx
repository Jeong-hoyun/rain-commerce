import { NextPage } from 'next';
import { SetStateAction,Dispatch} from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import dynamic  from 'next/dynamic';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const Editor = dynamic<EditorProps>(() =>
 import('react-draft-wysiwyg').then((mod) => mod.Editor),
{
  ssr: false,

})


const CustomEditor= (
  { editorState,
    readonly=false,
    onEditorStateChange,
    onSave  
  }
  :{
    editorState:EditorState,
    readonly?:boolean,
    onEditorStateChange?:Dispatch<SetStateAction<EditorState|undefined>>,
    onSave?:()=>void
  }
  ) => {

    // toolbar 설정
    const toolbar = {
        list: { inDropdown: true }, // list 드롭다운
        textAlign: { inDropdown: true }, // align 드롭다운
        link: { inDropdown: true }, // link 드롭다운
        history: { inDropdown: false }, // history 드롭다운       
    }
    // 언어 설정
    const localization = {
        locale: 'ko',
    }
     
    return (
      <>
        <Editor
            readOnly={readonly}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            editorClassName="editor" // Editor 적용 클래스
            toolbarClassName="toolbar" // Toolbar 적용 클래스
            toolbar={toolbar} 
            placeholder="내용을 입력하세요."
            localization={localization}       
        />
        <button onClick={onSave} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          save
        </button>
        </>
        
    )
}

export default CustomEditor;