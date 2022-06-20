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
    // baseURL: "http://13.209.14.6",
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
    signIn: (email, pw) => api.post('/api/login', {
        email: email,
        password: pw,
    },
        { withCredentials: true }),

    loginCheck: () => api.get('/api/auth'),

    sendKakaoUser: (userInfo) => api.post('/api/auth/kakao', userInfo)
}


export const postApi = {
    main: () => api.get("api/posts"),
    detail: (postId) => api.get(`api/posts/${postId}`),
    addPost: (formData) => ImgApi.post('/api/posts', formData),
    addComment: (id, data) => api.post(`/api/comments/${id}`, data),
    updatePost: (id, formData) => ImgApi.put('/api/posts/' + id, formData),
    deletePost: (id) => api.delete('/api/posts/' + id)
}

