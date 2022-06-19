import React from "react";
import styled from "styled-components";

const Title = styled.h1`
    display : flex;
    margin-top : 25px;
    font-size : 35px;
`;
const UpdateButton = styled.div`
    display : flex;
    justify-content : space-between;
    margin-top : 10%;
    &>div{
        text-align: center;
    }
    &>div>button {
        border : 0 solid transparent;
        background : transparent;
        font-size : 14px;
        cursor : pointer;
    } 
`;

const Container = styled.div`
    width : 100%;
    height : auto;
    margin-top : 15%;
    &>div {
        text-align : left;
        margin-left: 3%;
    }
    &>img {
        object-fit: cover;
        margin: 3rem auto;
        max-width : 100%;
        width : 95%;
        height : auto;
    }
`;

const Profile = styled.div`
    width : 100px;
    height : 100px;
    margin-top : 1rem;
    border-radius :50%;
    position : relative;
    overflow:hidden;
    &>img {
        position : absolute;
        top : 0;
        left : 0;
        width : 100%;
        height : 100%;
        object-fit : cover;
    }
`;
const Nickname = styled.div`
    position : absolute;
    top : 10%;
    left : 130px;
    font-size: 22px;
    font-weight : bolder;
`;

const CommentCount = styled.div`
    display : flex;
    margin-top : 2rem;
    font-size: 20px;
    font-weight : bolder;
`;

const Input = styled.textarea`
    display : flex;
    margin-top : 1rem;
    width : 99%;
    height : 100px;
    border : 1px solid lightgray;
`;

const Button = styled.button`
    display : flex;
    margin-left:auto;
    margin-top : 1rem;
    width : 120px;
    height : 30px;
    color : white;
    font-weight : bolder;
`;

export { Title, UpdateButton, Container, Profile, Nickname, CommentCount, Input, Button }
