import React from 'react'
import { useFormik } from "formik";
import * as yup from 'yup'
import { axiosInstance } from '../service/axios'

const RegisterOverlay = (props) => {

    const [checked,setChecked]=React.useState({
        male:false,
        female:false
    })

    const [status,setStatus]=React.useState('')

    const schema = yup.object().shape({
        name: yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: yup.string().email('Invalid email').required('Required'),
        college: yup.string().required('Required'),
        age: yup.number().required('Required'),
        password: yup.string().required('Required'),
        gender: yup.string().required('Required')
    })

    const registerUser = async (data) => {
        try {
            const user = {
                name: data.name,
                college_name: data.college,
                email: data.email,
                age: data.age,
                password: data.password,
                gender: data.gender
            }
            const result = await axiosInstance.post('api/v1/auth/register', user)
            console.log(result, 'result')
                setStatus('Registration Successful!')
                resetForm()
            
        } catch (error) {
            console.log(error)
            if(error.response.data.msg){
                setStatus(error.response.data.msg)
            }
            else{
                setStatus('Could not register,please try again')
            }
        }
    }

    const { values, handleChange, handleSubmit, touched, errors, resetForm } = useFormik({
        initialValues: {
            name: '',
            email: '',
            college: '',
            age: '',
            password: '',
            gender: ''
        },
        validationSchema: schema,
        onSubmit: (values) => {
            setStatus('')
            registerUser(values)
            // resetForm()
            setChecked({
                male:false,
                female:false
            })
        }
    })

    console.log(values)

    return (
        <div className="home w-full absolute z-10 bg-black bg-opacity-40 h-full">
            <div className="registration bg-[#2B2BD7]">
                <div className="text-3xl text-white font-semibold text-center">
                    <h1>Register Here!</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <input type="text" name='name' value={values.name} onChange={handleChange} placeholder='Enter Your Name' />
                        <input type="text" name='email' value={values.email} onChange={handleChange} placeholder='Enter Your Email' />
                        <input type="password" name='password' value={values.password} onChange={handleChange} placeholder='Set Your Password' />
                        <div className='flex gap-2'>
                            <input type="number" className='flex-1' name="age" id="age" value={values.age} onChange={handleChange} placeholder='Enter Your Age' />
                            <select required className='flex-1' name="college" id="college" value={values.college} onChange={handleChange} >
                                <option value="" selected={true} disabled>Select Your College</option>
                                <option value="VIT">VIT</option>
                                <option value="SRM">SRM</option>
                                <option value="BITS">BITS</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1 text-white'>
                            <div className='flex items-center gap-2'>
                                <input type="radio" className='w-3 h-3' name="gender" value='Male' id="male" onChange={handleChange} />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type="radio" className='w-3 h-3' name="gender" value='Female' id="female" onChange={handleChange} />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                    {status && <p className='text-red-500 text-lg font-semibold'>{status}</p>}
                        <div className="submit">
                            <button type='submit'>Submit</button>
                            <div className='button-clear bg-[#8DD1E7]' onClick={resetForm}>Clear</div>
                            <div className='button-clear bg-white' onClick={()=>props.togglePopup()}>Close</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterOverlay