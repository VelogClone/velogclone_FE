import React from "react";
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';


export const ToastUI = () => {
   
    const defaultOpt = {
        previewStyle: "vertical",
        initialEditType: "wysiwyg",
        height: "1137px",
        useCommandShortcut: true,
        previewHighlight: false,
        language: "ko-KR"
    }

    const resultOpt = {
        ...defaultOpt,
    }

    const editorRef = React.useRef()
    const [data, setData] = React.useState();
    const [dataMark, setDataMark] = React.useState();
    console.log(data, dataMark);

    const onChange = () => {
        // 입력창에 입력한 내용을 HTML 태그 형태로 취득
        setData(editorRef.current?.getInstance().getHTML());
        // 입력창에 입력한 내용을 MarkDown 형태로 취득
        setDataMark(editorRef.current?.getInstance().getMarkdown());
    };

    const uploadImage = async(blob) => {
        const formData = new FormData();
        formData.append('image', blob);
        /////
    }

    const onUploadImage = async (blob, callback) => {
        console.log(blob);
        const url = await uploadImage(blob);
        callback(url, "alt text");
        return false;
    }

    return (
        <div >
            <h3>### Editor Toast</h3>
            <Editor
                {...resultOpt}
                ref={editorRef}
                onChange={onChange}
                placeholder="내용을 입력해주세요."
                initialEditType="markdown"
                height="600px"
                toolbarItems={[
                    ['heading', 'bold', 'italic', 'strike'],
                    ['hr', 'quote'],
                    ['ul', 'ol', 'task', 'indent', 'outdent'],
                    ['table', 'image', 'link'],
                    ['code', 'codeblock']
                ]}
                hooks={{
                    addImageBlobHook: onUploadImage
                }}
            ></Editor>
        </div>
    )
};