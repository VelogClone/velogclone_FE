import './App.css';
import {Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
