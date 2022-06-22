import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, Input } from '../elements';
import { addPostDB, updatePostDB, updatePostingDB } from '../redux/modules/post';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { postApi } from '../shared/api';
import ToastEditor from '../components/ToastEditor';
import ToastViewer from '../components/ToastViewer';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { addPostingDB } from '../redux/modules/post';
import axios from 'axios';

const FormPage = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const fileInput = useRef();
    const [title, setTitle] = useState('');
    const editorRef = React.useRef("");

    const titleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleRegisterButton = () => {
        // // 입력창에 입력한 내용을 HTML 태그 형태로 취득
        // console.log(editorRef.current?.getInstance().getHTML());
        // // 입력창에 입력한 내용을 MarkDown 형태로 취득
        // console.log(editorRef.current?.getInstance().getMarkdown());
        console.log('작성버튼클릭')
        const postInfo = {
            postTitle: title,
            postContentMd: editorRef.current.getInstance().getMarkdown(),
        }
        if (mode === 'update') {
            dispatch(updatePostingDB(id, postInfo));
        } else
            dispatch(addPostingDB(postInfo))
    };

    useEffect(() => {
        if (mode === 'update') {
            postApi.detail(id).then((res) => {
                setTitle(res.data.post.postTitle)
                editorRef.current.getInstance().setMarkdown(res.data.post.postContentMd);
            })
                .catch((err) => {
                    console.log(err.response.data, "수정 페이지 로드 오류");
                })
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
                    })();
                    return false;

                });
        }
        return () => { };
    }, [editorRef]);

    // const updateClick = () => {
    //     // const data = getData();
    //     dispatch(updatePostDB(id, data));
    //     navigate('/');
    // }

    return (
        <>

            <InputTitle
                onChange={titleChange}
                value={title}
            />

            <Editor
                events={{
                    change: () => {
                        const data = editorRef.current.getInstance().getMarkdown();
                        editorRef.current.getInstance().setMarkdown(data);
                    },
                }}
                editorRef={editorRef}
                ref={editorRef}
                previewStyle="vertical"
                width="100%"
                height="100vh"
                usageStatistics={false}
                initialEditType="markdown"
                useCommandShortcut={true}
                placeholder="당신의 이야기를 적어보세요"
                previewHighlight={false}
            />

            <button onClick={handleRegisterButton}>
                {mode === 'update' ? "수정하기" : "출간하기"}</button>





            {/* <ToastEditor text={inputText} card={card} mode={ mode} ></ToastEditor> */}
        </>

    )
}

const WriteContainer = styled.div`
    width:50vw;
    height:100vh;
`;
const LeftContainer = styled.div`
    width:50vw;
    height:100vh;
`;

const ViewContainer = styled.div`
    width:50vw;
    height:100vh;
        
`;

const InputTitle = styled.input`
    width:100%;
    font-size: 2rem;
    outline: none;
    background-color: inherit;
    border :none;
`;
const Textarea = styled.textarea`
    width:80%;
    height:20%;
    outline: none;
    background-color: inherit;
    border :none;
    border:1px solid rgba(0,0,0,0.8);
    padding:10px;
    font-size:1.2rem;
    margin-top:10px;
    border-radius:10px;
    color:white;
    padding:10px;
`;
const Footer = styled.footer`
    height: 70px;
    display:flex;
    justify-content: space-between;
    align-items: center;
`;
const Line = styled.div`
    border:3px solid rgb(73, 80, 87);
    width : 90%;
    margin: 0 auto;

`;


export default FormPage;