import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import ControlledOpenSelect from './Dropdown';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux/es/exports';
import { } from '../header.css';
import { deleteUser } from '../redux/modules/user';
import { useDispatch } from 'react-redux/es/exports';
const Header = () => {
    const is_login = useSelector(state => state.user.is_login);
    console.log(is_login)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [drop, setDrop] = useState(false);


    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const logout = () => {
        dispatch(deleteUser());
    }
    return (
        <>
            <Container>
                <span className='header' onClick={() => { navigate('/') }} >velog</span>
                <div style={{ display: "flex", alignItems: "center" }} >
                    <div style={{ marginRight: '30px' }}>
                        <FaMoon />
                        <BsFillSunFill />
                    </div>
                    {!is_login && <Btn onClick={openModal} >로그인</Btn>}
                    <AiOutlineMenu
                        className='menu-btn'
                        onClick={() => { { setDrop(!drop) } }}
                    />
                    {is_login && <Btn onClick={logout} >로그아웃</Btn>}

                    {/* <ControlledOpenSelect></ControlledOpenSelect> */}
                    <Modal open={modalOpen} close={closeModal} header="Modal heading">
                        <main style={{ color: "black" }}>
                            ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                        </main>
                        에 내용이 입력된다. 리액트 함수형 모달
                        팝업창입니다. 쉽게 만들 수 있어요. 같이 만들어봐요!
                    </Modal>

                </div>
                <DropdownMenu drop={drop}>
                    <li onClick={() => navigate('/write')} >글 작성</li>
                    <li>ㅇㅇㅇ</li>
                    <li>ㅇㅇㅇ</li>
                </DropdownMenu>
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

const Btn = styled.span`
    background-color: white;
    color: black;
    padding: 2px;
    margin:0 30px;
    border-radius:20px;
    padding: 10px 14px;
    cursor: pointer;
`;

const DropdownMenu = styled.ul`
    // display: ${(props) => (props.drop ? 'block' : 'none')};
    max-height:${(props) => (props.drop ? '' : '0')};
    overflow: hidden;
    width: 200px;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 100%;
    right: 0;
    & > li {
        padding: 10px;
        cursor: pointer;
    }
    & > li:hover {
        color: rgba(150, 242, 215, 1);

    }
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

