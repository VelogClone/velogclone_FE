import React, { useState } from 'react';
// import '../../../assets/css/modal.css';
import styled, { isStyledComponent } from 'styled-components';
import { Button, Input } from '../elements';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUserMW } from '../redux/modules/user';
import { authApi } from '../shared/api';
export const SignUp = ({ onClick, signUp }) => {
    const dispatch = useDispatch();

    const regExpId = /^[0-9a-zA-Z]+$/;  // 영문 숫자면 됨 
    const regExpPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/; //영문,숫자,특문 최소 하나씩 최소8자리이상

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [pw_check, setPw_check] = useState('');
    const [nick, setNick] = useState('');

    const fileInput = React.useRef();
    // const [fileName, setFileName] = useState('');
    const [fileImage, setFileImage] = useState('');

    const sign_up = () => {

        if (!regExpId.test(id) || id === '') {
            alert('올바른 아이디 형식이 아닙니다!')

            return;
        }

        if (!regExpPw.test(pw) || pw === '') {
            alert('올바른 비밀번호 형식이 아닙니다!')
            return;
        }
        if (pw !== pw_check) {
            alert('비밀번호가 일치하지 않습니다!')
            return;
        }

        let formData = new FormData();
        formData.append("nickname", id);
        formData.append("password", pw);
        formData.append("passwordCheck", pw_check);
        formData.append("userImage", fileInput?.current.files[0]);
        for (let value of formData.values()) {
            console.log(value);
        }
        const data = {
            id: id,
            pw: pw,
        }
        // authApi.signUp(formData);
        authApi.signUp(data);

    }
    const selectFile = (e) => {
        // setFileName(e.target.value.split('\\')[2]);
        setFileImage(URL.createObjectURL(fileInput.current.files[0]));
    };


    return (
        <div style={{
            width: "300px",
            height: "400px",
            margin: 'auto',
        }}>
            <h3>회원가입</h3>
            <div>
                <Input
                    placeholder='아이디를 입력하세요.'
                    width="57%"
                    _onChange={(e) => {
                        setId(e.target.value);
                    }}
                />
                <Button width='33%'>중복확인</Button>
            </div>


            <Input placeholder='비밀번호를를 입력하세요.' width="92.8%"
                _onChange={(e) => {
                    setPw(e.target.value);
                }}
            />

            <Input placeholder='비밀번호를 다시 입력하세요.' width="92.8%"
                _onChange={(e) => {
                    setPw_check(e.target.value);
                }}
            />

            <Button width="100%" _onClick={() => { sign_up() }} >회원가입</Button>





            <p>프로필 사진을 올려주세요! (선택)</p>

            <div style={{
                marginTop: '15px',
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                alignItems: 'center',
            }}>
                <img
                    style={{ width: "100px", height: "100px" }}
                    src={fileImage ? fileImage : 'https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11eb-93ec-c0330dff399b.jpg'}
                ></img>
                <div>
                    <input type="file" ref={fileInput} id='file' style={{ display: 'none' }} onChange={selectFile}></input>
                    <Button>
                        <label htmlFor='file' style={{ cursor: 'pointer' }}>사진 업로드</label>
                    </Button>

                </div>
            </div>


        </div >
    )
}
