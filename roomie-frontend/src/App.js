import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preferences from './pages/Preferences';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route index element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/preferences' element={<Preferences/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
