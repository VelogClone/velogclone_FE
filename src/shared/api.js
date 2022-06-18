import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5001",
});

export const postApi = {
    main: () => api.get("/posts"),
    detail: (id) => api.get(`/posts/${id}`)
}
