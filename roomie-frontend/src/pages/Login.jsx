import React from 'react'
import { useFormik } from "formik";
import * as yup from 'yup'
import { axiosInstance } from '../service/axios'
import { useNavigate } from 'react-router';

const Login = () => {
    const navigate=useNavigate()

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Required'),
        password: yup.string().required('Required'),
    })

    const login = async () => {
        try {
          const  user = {
                email: values.email,
                password: values.password
            }
            const result = await axiosInstance.post('api/v1/auth/login', user)
            console.log(result)
            if(result.statusText==='OK'){
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
        onSubmit: (values) => {
            login()
        }
    })

    console.log(values)

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='w-2/5 bg-[#2B2BD7] px-5 py-10'>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <h1 className='text-center text-white text-3xl font-semibold'>Login</h1>
                    <input type="text" name='email' value={values.email} onChange={handleChange} placeholder='Enter Your Email' />
                    <input type="password" name='password' value={values.password} onChange={handleChange} placeholder='Enter Your Password' />
                    <div className="submit">
                        <button type='submit'>Submit</button>
                        <div className='button-clear bg-[#8DD1E7]' onClick={resetForm}>Clear</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login

