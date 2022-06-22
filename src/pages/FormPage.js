import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
// import { Button, Input } from '../elements';
import { addPostDB, updatePostDB, updatePostingDB } from '../redux/modules/post';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { postApi } from '../shared/api';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { addPostingDB } from '../redux/modules/post';
import { BiArrowBack } from "react-icons/bi";
import axios from 'axios';

const FormPage = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
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


    return (
        <div style={{ background: "white" }}>

            <InputTitle
                placeholder='제목을 입력하세요'
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
                height="70vh"
                usageStatistics={false}
                initialEditType="markdown"
                useCommandShortcut={true}
                placeholder="당신의 이야기를 적어보세요"
                previewHighlight={false}
            />
            <BtnWrap>
                <Button1 onClick={() => navigate(-1)}><BiArrowBack/> 나가기</Button1>
                <Button2 onClick={handleRegisterButton}>
                    {mode === 'update' ? "수정하기" : "출간하기"}</Button2>
            </BtnWrap>

        </div>

    )
}


const InputTitle = styled.input`
    width:100%;
    font-size: 2rem;
    outline: none;
    background-color: inherit;
    border :none;
    height : 13vh;
    &:: placeholder { 
        font-size : calc(100% - 5px);
        font-weight : bolder;
        padding : 3%;
        color : #CED4DA ;
    }
`;

const BtnWrap = styled.div`
    width : 50vw;
    display : flex;
    margin-top: 25px;

`;

const Button1 = styled.button`
    flex : none;
    display : box;
    width : 120px;
    height : 38px;
    color : #12b886;
    background : transparent;
    border : transparent;
    border-radius : 4px;
    font-weight : bolder;
    font-size : 18px;
    cursor:pointer;
`;

const Button2 = styled.button`
    display : box;
    margin-left : auto;
    position : right;
    width : 120px;
    height : 38px;
    color : white;
    background : #12b886;
    border : transparent;
    border-radius : 4px;
    font-weight : bolder;
    font-size : 18px;
    cursor:pointer;
    &:hover {
        background : #20C997;
    }
`;

export default FormPage;