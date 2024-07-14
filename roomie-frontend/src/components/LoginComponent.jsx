import React from 'react'
import { useFormik } from "formik";
import * as yup from 'yup'
import { axiosInstance } from '../service/axios'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const LoginComponent = (props) => {
    const navigate = useNavigate()

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

    return (
            <div className='flex items-center justify-center'>
                <div className='flex flex-col justify-between w-2/5 h-3/5 bg-white bg-opacity-80 gap-7 px-5 py-10 rounded-xl'>
                    <h1 className='text-center text-3xl font-semibold'>Login</h1>
                    <form className='flex flex-col gap-8 items-center justify-center' onSubmit={handleSubmit}>
                        <input type="text" className='w-4/5 rounded-sm bg-slate-200' name='email' value={values.email} onChange={handleChange} placeholder='Enter Your Email' />
                        <input type="password" className='w-4/5 rounded-sm bg-slate-200' name='password' value={values.password} onChange={handleChange} placeholder='Enter Your Password' />
                        <div className="submit">
                            <button type='submit'>Submit</button>
                            <div className='button-clear bg-[#8DD1E7]' onClick={resetForm}>Clear</div>
                        </div>
                    </form>
                    <p className='text-center'>Don't have an account? Click <span onClick={()=>props.toggleSignUp()} className='text-green-500 cursor-pointer hover:text-green-400'>here</span> to sign up</p>
                </div>
            </div> 
    )
}

export default LoginComponent
