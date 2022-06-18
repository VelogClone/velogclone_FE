import React, { useState } from 'react';
import styled, { isStyledComponent } from 'styled-components';
import { Button, Input } from '../elements';
import { useNavigate } from 'react-router-dom';


export const SignIn = ({ onClick, signUp }) => {
    const regExpId = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    const regExpPw = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [pw_check, setPw_check] = useState('');
    const [nick, setNick] = useState('');



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
                    width={signUp ? "57%" : "92.8%"}
                    _onChange={(e) => {
                        setId(e.target.value);
                    }}
                />

            </div>


            <Input placeholder='비밀번호를를 입력하세요.' width="92.8%" />


            <Button width="100%">로그인</Button>
            <div style={{ marginTop: '100px' }}>
                <p>아직 회원이 아니신가요?</p>
                <span style={{ color: '#96F2D7', cursor: 'pointer' }} onClick={onClick}>회원가입</span>
            </div>
        </div >
    )
}
