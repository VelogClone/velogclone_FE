import axios from "axios";
import { commentApi } from "../../shared/api";

const COMMENTWRITE = "comment/WRITE";
const COMMENTUPDATE = "comment/UPDATE";
const COMMENTDELETE = "comment/DELETE";
const COMMENTLOAD = "comment/LOAD";

const initialState = {
    list: []
};

export function commentWrite(commentInfo) {
    return { type: COMMENTWRITE, commentInfo };
}
export function commentUpdate(id, comment) {
    return { type: COMMENTUPDATE, id, comment };
}
export function commentDelete(id) {
    return { type: COMMENTDELETE, id };
}
export function commentLoad(comment) {
    return { type: COMMENTLOAD, comment };
}

export const commentWriteDB = (id, comment) => {
    return async function (dispatch, getState) {
        console.log(id, comment)

        await commentApi.addComment(id, { comment })
            .then(res => {
                const commentInfo = res.data.comment
                const curComment_list = getState().comment.list.concat(commentInfo)
                curComment_list.sort(compareBy_ASC("commentId"));
                function compareBy_ASC(key) {
                    return function (a, b) {
                        let x = a[key];
                        let y = b[key];

                        if (x > y) return -1;
                        if (x < y) return 1;
                        return 0;
                    }
                }
                console.log(curComment_list)
                dispatch(commentWrite(curComment_list))
            })
            .catch(err => {

                console.log(err)
            })
        //     await axios.post('http://3.35.170.203/api/comments/' + id, { comment },
        //         {
        //             headers: {
        //                 "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`,
        //                 "content-type": "application/json;charset=utf-8",
        //                 accept: "application/json,",
        //             }
        //         }).then((res) => {
        //             console.log(res.data, '댓글 업로드 성공')
        //             dispatch(commentWrite(res.data));
        //         })
        //         .catch((err) => {
        //             console.log(err, "업로드 오류");
        //         })
    }
}
export const commentUpdateDB = (id, comment) => {
    console.log(id, comment);
    return async function (dispatch) {
        await commentApi.updateComment(id, { comment })
            .then(res => {
                console.log(res)
                dispatch(commentUpdate(id, comment))
            })
            .catch(err => {

                console.log(err)
            })
    }
}
export const commentDeleteDB = (id) => {
    return async function (dispatch) {
        await commentApi.deleteComment(id)
            .then(res => {
                console.log('삭제 성공')
                dispatch(commentDelete(id))
            })
            .catch(err => {
                console.log(err + '삭제 에러')
            })
        // await api.delete(`/api/comments/${comm_idx}`,
        // ).then((res) => {
        //     console.log(res.data, '댓글 삭제 성공')
        //     dispatch(commentDelete(res.data));
        // })
        //     .catch((err) => {
        //         console.log(err.data, "댓글삭제 문제있나요?  오류발생");
        //     })
    }
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "comment/WRITE": {
            // const new_comment = [...state.list, action.commentInfo];
            return { list: action.commentInfo };
        }
        case "comment/UPDATE": {
            console.log(action.id, action.comment)

            const new_comment_list = state.list.map((c, i) => {

                // if (c.id === parseInt(action.id)) {
                //     return {
                //         ...c, commentId: action.id, comment: action.comment
                //     }
                // }
                // return { ...c }
            })

            console.log({ list: new_comment_list })
            return { list: new_comment_list }

        }
        case "comment/DELETE": {
            const new_comment_list = state.list.filter((c) => {
                return parseInt(action.id) !== parseInt(c.commentId);
            });
            // console.log( { list: new_comment_list })

            return { list: new_comment_list }


        }
        case "comment/LOAD": {
            return { list: action.comment }
        }
        default:
            return state;
    }
}