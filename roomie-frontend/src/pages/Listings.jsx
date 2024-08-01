import React from 'react'
import { axiosInstance } from '../service/axios'
import photo from '../images/hostel.jpg'
// import Navbar from '../components/Navbar'

const Listings = () => {

    const [listings, setListings] = React.useState([])

    const getListings = async () => {
        try {
            
            const result = await axiosInstance.get('api/v1/listings?college=VIT Chennai')
            console.log(result)
            setListings(result.data.listings)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getListings()
    }, [])

    const listingCards = listings && listings.map((item) => {
        return (
            <div className='w-full flex flex-col gap-5 p-5 shadow-md rounded-md'>
                <div className='flex gap-5'>
                    <img src={photo} alt="" className='contain w-1/3' />
                    <div className='flex flex-col gap-5'>
                        <p className='text-3xl font-bold'>{item.room}</p>
                        <div className='flex gap-3 items-center justify-between'>
                            <p className='text-xl font-semibold'>{item.college}</p>
                            <p className='text-xl font-semibold'>{item.gender}</p>
                            <p className='text-xl font-semibold'>6 AC</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis aliquam soluta dolore aut at quae, cumque dignissimos eos sapiente? Dicta molestiae doloremque itaque fugit tempore alias dolores ab excepturi.</p>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <p className='w-1/3 font-medium text-lg'>Name: Rohan Singhal</p>
                    <p className='font-medium text-lg'>Contact: {item.contact}</p>
                </div>

            </div>
        )
    })

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='flex flex-col w-2/3 gap-10'>
                {listingCards}
            </div>
        </div>
    )
}

export default Listings