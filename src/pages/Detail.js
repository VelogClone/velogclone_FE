import React, {useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { detailpostAPI } from "../redux/modules/post";

const Detail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const postId =  params.id; 
    console.log(postId) // 12번 주석, 14번 주석 = 값 매칭이 안됨. 
    const post_card = useSelector((state) => state.post.list)

    console.log(post_card);

    useEffect(()=> {
       dispatch(detailpostAPI(postId));
    },[])    

    return (
        <div>
            <h1>{post_card[postId].postTitle}</h1>
            <div><button>수정</button>
            <button>삭제</button></div>
            <div><p>{post_card[postId].userId}</p><p>{post_card[postId].postDate}</p></div>
            <div><textarea></textarea></div>
            <div><img src={post_card[postId].postImage} alt= "null"/></div>
            <div><img src={post_card[postId].userImage} alt= "null"/>, 
            {post_card[postId].nickname}</div>
            <div>{post_card[postId].commentCount}</div>  
            <button onClick={() => navigate("/")}> 메인페이지 이동
            </button>
        </div>
    )
}

export default Detail;