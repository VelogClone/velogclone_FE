import styled from "styled-components";

const CardProfile = styled.div`
    display : flex;
    justify-content : space-between;
    margin-top : -10px;
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
    width : 30px;
    height : 30px;
    border-radius :50%;
    border : 2px solid black;
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

export {CardProfile, Profile}