import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { BiTrendingUp, BiUser } from "react-icons/bi";
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
    const [scrollPosition, setScrollPosition] = useState(0);
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
    });

    return (
        <>
            <Container scrollPosition={scrollPosition}>
                <span className='header' onClick={() => { navigate('/') }} >velog</span>
                <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }} >
                    <div style={{ marginRight: '15px', marginTop: "-8px" }}>
                        <BsFillSunFill size="27px" />
                    </div>
                    {!is_login && <Btn onClick={openModal} >로그인</Btn>}
                    <AiOutlineMenu
                        size="27px"
                        style={{ marginTop: "-10px", float: "right" }}
                        className='menu-btn'
                        onClick={() => { setDrop(!drop) }}
                    />
                    {is_login && <Btn onClick={logout} >로그아웃</Btn>}

                    {/* <ControlledOpenSelect></ControlledOpenSelect> */}
                    <Modal open={modalOpen} close={closeModal} header="Modal heading">

                    </Modal>

                </div>
                <DropdownMenu onClick={() => { setDrop(!drop) }} drop={drop} >
                    <li onClick={() => navigate('/write')} >글 작성</li>
                    <li>ㅇㅇㅇ</li>
                    <li>ㅇㅇㅇ</li>
                </DropdownMenu>
            </Container>
            <div className='category'>
                <div><BiTrendingUp size="25px" style={{ marginBottom: "-8px", marginRight: "5px" }} />트렌딩</div>
                <div><BiUser size="25px" style={{ marginBottom: "-5px", marginRight: "5px" }} />내가 쓴 글</div>
            </div>
            <hr className='categoryLine'/>

            <Line />
        </>
    )

}

const Container = styled.div`
    background-color: #F8F9FA;
    display: ${(props) => (props.scrollPosition < 300 ? 'flex' : 'none')};
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding:10px;
    position: relative;
`;

const Btn = styled.span`
    background-color: black;
    color: white;
    font-weight : bolder;
    padding: 2px;
    margin: 0 25px;
    margin-top : -10px;
    border-radius:20px;
    padding: 6px 16px;
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
    right: 0%;
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
`;

const Line = styled.hr`
    margin : -10px 0 10px 0;
    height: 20px;
    border: 0;
    box-shadow: inset 0 7px 12px -12px rgba(0, 0, 0, 0.2);
`;


export default Header;

