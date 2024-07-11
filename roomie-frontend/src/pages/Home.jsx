import React from 'react'
import { Link } from 'react-router-dom'
import RegisterOverlay from '../components/RegisterOverlay'
import Navbar from '../components/Navbar'
import { axiosInstance } from '../service/axios'

const Home = () => {

    const [popup, setPopup] = React.useState(false)
    // console.log(popup)

    const togglePopup = () => {
        setPopup((prev) => !prev)
    }

    const getUsers = async () => {
        try {
            const result = await axiosInstance.get('api/v1/users')
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="relative h-screen">
            {popup && <RegisterOverlay togglePopup={togglePopup} />}
            <Navbar togglePopup={togglePopup} />
            <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-col w-2/5 justify-center gap-5 my-36'>
                    <p className='text-5xl font-bold'>In College?<br />Looking for Roomates?</p>
                    <p>Register on Roomie today and find out other students like you looking for roomates who arent weirdos</p>
                </div>
            </div>

        </div>
    )
}

export default Home