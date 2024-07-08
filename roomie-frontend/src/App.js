import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route index element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/admin' element={<Admin/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
