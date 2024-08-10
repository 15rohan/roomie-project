import React from 'react'
import { replace, useFormik } from "formik";
import * as yup from 'yup'
import { axiosInstance } from '../service/axios'
import { useNavigate, redirect } from 'react-router';
import { Link } from 'react-router-dom';
import hostel from '../images/hostel.jpg'
import Navbar from '../components/Navbar';
import RegisterOverlay from '../components/RegisterOverlay';
import LoginComponent from '../components/LoginComponent';
import Auth from '../components/Auth.js'

const Login = () => {

    const checkAuth = async () => {
        try {
            const status = await Auth()
            // console.log(status)
            if (status.status === 200) {
                navigate('/')
            } 
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        checkAuth()
    }, [])

    const navigate = useNavigate()
    const [signUp, setSignUp] = React.useState(false)

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Required'),
        password: yup.string().required('Required'),
    })

    const login = async () => {
        try {
            const user = {
                email: values.email,
                password: values.password
            }
            const result = await axiosInstance.post('api/v1/auth/login', user)
            console.log(result)
            if (result.statusText === 'OK') {
                localStorage.setItem('token', result.data.token)
                navigate('/',true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const { values, handleChange, handleSubmit, touched, errors, resetForm } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: () => {
            login()
        }
    })

    const toggleSignUp = () => {
        setSignUp((prev) => !prev)
    }

    // console.log(signUp)

    return (
        <div className='bg-cover bg-no-repeat min-h-screen' style={{ backgroundImage: `url(${hostel})` }}>
            <div className='flex flex-col justify-center min-h-[90vh]' >
                {/* <div className='flex justify-center items-center'> */}
                {!signUp ?
                    <LoginComponent toggleSignUp={toggleSignUp} />
                    :
                    <RegisterOverlay toggleSignUp={toggleSignUp} />
                }
            </div>
        </div>
        // </div>
    )
}

export default Login

