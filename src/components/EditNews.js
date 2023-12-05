import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert';
import {useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {fetchNewsById} from '../store/actions/index';
import axios from "axios";
import {toast} from 'react-toastify';

const EditNews = ()=>{
    const newsItem = useSelector((store) => store.newsReducer.newsItem);
	// console.log(allNews);
	const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const [newsValues, setNewsValues] = useState({
        title: '',
        content: '',
        image: '',
        author: ''
    })

	useEffect(
		() => {
			dispatch(fetchNewsById(params.id))
            .then(()=>{
                setNewsValues(newsItem);
            })
		},
		[ dispatch, params ]
	);

    const updateNewsInDb = async (values)=>{
        try {
            const news = {
                title: values.title,
                image: values.image,
                author: values.author,
                content: values.content
            };
            await axios.patch(`https://newsletterapi-7pcx.onrender.com/news/${params.id}`, {news});
            toast.success('Successfully updated the news', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({

        initialValues: {
            title: newsValues.title,
            content: newsValues.content,
            author: newsValues.author,
            image: newsValues.image
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().max(30, 'Must be 30 characters or less').required('Headline required'),
            content: Yup.string().required('News body required'),
            author: Yup.string().max(15, 'Username must be below 15 characters').required('Username required'),
            image: Yup.string().url('Must be a valid url').required('Image is required')
        }),
   
        onSubmit: async (values) => {
            await updateNewsInDb(values);
        },
    });
   
    return (
        <div className="row">
            <div className="col-lg-6 mx-auto">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input className="form-control" id="title" type="text" {...formik.getFieldProps('title')} />
                        {formik.touched.title && formik.errors.title ? (
                            <Alert className="mt-3" variant={'danger'}>
                                {formik.errors.title}
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
                        <label className="form-label" htmlFor="author">Author</label>
                        <input className="form-control" id="author" type="text" {...formik.getFieldProps('author')} />
                        {formik.touched.author && formik.errors.author ? (
                            <Alert className="mt-3" variant={'danger'}>
                                {formik.errors.author}
                            </Alert>
                        ) : null}
                    </div>
                    
                    <div className="mb-4">
                        <label className="form-label" htmlFor="image">Image</label>
                        <input className="form-control" id="image" type="text" {...formik.getFieldProps('image')} />
                        {formik.touched.image && formik.errors.image ? (
                            <Alert className="mt-3" variant={'danger'}>
                                {formik.errors.image}
                            </Alert>
                        ) : null}
                    </div>

                    <button className="btn btn-primary" type="submit">Submit</button>
        
                </form>
            </div>
        </div>
   
    );
}

export default EditNews;