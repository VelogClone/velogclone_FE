import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import ControlledOpenSelect from './Dropdown';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <>
            <Container>
                <span className='header' onClick={() => { navigate('/') }} >velog</span>
                <div style={{ display: "flex", alignItems: "center" }} >
                    <div style={{ marginRight: '30px' }}>
                        <FaMoon />
                        <BsFillSunFill />
                    </div>
                    <LoginBtn onClick={openModal} >로그인</LoginBtn>
                    <Modal open={modalOpen} close={closeModal} header="Modal heading">
                        <main style={{ color: "black" }}>
                            ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                        </main>
                        에 내용이 입력된다. 리액트 함수형 모달
                        팝업창입니다. 쉽게 만들 수 있어요. 같이 만들어봐요!
                    </Modal>
                    <ControlledOpenSelect></ControlledOpenSelect>
                </div>
                <div style={{
                    width: '15%', height: '100px', backgroundColor: 'red',
                    position: 'absolute', top: "100%", right: 0
                }}> </div>

            </Container>

        </>
    )

}

const Container = styled.div`
    background-color: black;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding:10px;
    position: relative;
`;

const LoginBtn = styled.span`
    background-color: white;
    color: black;
    padding: 2px;
    margin:0 30px;
    border-radius:20px;
    padding: 13px 17px;
`;










const MenuBox = styled.div`
    margin:0 30px;
    border: 2px solid white;
    // color:white;
    padding: 5px;
    border-radius:20px;
    max-heigth: 30px;
    // & > li {
    //     display:none;
    // }
    // &:hover > li {
    //     display:block;
    // }

    `
export default Header;