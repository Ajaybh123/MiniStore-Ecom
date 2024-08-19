import React, { useEffect, useState } from 'react'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css'

import {getTestimonial} from '../../Redux/ActionCreator/TestimonialActionCreator'
import { useDispatch, useSelector } from 'react-redux';
export default function Testimonial() {
    let [testimonial,setTestimonial] = useState([])
    let dispatch = useDispatch()
    let TestimonialStateData = useSelector(state=>state.TestimonialStateData)
    const option = {
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        },
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 900, // Transition speed
        fluidSpeed: true, // Makes the transition smoother
        nav: true,
        navText: ['<button class="btn border border-dark text-info" style:"width:80px;border-radius:50px"><i class="fa fa-arrow-left"></i></button>', '<button class="btn border border-dark text-info"><i class="fa fa-arrow-right"></i></button>']
    }

    useEffect(()=>{
        (()=>{
            dispatch(getTestimonial())
            if(TestimonialStateData.length)
                setTestimonial(TestimonialStateData)
        })()
    },[TestimonialStateData.length])
    return (
        <>
            {/* <!-- Tastimonial Start --> */}
            <div className="container-fluid testimonial">
                <div className="container">
                    <div className="testimonial-header text-center">
                        <h4 className="text-info">Our Testimonial</h4>
                        <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
                    </div>
                    <div className="testimonial-carousel">
                        <OwlCarousel className='owl-theme' {...option}>
                            {
                                testimonial.map((item,index)=>{
                                    return <div key={index} className="testimonial-item ms-2 img-border-radius bg-light rounded p-4">
                                    <div className="position-relative">
                                        <i className="fa fa-quote-right fa-2x text-dark position-absolute" style={{ bottom: "30px", right: 0 }}></i>
                                        <div className="mb-4 pb-4 border-bottom border-dark">
                                            <p className="mb-0 message-table">{item.message}
                                            </p>
                                        </div>
                                        <div className="d-flex align-items-center flex-nowrap">
                                            <div className="bg-dark rounded">
                                                <img src={item.pic} className="img-fluid rounded" style={{ width: " 100px", height: "100px" }} alt="" />
                                            </div>
                                            <div className="ms-4 d-block">
                                                <h4 className="text-dark">{item.name}</h4>
                                                <div className="d-flex pe-5">
                                                    <i className="fas fa-star text-info"></i>
                                                    <i className="fas fa-star text-info"></i>
                                                    <i className="fas fa-star text-info"></i>
                                                    <i className="fas fa-star text-info"></i>
                                                    <i className="fas fa-star"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                })
                            }
                            
                           
                        </OwlCarousel>
                    </div>
                </div>
            </div>
            {/* <!-- Tastimonial End --> */}
        </>
    )
}
