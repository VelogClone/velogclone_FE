import React from "react";
import { useNavigate } from "react-router-dom";

const Detail = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>상세페이지</div>
            <button onClick={() => navigate("/")}> 메인페이지 이동
            </button>
        </div>
    )
}

export default Detail;