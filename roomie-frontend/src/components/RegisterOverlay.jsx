import React from 'react'
import { useFormik } from "formik";
import * as yup from 'yup'
import { Link,useNavigate } from 'react-router-dom';
import { axiosInstance } from '../service/axios'

const RegisterOverlay = (props) => {
const navigate= useNavigate()
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
            // registerUser(values)
            // resetForm()
            // setChecked({
            //     male:false,
            //     female:false
            // })
            navigate('/preferences',{state:values})
        }
    })

    // console.log(values)

    return (
        <div className="home flex justify-center items-center w-full h-full ">
            <div className="registration bg-white bg-opacity-80 rounded-xl">
                <div className="text-3xl font-semibold text-center">
                    <h1>Register Here!</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <input type="text" className='bg-slate-200' name='name' value={values.name} onChange={handleChange} placeholder='Enter Your Name' />
                        <input type="text" className='bg-slate-200' name='email' value={values.email} onChange={handleChange} placeholder='Enter Your Email' />
                        <input type="password" className='bg-slate-200' name='password' value={values.password} onChange={handleChange} placeholder='Set Your Password' />
                        <div className='flex gap-2'>
                            <input type="number"  className='flex-1 bg-slate-200' name="age" id="age" value={values.age} onChange={handleChange} placeholder='Enter Your Age' />
                            <select required className='flex-1 bg-slate-200' name="college" id="college" value={values.college} onChange={handleChange} >
                                <option value="" selected={true} disabled>Select Your College</option>
                                <option value="VIT Chennai">VIT-Chennai</option>
                                <option value="VIT Bhopal">VIT-Bhopal</option>
                                <option value="VIT Vellore">VIT-Vellore</option>
                                <option value="VIT AP">VIT-AP</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
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
                            <button type='submit'>Next</button>
                            <div className='button-clear bg-[#8DD1E7]' onClick={resetForm}>Clear</div>
                        </div>
                    </div>
                </form>
                <p className='text-center'>Already have an account? Click <span onClick={()=>props.toggleSignUp()} className='text-green-500 cursor-pointer hover:text-green-400'>here</span> to log in</p>
            </div>
         </div>
    )
}

export default RegisterOverlay