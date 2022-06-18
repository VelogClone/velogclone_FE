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
    // console.log(postId)  
    // console.log(post_card[postId]);
    useEffect(()=> {
       dispatch(detailpostAPI(postId));
    },[])   
    const post_card = useSelector((state) => state.post.card) 

    return (
        <div>
            <h1>{post_card.postTitle}</h1>
            <div><button>수정</button>
            <button>삭제</button></div>
            <div><p>{post_card.userId}</p><p>{post_card.postDate}</p></div>
            <div><textarea></textarea></div>
            <div><img src={post_card.postImage} alt= "null"/></div>
            <div><img src={post_card.userImage} alt= "null"/>, 
            {post_card.nickname}</div>
            <div>{post_card.commentCount}</div>  
            <button onClick={() => navigate("/")}> 메인페이지 이동
            </button>
        </div>
    )
}

export default Detail;