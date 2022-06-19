import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Login, Main, Detail, SignUp, Form, FormPage, SignIn } from './pages';

import { Header } from './components';
import { useDispatch } from 'react-redux';
import { loginCheckDB } from './redux/modules/user';
function App() {
  const dispatch = useDispatch();


  React.useEffect(() => {
    if (localStorage.getItem('jwtToken'))
      dispatch(loginCheckDB());
  }, [])



  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/write' element={<FormPage mode="write" />} />
        <Route path='/update/:id' element={<FormPage mode="update" />} />
      </Routes>
    </div>
  );
}

export default App;
