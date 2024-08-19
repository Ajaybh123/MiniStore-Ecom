import React from 'react'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css'
import { Link } from 'react-router-dom';

export default function Latest({ title, data }) {
    const option = {
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 4
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
    return (
        <>
            {/* <!-- Vesitable Shop Start--> */}
            <div className="container-fluid vesitable py-5">
                <div className="container">
                    <h1 className="mb-0">{title}</h1>
                    <div className="vegetable-carousel justify-content-center">
                        <OwlCarousel className='owl-theme' {...option}>
                            {
                                data.map((item, index) => {
                                    return <div key={index} className="border me-3 border-dark rounded position-relative vesitable-item">
                                        <div className="vesitable-img">
                                            <img src={item.pic[0]} style={{height:250}} className="img-fluid w-100 rounded-top" alt="" />
                                        </div>
                                        <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", right: "10px" }}>{item.brand}</div>
                                        <div className="p-4 border border-dark border-top-0 rounded-bottom">
                                            <Link to={`/product/${item.id}`}><h4 style={{ height: 50 }}>{item.name}</h4></Link>
                                            <div className="d-flex justify-content-between flex-lg-wrap">
                                                <p>&#8377;<del className='text-danger'>{item.basePrice}</del></p>
                                                <p className={`${item.stock ? "text-success" : "text-danger"}`}>{item.stock ? `(In Stock / only ${item.quantity} Left)` : "(Out of Stock)"}</p>
                                            </div>
                                            <div className="d-flex justify-content-between flex-lg-wrap">
                                                <p>&#8377;{item.finalPrice} <sup>{item.discount}% off</sup></p>
                                                <a href="#" className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</a>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }

                        </OwlCarousel>
                    </div>
                </div>
            </div>
            {/* <!-- Vesitable Shop End --> */}
        </>
    )
}
