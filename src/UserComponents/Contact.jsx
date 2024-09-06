import React, { useState } from 'react'
import Breadcrum from './Partial/Breadcrum'
import FormValidator from './FormValidators/FormValidator'
import { createContactUs } from '../Redux/ActionCreator/ContactUsActionCreator'
import { useDispatch } from 'react-redux'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const defaultValue = {
    name: "",
    email: "",
    subject:"",
    message: ""
}

export default function Contact() {
    let [data, setData] = useState(defaultValue)
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        email: "Email Field is Mendatory",
        subject: "Subject Field is Mendatory",
        message: "Message Field is Mendatroy"
    })
    let [show, setShow] = useState(false)
    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidator(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    function postData(e) {
        e.preventDefault();
        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error)
            setShow(true)
        else {
            dispatch(createContactUs({ ...data, active: true, date: new Date() }))
            setData(defaultValue)
            toast.success("Thanks for sharing your query with us our team get back to you shortly!", {
                position: "top-right",
                autoClose: 2000,
            });
        }
    }
    return (
        <>
            <Breadcrum title="Contact Page" />

            {/* <!-- Contact Start --> */}
            <div className="container-fluid contact">
                <div className="container py-2">
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto" style={{ maxWidth: "700px" }}>
                                    <h1 className="text-info">Get in touch</h1>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <form onSubmit={postData}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input type="text" onChange={getInputData} className={`w-100 form-control ${show && errorMessage.name ? "border-danger" : "border-dark"} border-2 py-3 mb-3`} name='name' value={data.name} placeholder={`${show && errorMessage.name ? errorMessage.name : "Enter Your Name"}`} />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="email" onChange={getInputData} className={`w-100 form-control ${show && errorMessage.email ? "border-danger" : "border-dark"} border-2 py-3 mb-3`} name='email' value={data.email} placeholder={`${show && errorMessage.email ? errorMessage.email : "Enter Your Email"}`} />
                                        </div>
                                    </div>
                                    <input type="text" onChange={getInputData} className={`w-100 form-control ${show && errorMessage.subject ? "border-danger" : "border-dark"} border-2 py-3 mb-3`} name='subject' value={data.subject} placeholder={`${show && errorMessage.subject ? errorMessage.subject : "Enter Your Subject"}`} />
                                    <textarea onChange={getInputData} className={`w-100 form-control ${show && errorMessage.message ? "border-danger" : "border-dark"} border-2 mb-3`} rows="5" cols="10" name='message' value={data.message} placeholder={`${show && errorMessage.message ? errorMessage.message : "Your Message"}`}></textarea>
                                    <button className="w-100 btn form-control border-info py-3 bg-white text-info " type="submit">Submit</button>

                                </form>
                            </div>

                            <div className="col-lg-5">
                                <div className="d-flex p-3 rounded mb-4 bg-white">
                                    <i className="fas fa-map-marker-alt fa-2x text-info me-4"></i>
                                    <div>
                                        <h4>Address</h4>
                                        <p className="mb-2">Deepak Chowk Purena Bhilai-3,Durg,Chhattisgarh</p>
                                    </div>
                                </div>
                                <div className="d-flex p-3 rounded mb-4 bg-white">
                                    <i className="fas fa-envelope fa-2x text-info me-4"></i>
                                    <div>
                                        <h4>Mail Us</h4>
                                        <p className="mb-2"><a href="mailto:ajayb0663@gmail.com">ajayb0663@gmail.com</a></p>
                                    </div>
                                </div>
                                <div className="d-flex p-3 rounded bg-white">
                                    <i className="fa fa-phone-alt fa-2x text-info me-4"></i>
                                    <div>
                                        <h4>Telephone</h4>
                                        <p className="mb-2"><a href="tel:7470417940">+91 7470417940</a></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="rounded">
                                    <iframe width="100%" height="300" id="gmap_canvas" src="https://maps.google.com/maps?q=bhilai-3,%20durg,%20Chhattishgarh&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Contact End --> */}
        </>
    )
}
