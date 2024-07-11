import React from 'react'
import { Link } from 'react-router-dom'
import RegisterOverlay from '../components/RegisterOverlay'
import Navbar from '../components/Navbar'
import { axiosInstance } from '../service/axios'

const Home = () => {

    const [popup, setPopup] = React.useState(false)
    // console.log(popup)

    const togglePopup=()=>{
        setPopup((prev)=>!prev)
    }

    const getUsers=async()=>{
        try {
            const result= await axiosInstance.get('api/v1/users')
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(()=>{
getUsers()
    },[])

    return (
        <div className="relative h-screen">
            {popup && <RegisterOverlay togglePopup={togglePopup}/>}
           <Navbar togglePopup={togglePopup}/>
        </div>
    )
}

export default Home