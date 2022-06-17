import React, { useState } from 'react';
// import '../../../assets/css/modal.css';
import styled, { isStyledComponent } from 'styled-components';
import { Button, Input } from '../elements';
import { useNavigate } from 'react-router-dom';
const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;
    const [signUp, setSignUp] = useState(false)
    const navigate = useNavigate();

    const handleMode = () => {
        setSignUp(!signUp);
        // navigate('/signup');
    }
    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <button className="close" onClick={() => {
                        close();
                        if (signUp) setSignUp(!signUp);
                    }}>
                        &times;
                    </button>
                    <div style={{ display: "flex", height: "450px" }} >
                        <div style={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            backgroundColor: '#5D5D5D',
                            padding: "10px"

                        }}>
                            <img src="https://static.velog.io/static/media/undraw_joyride_hnno.fae6b95e.svg" alt="welcome"></img>
                            <div>환영합니다!</div>

                        </div>
                        <ModalRight onClick={handleMode} signUp={signUp} />
                    </div>
                </section>
            ) : null}
        </div>
    );
};

export default Modal;

export const ModalRight = ({ onClick, signUp }) => {
    return (
        <div style={{
            width: "300px",
            height: "400px",
            margin: 'auto',
        }}>
            {signUp ? <h3>회원가입</h3> : <h3>로그인</h3>}
            <div>
                <Input
                    placeholder='아이디를 입력하세요.'
                    width={signUp ? "57%" : "92.8%"}
                />
                {signUp ? <Button width='33%'  >중복확인</Button> : null}
            </div>


            <Input placeholder='비밀번호를를 입력하세요.' width="92.8%" />
            {signUp ? <>
                <Input placeholder='비밀번호를 다시 입력하세요.' width="92.8%" />
            </>
                : null}
            <Button width="100%">{signUp ? "회원가입" : "로그인"}</Button>
            {!signUp ? <div style={{ marginTop: '100px' }}>
                <p>아직 회원이 아니신가요?</p>
                <span style={{ color: '#96F2D7', cursor: 'pointer' }} onClick={onClick}>회원가입</span>
            </div>
                : null}
            {signUp ? <>
                <p>프로필 사진을 올려주세요.</p>

                <div style={{
                    marginTop: '15px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    alignItems: 'center',
                }}>
                    <img style={{ width: "100px", height: "100px" }} ></img>
                    <div>
                        <input type="file" style={{ display: 'none' }} ></input>
                        <Button>사진 업로드</Button>
                    </div>
                </div>
            </>
                : null}
        </div >
    )
}
