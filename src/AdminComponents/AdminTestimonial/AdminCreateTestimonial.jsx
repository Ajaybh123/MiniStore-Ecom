import React, { useEffect, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getTestimonial, createTestimonial } from '../../Redux/ActionCreator/TestimonialActionCreator'

import ImageValidator from '../../UserComponents/ImageValidators/ImageValidator';
import FormValidator from '../../UserComponents/FormValidators/FormValidator';


export default function AdminCreateTestimonial() {
    let [allData, setAllData] = useState([])
    let [show, setShow] = useState(false)
    let [data, setData] = useState({
        name: "",
        message: "",
        pic: "",
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name is Mendatory",
        message:"Message is Mendatory",
        pic: "Pic is Mendatory"
    })

    let dispatch = useDispatch()
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let navigate = useNavigate()


    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files ? "/testimonials/" + e.target.files[0].name : e.target.value
        if (name !== "active") {
            setErrorMessage((old) => {
                return {
                    ...old,
                    [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
                }
            })
        }
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value
            }
        })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error) {
            setShow(true)
        }
        else {
            let item = allData.find((x) => x.name?.toLocaleLowerCase() === data.name.toLocaleLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        "name": "Testimonial Name is already exist"
                    }
                })
            }
            else {
                dispatch(createTestimonial({ ...data }))
                navigate('/admin/testimonial')
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length)
                setAllData(TestimonialStateData)
            else
                setAllData([])
        })()
    }, [TestimonialStateData.length])
    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                    <Navbar />
                    <div className="container-fluid my-3">
                        <div className="mx-3">
                        <div className="d-flex bg-info text-center p-2  justify-content-between rounded mb-3 my-4">
                        <span className='text-white fs-4'>Testimonial</span>
                            <Link to="/admin/testimonial" className='btn btn-dark'><i className='fa fa-arrow-left'></i> Back</Link>
                        </div>

                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.name ? 'border-danger' : 'border-dark'} `} placeholder='Testimonial Name' />
                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" name="pic" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.pic ? 'border-danger' : 'border-dark'} `} />
                                    {show && errorMessage.pic ? <p className='text-danger text-capitalize'>{errorMessage.pic}</p> : ""}
                                </div>
                            </div>

                            

                            <div className='row'>
                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" onChange={getInputData} className='form-control border-2 border-dark'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <button type='submit' className='btn btn-info w-100 border-2'>Create</button>
                            </div>
                        </form>
                        </div>
                    </div>

                </MainContent>
            </div>
        </>
    )
}
