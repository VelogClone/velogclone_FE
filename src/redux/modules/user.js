import axios from "axios";
import { authApi } from "../../shared/api";
import Auth from "../../shared/Auth";
import { setCookie, deleteCookie } from "../../shared/Cookie";

const initialState = {
    is_login: false,
    email: null,
    nickname: null,
    userImage: null,
};

// 미들웨어 Actions
const LOAD = 'user/LOAD';
const LOGOUT = 'user/LOGOUT';

// Action Creators
export function setUser(userInfo) {
    return { type: LOAD, userInfo };
}
export function deleteUser(userInfo) {
    return { type: LOGOUT, userInfo };
}

export const registerDB = (formData) => {
    return async function (dispatch, getState) {
        for (let value of formData.values()) {
            console.log(value);
        }
        await authApi.signUp(formData).then((res) => {
            alert('회원가입 성공')
            console.log(res.data)
            // dispatch(setUser());
        }).catch((err) => {
            window.alert(err);
        });
    };
};

export const setLoginDB = (email, pw) => {
    return async function (dispatch, getState) {
        let success = null;
        await authApi.signIn(email, pw)
            .then(res => {
                console.log(res.data)
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                dispatch(setUser({
                    nickname: res.data.user.nickname,
                    userImage: res.data.user.userImage
                }))
                success = true;
            })
            .catch(err => {
                success = false;
                alert(err);

            })
        return success;
    }
};

export const loginCheckDB = () => {
    return async function (dispatch, getState) {
        authApi.loginCheck()
            .then(res => {
                const userInfo = res.data.user
                console.log(userInfo)
                dispatch(setUser(userInfo));
            })
            .catch(err => {
                alert('유저 정보가 없네요' + err)
            })
    }
}



export const kakaoLoginDB = (userInfo) => {
    console.log(userInfo)
    return async function (dispatch, getState) {
        await authApi.KaKaoLogin(userInfo)
            .then(res => {
                console.log(res.data.token);
                localStorage.setItem("KakaoToken", res.data.token);
                console.log(userInfo)
                dispatch(setUser(userInfo.email, userInfo.nickname));
                // window.location.replace("/");
            })
            .catch(err => {
                alert(err);
            })
    }
};




// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'user/LOAD': {
            return {
                // email: action.email,
                nickname: action.userInfo.nickname,
                userImage: action.userInfo.userImage,
                is_login: true,
            };
        }
        case 'user/LOGOUT': {
            if (localStorage.getItem('jwtToken'))
                localStorage.removeItem('jwtToken');
            if (localStorage.getItem('accessToken'))
                localStorage.removeItem('accessToken')
            const newUser = {
                is_login: false,
                email: null,
                nickname: null,
                userImage: null,
            }
            return newUser;
        }
        default:
            return state;
    }
}
