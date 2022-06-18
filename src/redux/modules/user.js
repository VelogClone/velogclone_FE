// import { authApi } from '../../shared/api';

const initialState = {

};

// 미들웨어 Actions
const LOAD = 'user/LOAD';
const DELETE = 'user/DELETE';

// Action Creators
export function loadUser(user) {
    return { type: LOAD, user };
}
export function deleteUser(user) {
    return { type: DELETE, user };
}

export const loadUserMW = () => {
    //   return async function (dispatch, getState) {
    //     let user;
    //     await authApi.authCheck().then((response) => {
    //       console.log(response.data);
    //       user = response.data;
    //     }).catch(error => console.log(error));
    //     console.log(user);
    //     if (user == undefined) {
    //       user = {};
    //     }
    //     dispatch(loadUser(user));
    //   };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        // case 'user/LOAD': {
        //   return {
        //     name: action.user.name,
        //     email: action.user.email,
        //     is_login: true,
        //   };
        // }
        // case 'user/DELETE': {
        //   return {}
        // }
        default:
            return state;
    }
}
