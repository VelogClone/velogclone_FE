import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, Input } from '../elements';
import { addPostDB, updatePostDB } from '../redux/modules/post';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { postApi } from '../shared/api';
import ToastEditor from '../components/ToastEditor';
import ToastViewer from '../components/ToastViewer';

const FormPage = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const fileInput = useRef();
    // const [fileName, setFileName] = useState('');
    const [fileImage, setFileImage] = useState('');
    const [card, setCard] = useState('');
    const [inputText, setInputText] = useState(card?.postTitle);
    const [areaText, setAreaText] = useState('');

    const selectFile = (e) => {
        // setFileName(e.target.value.split('\\')[2]);
        setFileImage(URL.createObjectURL(fileInput.current.files[0]));
    };

    const getData = () => {

        let formData = new FormData();

        formData.append("postTitle", inputText ? inputText : card.postTitle);
        formData.append("postImage", fileInput.current.files[0] ? fileInput.current.files[0] : card.postImage)
        formData.append("postContent", areaText ? areaText : card.postContent);

        for (let value of formData.values()) {
            console.log(value);
        }
        return formData;
    }

    useEffect(() => {
        if (mode === 'update') {
            postApi.detail(id).then((res) => {
                console.log(res, "수정 페이지 로드 성공")
                setCard(res.data.post);
            })
                .catch((err) => {
                    console.log(err.response.data, "수정 페이지 로드 오류");
                })
        }
    }, [])

    // const writeClick = () => {
    //     if (!(inputText && fileInput.current.files[0] && areaText)) {
    //         alert('모든 항목을 다 입력해주세요.')
    //         return;
    //     }
    //     let formData = new FormData();

    //     formData.append("postTitle", inputText);
    //     formData.append("postImage", fileInput?.current.files[0]);
    //     formData.append("postContent", areaText);
    //     const data = getData();

    //     dispatch(addPostDB(data))
    //     navigate(-1);
    // }

    const updateClick = () => {
        const data = getData();
        dispatch(updatePostDB(id, data));
        navigate('/');
    }

    return (
        <>
            {/* <input
                type="text"
                onChange={(e) => { setInputText(e.target.value) }}
            >제목
            </input> */}
            <InputTitle onChange={(e) => { setInputText(e.target.value) }} />
            <ToastEditor text={inputText} card={card} ></ToastEditor>
        </>
        // <div style={{ display: 'flex' }}>
        //     <WriteContainer>
        //         <ToastEditor setText={setText}></ToastEditor>
        //     </WriteContainer >

        //     <LeftContainer>
        //         <ToastViewer text={text}  ></ToastViewer>

        //     </LeftContainer>
        //     <div>
        //     </div>
        // </div >
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