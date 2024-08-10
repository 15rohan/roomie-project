import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from 'react'
import { axiosInstance } from '../service/axios';

const ListingForm = () => {
    return (
        <Formik
            initialValues={{ room: '', contact: '', accomodation: '', description: '' }}
            validationSchema={Yup.object({
                room: Yup.string()
                    .min(2, 'Too short')
                    .max(30, 'Too long')
                    .required(''),
                description: Yup.string()
                    .min(2, 'Too short')
                    .max(100, 'Too long')
                    .required(''),
                contact: Yup.string()
                    .matches(/^\s*\d+\s*$/, 'Contact number should contain digits only')
                    .required(''),
                accomodation: Yup.string().oneOf(['4AC', '6AC', '4NAC', '6NAC'])
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log(values)
            }}
        >{(props) => (
            <Form className="flex flex-col px-5 w-11/12 bg-black text-white mx-auto rounded-sm py-10 gap-10">
                <div className='flex flex-col gap-1'>
                    {/* <p className='font-bold italic text-lg' >Room</p> */}
                    <Field autoComplete='off' name='room' type='text' className='bg-black w-full border-b px-0 border-white' placeholder='Room Number' />
                </div>
                <div className='flex flex-col gap-1'>
                    {/* <p className='font-bold italic text-lg' >Contact</p> */}
                    <Field autoComplete='off' name='contact' type='text' className='bg-black w-full border-b px-0 border-white' placeholder='Contact Number' />
                </div>
                <div className='flex flex-col gap-1'>
                    {/* <p className='font-bold italic text-lg' >Description</p> */}
                    <Field autoComplete='off' name='description' type='text' className='bg-black w-full border-b px-0 border-white' placeholder='Room Description' />
                </div>
                <div className='flex flex-col gap-1'>
                    {/* <p className='font-bold italic text-lg' >Accomodation</p> */}
                    <Field autoComplete='off' name='accomodation' type='text' className='bg-black w-full border-b px-0 border-white' placeholder='Accomodation Type' />
                </div>
                <div className='flex items-center justify-center'>
                    <button type="submit" className='bg-white text-black hover:bg-white hover:text-opacity-80'>Create</button>
                </div>
            </Form>)}
        </Formik>
    )
}

const CreateListing = () => {
    return (
        <div className="flex items-center justify-center min-h-[92vh]">
            <div className="w-1/2 min-h-[92vh] p-5 flex items-center justify-center text-5xl font-semibold">Create Your Own Listing to Let People Know What You're Looking For</div>
            <div className="w-1/2 min-h-[92vh]  flex items-center justify-center">
                <ListingForm />
            </div>
        </div>
    )
}

export default CreateListing