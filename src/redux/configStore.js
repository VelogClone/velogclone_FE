// 스토어 
import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import user from './modules/user'


const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({ user });
const store = legacy_createStore(rootReducer, enhancer);

export default store;

