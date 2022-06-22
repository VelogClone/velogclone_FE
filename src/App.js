import './App.css';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Login, Main, Detail, SignUp, Form, FormPage, SignIn } from './pages';
import { ToastUI } from './pages/toastUI';
import Profile from './pages/Profile';
import { useState } from 'react';
import { Header } from './components';
import { useDispatch } from 'react-redux';
import { loginCheckDB, setUser } from './redux/modules/user';
import KaKaoAuth from './shared/KakaoAuth';
import { authApi } from './shared/api';
import { kakaoSetUserDB } from './redux/modules/user'
import KakaoRedirectHandeler from './shared/KakaoRedirectHandler';
import Auth from './shared/Auth';

function App() {
  const dispatch = useDispatch();
  // const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();


  React.useEffect(() => {
    if (localStorage.getItem('jwtToken'))
      dispatch(loginCheckDB());
    // if (localStorage.getItem('KakaoToken')) {
    //   dispatch(kakaoSetUserDB());
    // }
    // if (code) {
    //   dispatch(kakaoAuthDB(code));
    // console.log(code)
    // }
    // dispatch(kakaoAuthDB())
  }, [])



  return (
    <div className="App">
      <Header />

      <Routes>

        {/* <Route path="/oauth/callback/kakao" element={<KakaoRedirectHandeler />} /> */}
        <Route path="/oauth/callback/kakao" element={<Auth />} />

        <Route path='/' element={<Main />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/write' element={<FormPage mode="write" />} />
        <Route path='/update/:id' element={<FormPage mode="update" />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/texteditor' element={<ToastUI />} />
      </Routes>
    </div>
  );
}

export default App;
