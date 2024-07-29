import React from 'react'
import { axiosInstance } from '../service/axios'

const Listings = () => {

    const [listings, setListings] = React.useState([])

    const getListings = async () => {
        try {
            const body = {
                college: 'VIT Chennai'
            }
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
            <div className='flex flex-col shadow-md rounded-sm justify-center items-center bg-black'>
                <div className='flex w-full p-10 bg-orange-300 items-center justify-center text-3xl font-bold border-b border-black'>
                    {item.room}
                </div>
                <div className='flex flex-col items-center p-4 text-white'>
                    <p className='text-center'>{item.description} I am looking for 4 people to join my room in block 1</p>
                    <p className='text-center'>{item.contact}</p>
                </div>

            </div>
        )
    })

    return (
        <div className='flex items-center justify-start min-h-screen'>
            <div className='flex flex-col w-4/12 gap-10'>
                {listingCards}
            </div>
        </div>
    )
}

export default Listings