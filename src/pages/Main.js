import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mainpostAPI } from "../redux/modules/post";
import RecipeReviewCard from "../styled/CardBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { kakaoLoginDB } from '../redux/modules/user'
import { authApi } from "../shared/api";
const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list)
    const user = useSelector(state => state.user)
    console.log(user)
    const getKakaoProfile = async () => {
        try {
            // Kakao SDK API를 이용해 사용자 정보 획득
            let data = await window.Kakao.API.request({
                url: "/v2/user/me",
            })
                .then(res => {
                    const userInfo = {
                        email: res.kakao_account.email,
                        nickname: res.properties.nickname,
                        userImage: res.properties.profile_image,
                    }
                    dispatch(kakaoLoginDB(userInfo));
                })
        } catch (err) {
            console.log(err);
        }
    };
    React.useEffect(() => {
        dispatch(mainpostAPI());
        // if (localStorage.getItem('accessToken')) {
        //     getKakaoProfile();
        // }
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div>
                <Container sx={{ py: 4 }} maxWidth="lg" style={{ padding: "0 8%" }}>
                    <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {post_list.map((post, idx) => {
                            return (
                                <Grid item xs={6} sm={4} md={4} key={idx}>
                                    <div onClick={() => navigate("/detail/" + post.postId)}>
                                        <div><RecipeReviewCard
                                            // postImage={post.postImage}
                                            postImage={post.thumbnailImage}
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