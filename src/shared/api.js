import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5001",
});

export const authApi = {
    signUp: async (data) => {
        console.log(data)
        await axios({
            method: "post",
            url: "/api_signup",
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);

            alert('에러가 발생함');
        })
    }

}


export const postApi = {
    main: () => api.get("/posts"),
}
