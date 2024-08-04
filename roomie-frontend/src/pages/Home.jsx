import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
// import RegisterOverlay from '../components/RegisterOverlay'
import Navbar from '../components/Navbar'
import hostel from '../images/hostel.jpg'
import Auth from '../components/Auth.js'
import Loading from '../components/Loading'
import { axiosInstance } from '../service/axios'

const Home = () => {
    const login = useOutletContext()
    // const [isLogin, setIsLogin] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    // const checkAuth = async () => {
    //     try {
    //         const status = await Auth()
    //         // console.log(status)
    //         if (status.status === 200) {
    //             setIsLogin(true)
    //         } else {
    //             setIsLogin(false)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const logout = async () => {
    //     try {
    //         setLoading(true)
    //         const result = await axiosInstance.post('api/v1/auth/logout')
    //         setIsLogin(false)
    //         setLoading(false)
    //         console.log(result)
    //     } catch (error) {
    //         setLoading(false)
    //         console.log(error)
    //     }
    // }

    // React.useEffect(() => {
    //     checkAuth()
    // }, [])

    console.log(login)

    return (
        <div className="relative h-[92vh]">
            {loading && <Loading />}
            <div className='flex flex-col items-center bg-no-repeat bg-cover h-full' style={{ backgroundImage: `url(${hostel})` }}>
                <div className='flex flex-col w-3/5 justify-between gap-10 my-36 text-white'>
                    <div className='flex flex-col gap-5'>
                        <p className='text-6xl font-bold'>In College?<br />Looking for Roomates?</p>
                        <p className='text-2xl'>Register on Roomie today and find out other students like you looking for roomates who arent weirdos</p>
                    </div>
                    <Link to={`${login ? '/listings' : '/login'}`}><div className='text-white bg-black text-center w-fit py-2 px-4 rounded-full text-md font-semibold cursor-pointer bg-opacity-40 hover:bg-opacity-100'>Get Started</div></Link>
                </div>
            </div>
        </div>
    )
}

export default Home