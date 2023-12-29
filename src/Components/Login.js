import React from 'react'
import key from './Image/Key-pana.png'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const Navigate = useNavigate('')
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            // Handle form submission logic here
            console.log('Form values:', values);
            if (values.email === "mitesh@gmail.com" && values.password === "mitesh@123") {
                localStorage.setItem("Login", values.email)
                Navigate('/')
            }
        },
    });
    return (
        <div className="login-con container-fluid">
            <div className="row m-0 p-0">
                <div className="col-lg-6 pt-0 pb-0 ps-5 pe-5 left-img">
                    <img src={key} alt="" className='img-fluid' />
                </div>
                <div className="col-lg-6 d-flex align-items-center  justify-content-center m-0 p-0">

                    <div className='col-lg-8 '>
                        <h1 className='login-h1 text-center'>Login</h1>
                        <form onSubmit={formik.handleSubmit}>

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className='input'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <div className='text-danger'>{formik.errors.email}</div>
                            )}

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className='input'

                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            {formik.errors.password && formik.touched.password && (
                                <div className='text-danger'>{formik.errors.password}</div>
                            )}
                            <div className='d-flex justify-content-center'>

                                <button className='button' type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
