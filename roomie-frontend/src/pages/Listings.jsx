import React from 'react'
import { axiosInstance } from '../service/axios'
import { useNavigate } from 'react-router'
import photo from '../images/hostel.jpg'
import dummy from '../icons/image-solid.svg'
// import downIcon from '../icons/caret-down-solid.svg'
// import gym from '../icons/dumbbell-solid.svg'
import user from '../icons/user-solid.svg'
// import Navbar from '../components/Navbar'

const Listings = (props) => {
const navigate= useNavigate()
    const [loading, setLoading] = React.useState(true)
    const [listings, setListings] = React.useState([])
    const [college, setCollege] = React.useState('')
    console.log('render')

    const handleChange = (event) => {
        setCollege(event.target.value)
    }

    const getListings = async () => {
        try {
            setLoading(true)
            const result = await axiosInstance.get(`api/v1/listings?college=${college}`)
            console.log(result)
            setListings(result.data.listings)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    React.useEffect(() => {
        getListings()
    }, [college])

    const listingCards = listings.length > 0 ? listings.map((item) => {
        return (
            <div className='w-full flex flex-col gap-5 p-5 shadow-md rounded-md'>
                <div className='flex gap-5'>
                    <img src={photo} alt="" className='contain w-1/3' />
                    <div className='flex flex-col gap-5'>
                        <p className='text-3xl font-bold'>{item.room}</p>
                        <div className='flex gap-3 items-center justify-between'>
                            <p className='text-xl font-semibold'>{item.createdBy.college_name}</p>
                            <div className='flex items-center justify-center gap-3'><img src={user} alt="user" className='flex items-center justify-center w-4' /><p className='text-xl font-semibold'>{item.createdBy.gender}</p></div>
                            <p className='text-xl font-semibold'>{item.accomodation}</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis aliquam soluta dolore aut at quae, cumque dignissimos eos sapiente? Dicta molestiae doloremque itaque fugit tempore alias dolores ab excepturi.</p>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <p className='w-1/3 font-medium text-lg'>Name: {item.createdBy.name}</p>
                    <p className='font-medium text-lg'>Contact: {item.contact}</p>
                </div>
            </div>
        )
    })
        :
        <div className='text-2xl flex items-center justify-center min-h-[60vh]'>
            No Listings Found
        </div>

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center gap-4'>
                <select name="college" id="college" className='my-5 h-10 appearance-none px-8 cursor-pointer bg-black text-white text-lg rounded-full hover:bg-opacity-85 text-center' onChange={(event) => handleChange(event)}>
                    <option value="" selected disabled>Select</option>
                    <option value="VIT Chennai">VIT-Chennai</option>
                    <option value="VIT Bhopal">VIT-Bhopal</option>
                    <option value="VIT Vellore">VIT-Vellore</option>
                    <option value="VIT AP">VIT-AP</option>
                </select>
                <div className='px-5 h-10 flex items-center justify-center text-center text-lg bg-black text-white rounded-full hover:bg-opacity-85 cursor-pointer' onClick={()=> navigate('/create')}>Create Your Own Listing</div>
            </div>
            {loading ?
                <div className='flex flex-col text-3xl items-center justify-center min-h-[60vh]'>
                    Loading. . .
                </div>
                :
                <div className='flex flex-col items-center justify-center w-2/3 gap-10'>
                    {listingCards}
                </div>
            }
        </div>
    )
}

export default Listings