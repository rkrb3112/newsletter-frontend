import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import {sendToast} from '../utils/sendToast';

const Contact = ()=>{
    const sendEmail = async (values)=>{
        try {
            await axios.post('https://newsletterapi-7pcx.onrender.com/contact', values);
            sendToast('success', 'Successfully sent mail');
        } catch (error) {
            sendToast('error', 'Email could not be sent');
            console.log(error);
        }
    }
    const formik = useFormik({

        initialValues: {
            subject: '',
            content: '',
            email: '',
        },
   
        validationSchema: Yup.object({
            subject: Yup.string().max(30, 'Must be 30 characters or less').required('Subject required'),
            content: Yup.string().required('News body required'),
            email: Yup.string().email('Must be a valid email!').required('Email required'),
        }),
   
        onSubmit: async (values, {resetForm}) => {
            await sendEmail(values);
            resetForm();
        },
   
      });
   
    return (
        <div className="row">
            <div className="col-lg-6 mx-auto">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label" htmlFor="subject">Email subject</label>
                        <input className="form-control" id="subject" type="text" {...formik.getFieldProps('subject')} />
                        {formik.touched.subject && formik.errors.subject ? (
                            <Alert className="mt-3" variant={'danger'}>
                                {formik.errors.subject}
                            </Alert>
                        ) : null
                            // <Alert className="mt-3" variant={'success'}>
                            //     Looks good!
                            // </Alert>
                        }
                    </div>
                    
                    <div className="mb-4">
                        <label className="form-label" htmlFor="content">Content</label>
                        <input className="form-control" id="content" type="text" {...formik.getFieldProps('content')} />
                        {formik.touched.content && formik.errors.content ? (
                            <Alert className="mt-3" variant={'danger'}>
                                {formik.errors.content}
                            </Alert>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label className="form-label" htmlFor="email">Email address</label>
                        <input className="form-control" id="email" type="text" {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email ? (
                            <Alert className="mt-3" variant={'danger'}>
                                {formik.errors.email}
                            </Alert>
                        ) : null}
                    </div>

                    <button className="btn btn-primary" type="submit">Submit</button>
        
                </form>
            </div>
        </div>
   
    );
}

export default Contact;