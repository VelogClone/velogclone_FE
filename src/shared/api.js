import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5001",
});

export const postApi = {
    main: () => api.get("/posts"),
    detail: (postId) => api.get(`/posts/${postId}`)
}

export const commentApi = {
    commentList: () => api.get("/comment")
    // commentWrite: 
    // commentUpdate:
    // commentDelete:
}