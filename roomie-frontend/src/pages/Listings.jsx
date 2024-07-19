import React from 'react'
import { axiosInstance } from '../service/axios'

const Listings = () => {

    const getListings = async () => {
        try {
            const result = await axiosInstance.get('api/v1/listings',{college:'VIT Chennai'})
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getListings()
    }, [])

    return (
        <></>
    )
}

export default Listings