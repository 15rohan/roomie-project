import { Outlet, useNavigate } from "react-router"
import Navbar from './Navbar'
import Auth from '../components/Auth.js'
import React from 'react'


const Layout=()=>{
const navigate= useNavigate()
    const checkAuth = async () => {
        try {
            const status = await Auth()
            // console.log(status)
            if (status.status === 200) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
            navigate('/login')
        }
    }

    const [isLogin, setIsLogin] = React.useState(checkAuth)

    React.useEffect(() => {
        checkAuth()
    }, [])

    return(
        <div className="flex flex-col">
        <Navbar/>
        <Outlet context={isLogin}/>
        </div>
    )
}

export default Layout