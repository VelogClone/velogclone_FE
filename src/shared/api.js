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
        accept: "application/json,",
    }
});

api.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('jwtToken')
    const kakaoToken = localStorage.getItem('KakaoToken')
    if ((kakaoToken) !== null) {
        config.headers.common["Authorization"] = `Bearer ${kakaoToken}`;
    }

    if ((accessToken) !== null) {
        console.log(accessToken)
        config.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
});











// if (localStorage.getItem('jwtToken')) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('jwtToken')}`;
// }
// if (localStorage.getItem('KakaoToken')) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('KakaoToken')}`;
// }


export const authApi = {
    signUp: (formData) => ImgApi.post('/api/signup', formData)

    ,
    signIn: (email, pw) => api.post('/api/login', {
        email: email,
        password: pw,
    },
        { withCredentials: true }),

    loginCheck: () => api.get('/api/auth'),

    KaKaoLogin: (userInfo) => api.post('/api/auth/kakao', userInfo)
}


export const postApi = {
    main: () => api.get("api/posts"),
    detail: (postId) => api.get(`api/posts/${postId}`),
    addPost: (formData) => ImgApi.post('/api/posts', formData),

    updatePost: (id, formData) => ImgApi.put('/api/posts/' + id, formData),
    deletePost: (id) => api.delete('/api/posts/' + id),



    posting: (postInfo) => api.post('api/posts', postInfo),  // add contentMD
    updatePosting: (id, postInfo) => api.put('api/posts/' + id, postInfo),  // add contentMD
    imageUpload: (formData) => ImgApi.post('api/posts/images', formData)
}

export const commentApi = {
    addComment: (id, comment) => api.post('api/comments/' + id, comment),
    updateComment: (id, comment) => api.put('api/comments/' + id, comment),
    deleteComment: (id) => api.delete('api/comments/' + id),
}
