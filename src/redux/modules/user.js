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
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                // dispatch(setUser(email));  // 여기 할차례
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
                dispatch(setUser(res.data.user.email, res.data.user.nickname));
            })
            .catch(err => {
                alert('유저 정보가 없네요' + err)
            })
    }
}


export const kakaoLoginDB = (userInfo) => {
    return async function (dispatch, getState) {
        // console.log(userInfo)
        // await authApi.sendKakaoUser(userInfo)
        //     .then(res => {
        dispatch(setUser(userInfo));  // 여기 할차례
        //         })
        //         .catch(err => {
        //             alert(err);
        //         })
        console.log('1');
    }
};




// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'user/LOAD': {
            console.log('2')
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
            if (localStorage.getItem('KakaoToken'))
                localStorage.removeItem('KakaoToken')
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
