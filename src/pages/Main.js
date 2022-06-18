import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mainpostAPI } from "../redux/modules/post";
import RecipeReviewCard from "../styled/CardBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const post_card = useSelector((state) => state.post.card)
    console.log(post_card);

    React.useEffect(() => {
        dispatch(mainpostAPI());
    }, []);

    return (
        <div>
            <h3>트렌딩</h3>
            <h3>내가 쓴 글</h3>
            <div>
                {post_card.map((post) => {
                    return (
                        <Container sx={{ py: 4 }} maxWidth="md">
                            <Grid container spacing={4}>
                                <div key={post.postId}>
                                    <div>
                                        <p><RecipeReviewCard
                                            postImage={post.postImage}
                                            postTitle={post.postTitle}
                                            postContent={post.postContent}
                                            postDate={post.postDate}
                                            userImage={post.userImage}
                                            commentCount={post.commentCount}
                                            nickname={post.nickname} /></p>
                                    </div>
                                </div>
                            </Grid>
                        </Container>
                    )
                })}
            </div>
            <button onClick={() => navigate('/detail')}>상세페이지 이동
            </button>
        </div>
    )
}

export default Main;