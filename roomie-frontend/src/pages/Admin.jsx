import React from 'react'
import { axiosInstance } from '../service/axios'

const Admin=()=>{

const getAdmin=async()=>{
    try {
        const result= await axiosInstance.get('http://localhost:8080/admin')
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

    React.useEffect(()=>{
        getAdmin()
    },[])

    return(
<p>Admin</p>
    )
}

export default Admin