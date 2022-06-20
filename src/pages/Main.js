import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mainpostAPI } from "../redux/modules/post";
import RecipeReviewCard from "../styled/CardBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { integerPropType } from "@mui/utils";
import { kakaoLoginDB } from '../redux/modules/user'
const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list)

    const getKakaoProfile = async () => {
        try {
            // Kakao SDK API를 이용해 사용자 정보 획득
            let data = await window.Kakao.API.request({
                url: "/v2/user/me",
            });
            console.log(data.kakao_account.email);
            dispatch(kakaoLoginDB({
                email: data.kakao_account.email,
                nickname: data.properties.nickname,
                userImage: data.properties.profile_image,
            })
            )
        } catch (err) {
            console.log(err);
        }
    };
    React.useEffect(() => {
        dispatch(mainpostAPI());
        console.log('main useEffect')
        if (localStorage.getItem('KakaoToken')) {
            console.log('main 안 if 문')
            getKakaoProfile();

        }
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div>
                <h3>트렌딩</h3>
                <h3>내가 쓴 글</h3>
            </div>
            <div>
                <Container sx={{ py: 4 }} maxWidth="lg">
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {post_list.map((post, idx) => {
                            return (
                                <Grid item xs={4} sm={4} md={4} key={idx}>
                                    <div onClick={() => navigate("/detail/" + post.postId)}>
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