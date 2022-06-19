import axios from "axios";
import { postApi } from "../../shared/api";

const COMMENTWRITE = "comment/WRITE";
const COMMENTUPDATE = "comment/UPDATE";
const COMMENTDELETE = "comment/DELETE";

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

export const commentWriteDB = (id, comment) => {
    console.log(id);
    return async function (dispatch) {
        await postApi.addComment(id, comment)
            .then((res) => {
                console.log(res.data, '댓글 업로드 성공')
                // const post = res.data;
                // dispatch(commentWrite(res.data));
            })
            .catch((err) => {
                console.log(err, "업로드 오류");
            })
    }
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "comment/WRITE": {
            const new_comment = [...state.comment, action.comment];
            return { comment: new_comment };
        }
        case "comment/UPDATE": {
            return { comment: action.comment_idx }
        }
        case "comment/DELETE": {
            return { comment: action.comment_idx }
        }
        default:
            return state;
    }
}