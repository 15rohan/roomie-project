import React from 'react'
import RegisterOverlay from '../components/RegisterOverlay'

const Home = () => {

    const [popup, setPopup] = React.useState(false)
    // console.log(popup)

    const togglePopup=()=>{
        setPopup((prev)=>!prev)
    }

    return (
        <div className="relative h-screen">
            {popup && <RegisterOverlay togglePopup={togglePopup}/>}
            <nav className='w-full h-14 bg-blue-500 flex items-center justify-between text-white px-5'>
                <div><p className='text-2xl font-bold cursor-pointer'>Roomie</p></div>
                <div className='flex gap-6 items-center justify-center'>
                <li className='list-none cursor-pointer hover:text-slate-200 text-md'>Home</li>
                <li className='list-none cursor-pointer hover:text-slate-200 text-md'>Login</li>
                <li className='list-none cursor-pointer hover:text-slate-200 text-md' onClick={()=>togglePopup()}>Register</li>
                </div>
            </nav>
        </div>
    )
}

export default Home