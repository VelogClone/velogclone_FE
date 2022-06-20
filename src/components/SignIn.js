import React, { useState } from 'react';
import { Button, Input } from '../elements';
import { useDispatch } from 'react-redux';
import { setLoginDB } from '../redux/modules/user';
import { KAKAO_AUTH_URL } from '../shared/KakaoAuth';
export const SignIn = ({ onClick, setSignUp, close }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const sign_in = async () => {
        await dispatch(setLoginDB(email, pw))
            .then(success => {
                if (success) {
                    alert('로그인 성공');
                    setSignUp(false)
                    close();
                }

            });
    }

    return (
        <div style={{
            width: "300px",
            height: "400px",
            margin: 'auto',
        }}>
            <h3>로그인</h3>
            <div>
                <Input
                    placeholder='이메일을 입력하세요.'
                    width="92.8%"
                    _onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />

            </div>


            <Input placeholder='비밀번호를를 입력하세요.' width="92.8%"
                _onChange={(e) => { setPw(e.target.value) }}
            />


            <Button width="100%" _onClick={sign_in} >로그인</Button>
            <a href={KAKAO_AUTH_URL}>
                <div
                    className="kakao_btn"
                >
                </div>
            </a>
            <div style={{ marginTop: '50px' }}>
                <p>아직 회원이 아니신가요?</p>
                <span style={{ color: '#96F2D7', cursor: 'pointer' }} onClick={onClick}>회원가입</span>
            </div>
        </div >
    )
}
