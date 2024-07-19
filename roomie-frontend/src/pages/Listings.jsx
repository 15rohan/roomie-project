import React from 'react'
import { axiosInstance } from '../service/axios'

const Listings = () => {

    const getListings = async () => {
        try {
            const body = {
                college: 'VIT Chennai'
            }
            const result = await axiosInstance.get('api/v1/listings', body)
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