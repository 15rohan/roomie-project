import './App.css';
import Home from './pages/Home';
import React from 'react'
import Login from './pages/Login';
import Auth from './components/Auth';
import Layout from './components/Layout'
import { axiosInstance } from './service/axios'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preferences from './pages/Preferences';
import Listings from './pages/Listings';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/listings' element={<Listings />} />
        </Route>
        <Route path='/preferences' element={<Preferences />} />
        <Route path='/login' element={<Login />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
