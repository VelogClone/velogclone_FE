import { AddAlarm } from "@mui/icons-material";
import axios from "axios";
import { postApi } from "../../shared/api";

const MAINLOAD = "post/MAINPOST";
const ADD = 'post/ADD';
const UPDATE = 'post/UPDATE';
const DELETE = 'post/DELETE';

const initialState = {
    list: []
};

export function mainpost(post_list) {
    return { type: MAINLOAD, post_list };
}
export function addPost(post) {
    return { type: ADD, post };
}
export function updatePost(id, postImage) {
    return { type: UPDATE, id, postImage };
}
export function deletePost(id) {
    return { type: DELETE, id };
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
                const post = res.data;
                dispatch(addPost(post));
            })
            .catch((err) => {
                console.log(err, "업로드 오류");
            })
    }
}
export const updatePostDB = (id, formData) => {
    return async function (dispatch) {
        await postApi.updatePost(id, formData)
            .then((res) => {
                console.log('업데이트 성공')
                dispatch(updatePost(id, res.data.postImage));
            })
            .catch((err) => {
                console.log(err, "업데이트 오류");
            })
    }
}

export const deletePostDB = (id) => {
    return async function (dispatch) {
        await postApi.deletePost(id)
            .then((res) => {
                console.log('삭제 성공')
                // const post = res.data;
                dispatch(deletePost(id));
            })
            .catch((err) => {
                console.log(err, "삭제 오류");
            })
    }
}

// add contentMD
export const addPostingDB = (postInfo) => {
    console.log(postInfo)
    return function (dispatch) {
        postApi
            .posting(postInfo)
            .then((res) => {
                console.log(res.data.post);
                dispatch(addPost(res.data.post));
                window.location.replace('/')
            })
            .catch((error) => {
                console.log("게시글 등록 에러!");
            });
    };
};


export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "post/MAINPOST": {
            const posts = [...action.post_list]
            return { list: posts }
        }
        case "post/ADD": {

            return { list: [...state.list, action.post.post] };
        }

        case "post/UPDATE": {
            const new_post_list = state.list.map((p, i) => {
                if (p.postId === parseInt(action.id))
                    return { ...p, postImage: action.postImage }
                return { ...p }
            })
            return { list: new_post_list };
        }

        case "post/DELETE": {
            const new_post_list = state.list.filter((p) => {
                return parseInt(action.id) !== p.id
            });
            return { list: new_post_list };
        }

        default:
            return state;
    }
}