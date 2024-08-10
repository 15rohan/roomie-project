import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../service/axios'

const Navbar = (props) => {
    const navigate = useNavigate()

    const logout = async () => {
        try {
            const result = await axiosInstance.post('api/v1/auth/logout')
            navigate('/login')
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className='w-full h-[8vh] flex items-center justify-between px-5 bg-black text-white'>
            <Link to='/'><div><p className='text-2xl font-bold cursor-pointer'>Roomie</p></div></Link>
            <div className='flex gap-6 items-center justify-center'>
                <Link to='/'><li className='list-none cursor-pointer hover:text-[#FFBF00] text-md'>Home</li></Link>
                <li className='list-none cursor-pointer text-md hover:text-[#FFBF00]' onClick={() => logout()}>Logout</li>
            </div>
        </nav>
    )
}

export default Navbar