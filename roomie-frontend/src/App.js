import './App.css';
import Home from './pages/Home';
import React from 'react'
import Login from './pages/Login';
import Auth from './components/Auth';
import { axiosInstance } from './service/axios'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preferences from './pages/Preferences';
import Listings from './pages/Listings';

function App() {

  const [isLogin, setIsLogin] = React.useState(false)

  const checkAuth = async () => {
      try {
          const status = await Auth()
          // console.log(status)
          if (status.status === 200) {
              setIsLogin(true)
          } else {
              setIsLogin(false)
          }
      } catch (error) {
          console.log(error)
      }
  }

  React.useEffect(() => {
      checkAuth()
  }, [])

  return (
    <BrowserRouter>
    <Routes>
    <Route index element={<Home isLogin={isLogin}/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/listings' element={<Listings/>}/>
      <Route path='/preferences' element={<Preferences/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
