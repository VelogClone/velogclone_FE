import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input } from '../elements';
import { Navigate, useNavigate } from 'react-router-dom';
import { authApi } from '../shared/api';
import { useDispatch } from 'react-redux';
import { setLoginDB } from '../redux/modules/user';
export const SignIn = ({ onClick, setSignUp, close }) => {
    const dispatch = useDispatch();
    const regExpId = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    const regExpPw = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const sign_in = async () => {
        await dispatch(setLoginDB(id, pw))
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
                    placeholder='아이디를 입력하세요.'
                    width="92.8%"
                    _onChange={(e) => {
                        setId(e.target.value);
                    }}
                />

            </div>


            <Input placeholder='비밀번호를를 입력하세요.' width="92.8%"
                _onChange={(e) => { setPw(e.target.value) }}
            />


            <Button width="100%" _onClick={sign_in} >로그인</Button>
            <div style={{ marginTop: '100px' }}>
                <p>아직 회원이 아니신가요?</p>
                <span style={{ color: '#96F2D7', cursor: 'pointer' }} onClick={onClick}>회원가입</span>
            </div>
        </div >
    )
}
