import React from 'react'
import { useFormik } from "formik";
import * as yup from 'yup'
import { axiosInstance } from '../service/axios'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import hostel from '../images/hostel.jpg'
import Navbar from '../components/Navbar';
import RegisterOverlay from '../components/RegisterOverlay';
import LoginComponent from '../components/LoginComponent';

const Login = () => {
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
                navigate('/')
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
        <div className='bg-cover bg-no-repeat' style={{backgroundImage:`url(${hostel})`}}>
            <Navbar />
            <div className='flex flex-col min-h-screen justify-center'>
                {!signUp ?
                    <LoginComponent toggleSignUp={toggleSignUp} />
                    :
                    <RegisterOverlay toggleSignUp={toggleSignUp} />
                }
            </div>
        </div>
    )
}

export default Login

