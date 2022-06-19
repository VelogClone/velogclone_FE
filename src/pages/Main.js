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
    const post_list = useSelector((state) => state.post.list)
    // console.log(post_list);

    React.useEffect(() => {
        dispatch(mainpostAPI());
    }, []);

    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
            <div>
                <h3>트렌딩</h3>
                <h3>내가 쓴 글</h3>
            </div>
            <div>
                <Container sx={{ py: 4 }} maxWidth="lg">
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {post_list.map((post) => {
                            return (
                                <Grid item xs={4} sm={4} md={4} key={post.id}>
                                    <div onClick={() => navigate("/detail/" + post.id)}>
                                        <div><RecipeReviewCard
                                            postImage={post.postImage}
                                            postTitle={post.postTitle}
                                            postContent={post.postContent}
                                            postDate={post.postDate}
                                            userImage={post.userImage}
                                            commentCount={post.commentCount}
                                            nickname={post.nickname} /></div>
                                    </div>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

export default Main;