import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login, Main, Detail, SignUp, Form, FormPage, SignIn } from './pages';
import { Header } from './components';
function App() {
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
