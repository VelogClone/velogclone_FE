import { CallToAction } from "@material-ui/icons";
import axios from "axios";
import { postApi, api } from "../../shared/api";

const COMMENTWRITE = "comment/WRITE";
const COMMENTUPDATE = "comment/UPDATE";
const COMMENTDELETE = "comment/DELETE";
const COMMENTLOAD = "comment/LOAD";

const initialState = {
    comment: []
};

export function commentWrite(comment) {
    return { type: COMMENTWRITE, comment };
}
export function commentUpdate(comment_idx) {
    return { type: COMMENTUPDATE, comment_idx };
}
export function commentDelete(comment_idx) {
    return { type: COMMENTDELETE, comment_idx };
}
export function commentLoad(comment) {
    return { type: COMMENTLOAD, comment };
}

export const commentWriteDB = (id) => {
    // console.log(id);
    return async function (dispatch) {
        await api.post(`/api/comments/${id.postId}`,
            {
                comment: id.comment
            }, {
            headers: { "Authorization": `Bearer ${localStorage.getItem('jwtToken')}` }
        }).then((res) => {
            console.log(res.data, '댓글 업로드 성공')
            dispatch(commentWrite(res.data));
        })
            .catch((err) => {
                console.log(err.data, "업로드 오류");
            })
    }
}
export const commentUpdateDB = (comm_idx) => {
    console.log(comm_idx);
    return async function (dispatch) {
        await api.put(`/api/comments/${comm_idx.commentId}`,
            {
                comment: comm_idx.comment
            }, {
            headers: { "Authorization": `Bearer ${localStorage.getItem('jwtToken')}` }
        })
            .then((res) => {
                console.log(res.data, '댓글 수정 성공')
                dispatch(commentUpdate(res.data));
            })
            .catch((err) => {
                console.log(err.data, "삐뽀삐뽀 수정오류");
            })

    }
}
export const commentDeleteDB = (comm_idx) => {
    return async function (dispatch) {
        await api.delete(`/api/comments/${comm_idx}`,
        ).then((res) => {
            console.log(res.data, '댓글 삭제 성공')
            dispatch(commentDelete(res.data));
        })
            .catch((err) => {
                console.log(err.data, "댓글삭제 문제있나요?  오류발생");
            })
    }
}
export const commentLoadDB = (comment) => {
    console.log(comment)
    return async function (dispatch) {
        dispatch(commentLoad(comment));
    }
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "comment/WRITE": {
            const new_comment = [...state.comment, action.comment];
            console.log(new_comment)
            return { comment: new_comment };
        }
        case "comment/UPDATE": {
            return { comment: action.comment_idx }
        }
        case "comment/DELETE": {
            const a = action.comment_idx
            console.log({ comment: action.comment_idx });
            return { comment: action.comment_idx }
        }
        case "comment/LOAD": {
            console.log({ comment: action.comment })
            return { comment: action.comment }
        }
        default:
            return state;
    }
}