import { axiosInstance } from "../service/axios";

 const Auth=async()=>{
    try {
        const result= await axiosInstance.get('api/v1/auth/verifyToken')
        // console.log(result)
        return {status:result.status}
    } catch (error ) {
        return {status:error.response.status}
        console.log(error)
    }
}

export default Auth
