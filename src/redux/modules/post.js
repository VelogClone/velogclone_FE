import axios from "axios";
import { postApi } from "../../shared/api";


const MAINLOAD = "post/MAINPOST";
const DETAILLOAD = "post/DETAILPOST";


const initialState = {
    list: [],
    card: [],
};

export function mainpost(post_list) {
    return { type: MAINLOAD, post_list };
}
export function detailpost(post_index) {
    return { type: DETAILLOAD, post_index }
}

// 미들웨어(메인페이지)
export const mainpostAPI = () => {
    return async function (dispatch) {
        await postApi.main().then((res) => {
            console.log(res, "메인페이지 포스트업로드 성공")
            const post = res.data.post;         // 지연님 .post 제가 추가함 
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
export const detailpostAPI = (postId) => {
    console.log(postId)
    return async function (dispatch) {
        await postApi.detail(postId).then((res) => {
            console.log(res, "상세페이지 포스트업로드 성공")
            const post = res.data;
            console.log(post);
            dispatch(detailpost(post));
        })
            .catch((err) => {
                console.log(err.response.data, "상세페이지 포스트업로드 오류");
            })
    }
}


export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "post/MAINPOST": {
            const posts = [...action.post_list]
            console.log(posts)
            return { list: posts, card: [] }
        }
        case "post/DETAILPOST": {
            console.log(state.list, action.post_index)
            return { list: state.list, card: action.post_index }
        }
        default:
            return state;
    }
}