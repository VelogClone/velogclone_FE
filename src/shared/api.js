import axios from "axios";

const ImgApi = axios.create({
    baseURL: "http://3.35.170.203",
    headers: {
        "content-type": "multipart/form-data",
    }
});

if (localStorage.getItem('jwtToken'))
    ImgApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('jwtToken')}`;

const api = axios.create({
    baseURL: "http://3.35.170.203",
    headers: {
        "content-type": "application/json;charset=utf-8",
        accept: "application/json",
    }
});
if (localStorage.getItem('jwtToken'))
    api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('jwtToken')}`;






export const authApi = {
    // signUp: async (data) => {
    //     console.log(data)
    //     await api
    //         .post('/api_signup', data)
    //         .then((res) => {
    //             alert('등록 완료!');
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             alert(error.response.data);
    //         });
    // }
    signUp: (formData) => ImgApi.post('/api/signup', formData)

    // api.post('/api_signup', formData, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     }
    // })

    ,
    signIn: (id, pw) => api.post('/api/login', {
        nickname: id,
        password: pw,
    },
        { withCredentials: true }),

    loginCheck: () => api.get('/api/auth')
}


export const postApi = {
    main: () => api.get("api/posts"),
    detail: (postId) => api.get(`api/posts/${postId}`),
    addPost: (formData) => ImgApi.post('/api/posts', formData)
}

export const commentApi = {
    commentList: () => api.get("/comment")
    // commentWrite: 
    // commentUpdate:
    // commentDelete:
}