import styled, { keyframes } from "styled-components";

const CardProfile = styled.div`
    display : flex;
    justify-content : space-between;
    margin-top : -10px;
    margin-bottom : -10px;
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

const Profile = styled.div`
    width : 25px;
    height : 25px;
    border-radius :50%;
    border : 2px solid transparent;
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

const CardAnimation = styled.div`
    &:hover {
        margin-top : -10px;
        box-shadow : 0 3px 10px gray;
        transition-duration :0.5s;
    }
`;


export { CardProfile, Profile, CardAnimation }