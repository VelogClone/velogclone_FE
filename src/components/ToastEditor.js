import { Editor } from '@toast-ui/react-editor';
// import { Editor } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import React from 'react';
import { addPostingDB } from '../redux/modules/post';
import { useDispatch } from 'react-redux';
import { AllInbox } from '@mui/icons-material';
import axios from 'axios';
import { postApi } from '../shared/api';
export default function ToastEditor({ text, option, card, mode }) {
    const dispatch = useDispatch();
    // const editorRef = React.useRef('');
    const editorRef = React.useRef("");
    const handleRegisterButton = () => {
        // // 입력창에 입력한 내용을 HTML 태그 형태로 취득
        // console.log(editorRef.current?.getInstance().getHTML());
        // // 입력창에 입력한 내용을 MarkDown 형태로 취득
        // console.log(editorRef.current?.getInstance().getMarkdown());

        const postInfo = {
            postTitle: text,
            postContentMd: editorRef.current.getInstance().getMarkdown(),
        }
        dispatch(addPostingDB(postInfo))
    };
    console.log(card.postContentMd)

    React.useEffect = (() => {
        if (mode === 'update') {
            editorRef.current.getInstance().setMarkdown(card.postContentMd);
        }
    }, [])

    React.useEffect(() => {
        if (editorRef.current) {
            // 기존에 Image 를 Import 하는 Hook 을 제거한다.
            editorRef.current.getInstance().removeHook("addImageBlobHook");
            // 새롭게 Image 를 Import 하는 Hook 을 생성한다.
            editorRef.current
                .getInstance()
                .addHook("addImageBlobHook", (blob, callback) => {
                    (async () => {
                        const formData = new FormData();
                        formData.append('postImage', blob);

                        await postApi.imageUpload(formData)
                            .then(res => {
                                console.log(res.data);
                                callback(res.data.postImage);

                            }).catch(err => {
                                console.log(err)
                            })



                        // let formData = new FormData();
                        // formData.append("imageFile", blob);
                        // await axapis.imgpost(
                        //   formData
                        // )
                        //   .then((res) => {
                        //     console.log(res)
                        //     const imageUrl = res.data.imageUrl;
                        //     setImgUrl(res.data.imageUrl)
                        //     setImgId(res.data.imageId)
                        //     callback(imageUrl, "image");
                        //   })
                        //   .catch((error) => console.log(error));
                    })();
                    return false;

                });
        }
        return () => { };
    }, [editorRef]);








    const defaultOpt = {
        previewStyle: "vertical",
        initialEditType: "markdown",
        height: "1137px",
        useCommandShortcut: true,
        previewHighlight: false,
        // hideModeSwitch: true,
        language: "ko-KR",
    };

    const resultOpt = {
        ...defaultOpt,
        ...option,
    };


    const onUploadImage = async (blob, callback) => {
        const formData = new FormData();
        formData.append('postImage', blob);

        await postApi.imageUpload(formData)
            .then(res => {
                console.log(res.data);
                callback(res.data.postImage);

            }).catch(err => {
                console.log(err)
            })

        return false;
    }

    return (
        <div>
            <Editor
                ref={editorRef}
                editorRef={editorRef}
                {...defaultOpt}
                initialValue={card.postContentMd}
                toolbarItems={[
                    // 툴바 옵션 설정
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
            <button onClick={handleRegisterButton}>등록</button>

        </div>
    );
}