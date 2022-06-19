import { authApi } from "../../shared/api";
import { setCookie, deleteCookie } from "../../shared/Cookie";

const initialState = {
    is_login: false,
    nickname: null,
};

// 미들웨어 Actions
const LOAD = 'user/LOAD';
const LOGOUT = 'user/LOGOUT';

// Action Creators
export function setUser(nickname) {
    return { type: LOAD, nickname };
}
export function deleteUser(userInfo) {
    return { type: LOGOUT, userInfo };
}

export const registerDB = (formData) => {
    return async function (dispatch, getState) {
        await authApi.signUp(formData).then((res) => {
            alert('회원가입 성공')
        }).catch((err) => {
            window.alert(err);
        });
    };
};

export const setLoginDB = (id, pw) => {
    return async function (dispatch, getState) {
        let success = null;
        await authApi.signIn(id, pw)
            .then(res => {
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                dispatch(setUser(id));
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
                dispatch(setUser(res.data.user.nickname));
            })
            .catch(err => {
                alert('유저 정보가 없네요' + err)
            })
    }
}




// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'user/LOAD': {
            return {
                nickname: action.nickname,
                is_login: true,
            };
        }
        case 'user/LOGOUT': {
            localStorage.removeItem('jwtToken');
            const newUser = {
                is_login: false,
                nickname: null,
            }
            return newUser;
        }
        default:
            return state;
    }
}
