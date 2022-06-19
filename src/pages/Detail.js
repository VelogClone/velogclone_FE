import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { postApi, commentApi } from "../shared/api";
import { Title, UpdateButton, Container, Profile } from "../styled/DetailCss";

const Detail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const postId = params.id;
    // console.log(postId)
    //해당 게시물 가져오기 
    const [card, setCard] = useState(0);
    //게시물에 등록된 코멘트 가져오기
    const [comment, setComment] = useState([]);

    useEffect(() => {
        postApi.detail(postId).then((res) => {
            console.log(res, "상세페이지 포스트업로드 성공")
            setCard(res.data);
            console.log(card)
        })
            .catch((err) => {
                console.log(err.response.data, "상세페이지 포스트업로드 오류");
            })
        commentApi.commentList().then((res) => {
            console.log(res, "상세페이지 댓글업로드 성공")
            const commentFilter = res.data.filter((x) => x.postId == postId)
            console.log(commentFilter);
            setComment(commentFilter);
        })
            .catch((err) => {
                console.log(err.response.data, "상세페이지 댓글업로드 오류");
            })
    }, [])
    useEffect(() => {
        console.log(card, comment);
        console.log(card.postTitle, comment.comment);
    })

    return (
        <div style={{ margin: "auto", width: "80vw", maxWidth: "70%" }}>
            <Title>{card.postTitle}</Title>
            <UpdateButton>
                <div>{card.postDate}</div>
                <div>
                    <button>수정</button>
                    <button>삭제</button></div></UpdateButton>
            <Container>
                <div>{card.postContent}</div>
                <img src={card.postImage} alt="null" />
            </Container>
            <div style={{display:"relative"}}>
                <Profile>
                    <img src={card.userImage} alt="null" />,
                </Profile>
                <div>{card.nickname}</div>
            </div>
            <div>{card.commentCount}개의 댓글</div>
            <textarea>댓글을 작성하세요</textarea>
            <button>댓글작성</button>
            <div>
                {comment.map((data) => {
                    return (
                        <div key={data.commentId}>
                            <div>{data.userImage}</div>
                            <div>{data.nickname}</div>
                            <div>{data.commnetDate}</div>
                            <div>{data.comment}</div>
                            <button>수정</button>
                            <button>삭제</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Detail;