import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { postApi, commentApi } from "../shared/api";
import { Title, UpdateButton, Container, Profile, Nickname, CommentCount, Input, Button } from "../styled/DetailCss";

const Detail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const comment_Ref = useRef();
    const params = useParams();
    const postId = params.id;
    const userName = useSelector((state) => state.user.nickname);
    console.log(postId)
    //해당 게시물 가져오기 
    const [card, setCard] = useState('');
    //게시물에 등록된 코멘트 가져오기
    const [comment, setComment] = useState([]);

    console.log(card)
    useEffect(() => {
        console.log("왜 안되냐고...")
        postApi.detail(postId).then((res) => {
            console.log(res, "상세페이지 포스트업로드 성공")
            setCard(res.data.post);
        })
            .catch((err) => {
                console.log(err.response.data, "상세페이지 포스트업로드 오류");
            })
    }, [])
    console.log(userName, card.nickname)
    // useEffect(() => {
    //     console.log(card, comment);
    //     console.log(card.postTitle, comment.comment);
    // })

    return (
        <div style={{ margin: "auto", width: "80vw", maxWidth: "70%" }}>
            <Title>{card.postTitle}</Title>
            <UpdateButton>
                <div>{card.postDate}</div>
                {(userName === card.nickname) &&
                    <>
                        <button>수정</button>
                        <button>삭제</button>
                    </>
                }

            </UpdateButton>
            <Container>
                <div>{card.postContent}</div>
                <img src={card.postImage} alt="null" />
            </Container>
            <div style={{ position: "relative", marginLeft: "2%" }}>
                <Profile>
                    <img src={card.userImage} alt="null" />,
                </Profile>
                <Nickname>{card.nickname}</Nickname>
            </div>
            <CommentCount>{card.commentCount}개의 댓글</CommentCount>
            <Input type="text" placeholder="댓글을 작성하세요" ref={comment_Ref} />
            <Button>댓글작성</Button>
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