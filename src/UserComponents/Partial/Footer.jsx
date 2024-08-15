import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
       {/* <!-- Footer Start --> */}
        <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
            <div className="container py-5">
                <div className="pb-4 mb-4" style={{borderBottom: "1px solid rgba(226, 175, 24, 0.5)"}}>
                    <div className="row g-4">
                        <div className="col-lg-3">
                            <a href="#">
                                <h1 className="text-info mb-0">MiniStore</h1>
                                <p className="text-info mb-0">Brands products</p>
                            </a>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative mx-auto">
                                <input className="form-control border-0 w-100 py-3 px-4 rounded-pill" type="number" placeholder="Your Email"/>
                                <button type="submit" className="btn btn-info border-2 border-info py-3 px-4 position-absolute rounded-pill text-white" style={{height:"57px",top:" 0", right: "0"}}>Subscribe Now</button>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="d-flex justify-content-end pt-3">
                                <a className="btn  btn-outline-info me-2 btn-md-square rounded-circle" href=""><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-info me-2 btn-md-square rounded-circle" href=""><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-info me-2 btn-md-square rounded-circle" href=""><i className="fab fa-youtube"></i></a>
                                <a className="btn btn-outline-info btn-md-square rounded-circle" href=""><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-5">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-light mb-3">Why People Like us!</h4>
                            <p className="mb-4">typesetting, remaining essentially unchanged. It was 
                                popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.</p>
                            <a href="" className="btn border-info py-2 px-4 rounded-pill text-info">Read More</a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="d-flex flex-column text-start footer-item">
                            <h4 className="text-light mb-3">Shop Info</h4>
                            <Link className="btn-link" to="">About Us</Link>
                            <Link className="btn-link" to="">Contact Us</Link>
                            <Link className="btn-link" to="">Privacy Policy</Link>
                            <Link className="btn-link" to="">Terms & Condition</Link>
                            <Link className="btn-link" to="">Return Policy</Link>
                            <Link className="btn-link" to="">FAQs & Help</Link>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="d-flex flex-column text-start footer-item">
                            <h4 className="text-light mb-3">Account</h4>
                            <Link className="btn-link" to="">My Account</Link>
                            <Link className="btn-link" to="">Shop details</Link>
                            <Link className="btn-link" to="">Shopping Cart</Link>
                            <Link className="btn-link" to="">Wishlist</Link>
                            <Link className="btn-link" to="">Order History</Link>
                            <Link className="btn-link" to="">International Orders</Link>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-light mb-3">Contact</h4>
                            <p>Address :<Link className='text-light footer-link' to="/contact"> New Ashok Nager, Delhi</Link></p>
                            <p>Email :<Link className='text-light footer-link' to="mailto:ajayb0663@gmail.com"> ajayb0663@gmail.com</Link></p>
                            <p>Phone :<Link className='text-light footer-link' to="tel:7470417940"> +91 7470417940</Link></p>
                            <p>Payment Accepted</p>
                            <img src="img/payment.png" className="img-fluid" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Footer End --> */}
    </>
  )
}
