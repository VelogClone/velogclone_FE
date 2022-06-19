import axios from "axios";
import { postApi } from "../../shared/api";

const MAINLOAD = "post/MAINPOST";
const ADD = 'post/ADD';
const initialState = {
    list: []
};

export function mainpost(post_list) {
    return { type: MAINLOAD, post_list };
}
export function addPost(post) {
    return { type: MAINLOAD, post };
}

// 미들웨어(메인페이지)
export const mainpostAPI = () => {
    return async function (dispatch) {
        await postApi.main().then((res) => {
            // console.log(res.data, res.data.post, "메인페이지 포스트업로드 성공")
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
export const addPostDB = (formData) => {
    return async function (dispatch) {
        await postApi.addPost(formData)
            .then((res) => {
                console.log('업로드 성공')
                // const post = res.data;
                // dispatch(addPost(post));
            })
            .catch((err) => {
                console.log(err, "업로드 오류");
            })
    }
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "post/MAINPOST": {
            const posts = [...action.post_list]
            console.log(posts)
            return { list: posts }
        }
        case "post/ADD": {
            const post = [...action.post]
            console.log(post)
            // return { list: [...state.list, action.post] };
        }

        default:
            return state;
    }
}