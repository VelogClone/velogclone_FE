import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ToastEditor from '../components';
import { Button, Input } from '../elements';
import { addPostDB, updatePostDB } from '../redux/modules/post';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { postApi } from '../shared/api';
const FormPage = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const fileInput = useRef();
    // const [fileName, setFileName] = useState('');
    const [fileImage, setFileImage] = useState('');
    const [inputText, setInputText] = useState('');
    const [areaText, setAreaText] = useState('');
    const [card, setCard] = useState('');

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
        postApi.detail(id).then((res) => {
            console.log(res, "수정 페이지 로드 성공")
            setCard(res.data.post);
        })
            .catch((err) => {
                console.log(err.response.data, "수정 페이지 로드 오류");
            })
    }, [])

    const writeClick = () => {
        if (!(inputText && fileInput.current.files[0] && areaText)) {
            alert('모든 항목을 다 입력해주세요.')
            return;
        }
        let formData = new FormData();

        formData.append("postTitle", inputText);
        formData.append("postImage", fileInput?.current.files[0]);
        formData.append("postContent", areaText);
        const data = getData();

        dispatch(addPostDB(data))
        navigate(-1);
    }

    const updateClick = () => {
        const data = getData();
        dispatch(updatePostDB(id, data));
        navigate('/');
    }
    return (
        <div style={{ display: 'flex', color: 'white' }}>
            <WriteContainer>
                <InputTitle
                    placeholder='제목을 입력하세요'
                    onChange={(e) => { setInputText(e.target.value) }}
                    defaultValue={card.postTitle}
                />
                <Line />


                <div style={{
                    marginTop: '15px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    alignItems: 'center',
                }}>
                    <img style={{ width: "400px", height: "300px" }}
                        src={mode === 'write' ? (fileImage ? fileImage : null)
                            : (fileImage ? fileImage : card.postImage)
                            // mode === 'write'
                            //   ? fileImage
                            //     ? fileImage
                            //     : null
                            //   : fileImage
                            //     ? fileImage
                            //     : commercial?.img
                        }
                        alt=''
                    ></img>
                    <div>
                        <input
                            id='file'
                            ref={fileInput}
                            type='file'
                            style={{ display: 'none' }}
                            onChange={selectFile}
                        />
                        <Button><label htmlFor='file' style={{ cursor: 'pointer' }}>
                            사진 업로드
                        </label></Button>
                    </div>
                </div>
                <Textarea
                    placeholder="내용을 입력하세요."
                    onChange={(e) => { setAreaText(e.target.value) }}
                    defaultValue={card.postContent}
                />
                <Footer>
                    <span
                        style={{
                            color: 'white',
                            backgroundColor: 'inherit',
                            padding: '8px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                        }}
                        onClick={() => { navigate(-1); }}
                    >나가기</span>
                    {mode === 'write' ? <Button _onClick={writeClick} >출간하기</Button>
                        : <Button _onClick={updateClick} >수정하기</Button>
                    }
                </Footer>

            </WriteContainer >

            <LeftContainer>

            </LeftContainer>
            <div>
            </div>
        </div >
    )
}

const WriteContainer = styled.div`
    width:50vw;
    height:100vh;
    background-color:#121212;
`;
const LeftContainer = styled.div`
    width:50vw;
    height:100vh;
    background-color:black;
`;

const ViewContainer = styled.div`
    width:50vw;
    height:100vh;
    background-color:black;
        
`;

const InputTitle = styled.input`
    width:100%;
    font-size: 2rem;
    outline: none;
    background-color: inherit;
    border :none;
    color: white;
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