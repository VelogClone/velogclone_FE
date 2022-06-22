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
import { kakaoLoginDB } from './redux/modules/user';
import Auth from './shared/Auth';

function App() {
  const dispatch = useDispatch();
  // const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();



  const getKakaoProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      })
        .then(res => {
          const userInfo = {
            email: res.kakao_account.email,
            nickname: res.properties.nickname,
            userImage: res.properties.profile_image,
          }
          dispatch(kakaoLoginDB(userInfo));
        })
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem('jwtToken'))
      dispatch(loginCheckDB());
    if (localStorage.getItem('accessToken')) {
      getKakaoProfile();
    }
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
      </Routes>
    </div>
  );
}

export default App;
