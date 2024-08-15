import React from 'react'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css'

export default function Latest() {
    const option = {
        responsive:{
                0: {
                    items:1
                },
                768: {
                    items: 4
                }
        },
       
        dots: false,
        loop: true,
        autoplay:true,
        autoplayTimeout:3000,
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
                <div className="container py-5">
                    <h1 className="mb-0">Latest Products</h1>
                    <div className="vegetable-carousel justify-content-center">
                        <OwlCarousel className='owl-theme' {...option}>
                            <div className="border ms-3 border-dark rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt="" />
                                </div>
                                <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", right: "10px" }}>Vegetable</div>
                                <div className="p-4 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                                        <a href="#" className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border ms-3 border-dark rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-1.jpg" className="img-fluid w-100 rounded-top" alt="" />
                                </div>
                                <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", right: "10px" }}>Vegetable</div>
                                <div className="p-4 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                                        <a href="#" className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border ms-3 border-dark rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-3.png" className="img-fluid w-100 rounded-top bg-light" alt="" />
                                </div>
                                <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", right: "10px" }}>Vegetable</div>
                                <div className="p-4 rounded-bottom">
                                    <h4>Banana</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                        <a href="#" className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border ms-3 border-dark rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-4.jpg" className="img-fluid w-100 rounded-top" alt="" />
                                </div>
                                <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", right: "10px" }}>Vegetable</div>
                                <div className="p-4 rounded-bottom">
                                    <h4>Bell Papper</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                        <a href="#" className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border ms-3 border-dark rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt="" />
                                </div>
                                <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", right: "10px" }}>Vegetable</div>
                                <div className="p-4 rounded-bottom">
                                    <h4>Potatoes</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                        <a href="#" className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border ms-3 border-dark rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt="" />
                                </div>
                                <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", right: "10px" }}>Vegetable</div>
                                <div className="p-4 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                        <a href="#" className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border ms-3 border-dark rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt="" />
                                </div>
                                <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", right: "10px" }}>Vegetable</div>
                                <div className="p-4 rounded-bottom">
                                    <h4>Potatoes</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                        <a href="#" className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border ms-3 border-dark rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt="" />
                                </div>
                                <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", right: "" }}>Vegetable</div>
                                <div className="p-4 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                        <a href="#" className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
            {/* <!-- Vesitable Shop End --> */}
        </>
    )
}
