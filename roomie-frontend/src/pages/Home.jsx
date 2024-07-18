import React from 'react'
import { Link } from 'react-router-dom'
import RegisterOverlay from '../components/RegisterOverlay'
import Navbar from '../components/Navbar'
import hostel from '../images/hostel.jpg'
import { axiosInstance } from '../service/axios'

const Home = () => {
    
    return (
        <div className="relative h-screen">
            <div className='flex flex-col items-center bg-no-repeat bg-cover min-h-screen' style={{ backgroundImage: `url(${hostel})` }}>
                <Navbar />
                <div className='flex flex-col w-3/5 justify-between gap-10 my-36 text-white'>
                    <div className='flex flex-col gap-5'>
                        <p className='text-6xl font-bold'>In College?<br />Looking for Roomates?</p>
                        <p className='text-2xl'>Register on Roomie today and find out other students like you looking for roomates who arent weirdos</p>
                    </div>
                    <div className='text-white bg-black text-center w-fit py-2 px-4 rounded-full text-md font-semibold cursor-pointer bg-opacity-40 hover:bg-opacity-100'>Get Started</div>
                </div>
            </div>

        </div>
    )
}

export default Home