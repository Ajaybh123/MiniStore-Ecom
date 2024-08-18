import React from 'react'

export default function Fact() {
  return (
    <>
       {/* <!-- Fact Start --> */}
        <div className="container-fluid py-5">
            <div className="container">
                <div className="bg-light p-5 rounded">
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="counter bg-white rounded p-5">
                                <i className="fa fa-shield-alt text-dark"></i>
                                <h4>Trusted Ministore Company</h4>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="counter bg-white rounded p-5">
                                <i className="fa fa-exchange-alt text-dark"></i>
                                <h4>10 Days Refund Policy</h4>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="counter bg-white rounded p-5">
                                <i className="fa fa-truck text-dark"></i>
                                <h4>Fast and Free Delivery</h4>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="counter bg-white rounded p-5">
                                <i className="fa fa-users text-dark"></i>
                                <h4>24/7 Customer Support</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Fact Start --> */}
    </>
  )
}
