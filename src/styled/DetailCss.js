import React from "react";
import styled from "styled-components";

const Title = styled.h1`
    display : flex;
    margin-top : 25px;
    font-size : 3em;
    text-align : left;
`;
const UpdateButton = styled.div`
    display : flex;
    justify-content : space-between;
    margin-top : 5%;
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
    border : 2px solid white;
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
    ::placeholder {
        font-size : 18px;
        color : lightgray;
        padding : 3%;
    }
`;

const Button = styled.button`
    display : box;
    margin-top : 1rem;
    margin-left : 1rem;
    width : 110px;
    height : 32px;
    color : white;
    background : #12b886;
    border : transparent;
    border-radius : 4px;
    font-weight : bolder;
    font-size : 16px;
    cursor:pointer;
    &:hover {
        background : #20C997;
    }
`;

const CommProfile = styled.div`
    display : flex;
    justify-content : space-between;
    margin-top : 10%;
    height : 50px;
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

const Profile2 = styled.div`
    width : 50px;
    height : 50px;
    border-radius :50%;
    border : 2px solid white;
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

export { Title, UpdateButton, Container, Profile, Nickname, CommentCount, Input, Button, CommProfile, Profile2 }
