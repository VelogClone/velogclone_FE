import axios from "axios";
import { postApi } from "../../shared/api";

const LOAD = "post/MAINPOST";

const initialState = {
    card: [{
        postId: 0,
        postTitle: "벨로그클론중",
        postImage: "http://3.39.226.22/imagename.png",
        postContent: "벨로그보다 벨로그답게. ",
        postDate: "2022. 6. 17. 17: 41",
        userId: "짱짱맨",
        commentCount: 3
    }]
};

export function mainpost(post_list) {
    return { type: LOAD, post_list };
}

// 미들웨어(메인페이지)
export const mainpostAPI = (post_list) => {
    return async function (dispatch) {
        const post_card = await postApi.main().then((res) => {
            console.log(res, "메인페이지 포스트업로드 성공")
            const post = res.data;
            post.sort(compareBy_ASC("postId"));
            function compareBy_ASC(key) {
                return function (a, b) {
                    let x = a[key];
                    let y = b[key];

                    if (x > y) return -1;
                    if (x < y) return 1;
                    return 0;
                }
            }
            dispatch(mainpost(post));
        })
            .catch((err) => {
                console.log(err, "메인페이지 포스트업로드 오류");
            })
    }
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "post/MAINPOST": {
            console.log(action.post_list)
            return { card: action.post_list }
        }
        default:
            return state;
    }
}