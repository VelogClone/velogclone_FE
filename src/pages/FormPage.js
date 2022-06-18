import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ToastEditor from '../components/ToastEditor';
import { Button, Input } from '../elements';
const FormPage = ({ mode }) => {
    const fileInput = useRef();
    const [fileName, setFileName] = useState('');
    const [fileImage, setFileImage] = useState('');
    const [inputText, setInputText] = useState('');
    const [areaText, setAreaText] = useState('');

    const selectFile = (e) => {
        setFileName(e.target.value.split('\\')[2]);
        setFileImage(URL.createObjectURL(fileInput.current.files[0]));
    };
    return (
        <div style={{ display: 'flex' }}>
            <WriteContainer>
                <InputTitle
                    placeholder='제목을 입력하세요'
                />
                <Line />
                <Input
                    placeholder='파일을 선택해주세요.'
                    value={fileName || ''}
                    _disabled={true}
                    width='100%'
                />

                <Button width='150px'>
                    <label htmlFor='file' style={{ cursor: 'pointer' }}>
                        파일 찾기
                    </label>
                </Button>

                <input
                    id='file'
                    ref={fileInput}
                    type='file'
                    style={{ display: 'none' }}
                    onChange={selectFile}
                />
                <div style={{
                    marginTop: '15px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    alignItems: 'center',
                }}>
                    <img style={{ width: "400px", height: "300px" }} ></img>
                    <div>
                        <input type="file" style={{ display: 'none' }} ></input>
                        <Button>사진 업로드</Button>
                    </div>
                </div>
                <Textarea placeholder="내용을 입력하세요." />
                <Footer>
                    <span
                        style={{
                            color: 'white',
                            backgroundColor: 'inherit',
                            padding: '8px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                        }}
                    >나가기</span>
                    <Button>출간하기</Button>
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