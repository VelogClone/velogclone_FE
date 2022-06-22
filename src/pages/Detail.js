import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deletePostDB } from "../redux/modules/post";
import { postApi } from "../shared/api";
import { commentWriteDB, commentUpdateDB, commentDeleteDB, commentLoadDB } from "../redux/modules/comment";
import { Title, UpdateButton, Container, Profile, Nickname, CommentCount, Input, Button, CommProfile, Profile2 } from "../styled/DetailCss";


const Detail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const postId = params.id;
    const userName = useSelector((state) => state.user.nickname);
    // console.log(userName)

    // 해당 게시물 가져오기 
    const [card, setCard] = useState('');
    // 댓글 입력값 가져오기 
    const [text, setText] = useState('');
    const [display, setDisplay] = useState("none")
    const deleteCard = () => {
        dispatch(deletePostDB(postId))
        navigate('/')
    }
    // 상세페이지 data 가져오기 
    useEffect(() => {
        postApi.detail(postId).then((res) => {
            console.log(res.data.comments, "상세페이지 포스트업로드 성공")
            setCard(res.data.post);
            dispatch(commentLoadDB(res.data.comments))
        })
            .catch((err) => {
                console.log(err.response.data, "상세페이지 포스트업로드 오류");
            })
    }, [])

    //리덕스에서 댓글 가져오기
    const comment_list = useSelector((state) => state.comment.comment);
    console.log(comment_list);

    // 댓글 작성 
    const commentWrite = async () => {
        dispatch(commentWriteDB({
            postId: postId,
            comment: text,
        }))
        setText("");
        window.location.reload();
    }
    // 댓글 수정
    const commentUpdate = async (e) => {
        dispatch(commentUpdateDB({
            commentId: e,
            comment: text,
        }))
        setText("");
        window.location.reload();
    }

    // 댓글 삭제
    const commentDelete = async (e) => {
        console.log(e)
        dispatch(commentDeleteDB(e))
        window.location.reload();
    }

    return (
        <div style={{ margin: "auto", width: "80vw", maxWidth: "70%", paddingBottom: "10%" }}>
            <Title>{card.postTitle}</Title>
            <UpdateButton>
                <div>{card.postDate}</div>
                {(userName === card.nickname) &&
                    <div>
                        <button onClick={() => navigate(`/update/${postId}`)} >수정</button>
                        <button onClick={deleteCard} >삭제</button>
                    </div>
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
            <Input placeholder="댓글을 작성하세요" onChange={(e) => { setText(e.target.value) }} />
            <Button style={{ display: "flex", marginLeft: "auto", alignItems: "center", justifyContent: "center" }} onClick={() => { commentWrite() }}>댓글 작성</Button>
            <div>
                {comment_list.map((data) => {
                    return (
                        <div key={data.commentId}>
                            <CommProfile>
                                <div style={{ position: "relative", marginLeft: "2%" }}>
                                    <Profile2>
                                        <img src={data.userImage} />
                                    </Profile2>
                                    <div style={{ position: "relative" }}>
                                        <div style={{ position: "absolute", top: "-50px", left: "70px", fontWeight: "bolder" }}>{data.nickname}</div>
                                        <div style={{ position: "absolute", top: "-28px", left: "61px", fontSize: "14px", width: "120px" }}>{data.commentDate}</div>
                                    </div>
                                </div>
                                {(userName === data.nickname) &&
                                    <div>
                                        <button onClick={() => { setDisplay("") }}>수정</button>
                                        <button onClick={() => { commentDelete(data.commentId) }}>삭제</button>
                                    </div>
                                }
                            </CommProfile>
                            <div style={{ textAlign: "left", marginTop: "1rem" }}>{data.comment}</div>
                            <div style={{ display: `${display}` }}>
                                <Input placeholder="댓글을 수정하실껀가요?" onChange={(e) => { setText(e.target.value) }} />
                                <Button onClick={() => { setDisplay("none") }}>취소</Button>
                                <Button onClick={() => { commentUpdate(data.commentId) }}>수정하기</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Detail;