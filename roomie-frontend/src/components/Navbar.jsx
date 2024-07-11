import { Link } from 'react-router-dom'

const Navbar=(props)=>{

    return(
        <nav className='w-full h-14 bg-blue-500 flex items-center justify-between text-white px-5'>
                <div><p className='text-2xl font-bold cursor-pointer'>Roomie</p></div>
                <div className='flex gap-6 items-center justify-center'>
             <Link to='/'><li className='list-none cursor-pointer hover:text-slate-200 text-md'>Home</li></Link>
               <Link to='/login'><li className='list-none cursor-pointer hover:text-slate-200 text-md'>Login</li></Link>
                <li className='list-none cursor-pointer hover:text-slate-200 text-md' onClick={()=>props.togglePopup()}>Register</li>
                </div>
            </nav>
    )
}

export default Navbar