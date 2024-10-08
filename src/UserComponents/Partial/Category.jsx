import React from 'react'
import { Link } from 'react-router-dom'

export default function Category({ title, data }) {
    return (
        <>
            {/* <!-- Fruits Shop Start--> */}
            <div className="container-fluid fruite py-5">
                <div className="container">
                    <div className="tab-class text-center">
                        <div className="row g-4">
                            <div className="col-lg-4 text-start">
                                <h1>{title}</h1>
                            </div>
                            <div className="col-lg-8 text-end">
                                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                    <li className="nav-item">
                                        <a className="d-flex m-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-1">
                                            <span className="text-dark" style={{ width: "130px" }}>All Products</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                                            <span className="text-dark" style={{ width: "130px" }}>Men's</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-3">
                                            <span className="text-dark" style={{ width: "130px" }}>Women's</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-4">
                                            <span className="text-dark" style={{ width: "130px" }}>Kid's</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-5">
                                            <span className="text-dark" style={{ width: "130px" }}>Electronics</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            {
                                                data.some((x) => x.maincategory === "Male")?
                                                data.map((item, index) => {
                                                    return <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                                                        <div className="rounded position-relative fruite-item">
                                                            <div className="fruite-img">
                                                                <img src={item.pic[0]} style={{ height: 250 }} className="img-fluid w-100 rounded-top" alt="" />
                                                            </div>
                                                            <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>{item.brand}</div>
                                                            <div className="p-4 border border-dark border-top-0 rounded-bottom">
                                                                <Link to={`/product/${item.id}`}><h4 style={{ height: 50 }}>{item.name}</h4></Link>
                                                                <div className="d-flex justify-content-between flex-lg-wrap">
                                                                    <p>&#8377;<del className='text-danger'>{item.basePrice}</del></p>
                                                                    <p className={`${item.stock ? "text-success" : "text-danger"}`}>{item.stock ? `(In Stock / only ${item.quantity} Left)` : "(Out of Stock)"}</p>
                                                                </div>
                                                                <div className="d-flex justify-content-between flex-lg-wrap">
                                                                    <p>&#8377;{item.finalPrice} <sup>{item.discount}% off</sup></p>
                                                                    <Link to={`/product/${item.id}`} className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                                :
                                                <p>No Male products available.</p>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-2" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            {
                                                data.filter((x)=>x.maincategory === "Male").map((item,index)=>{
                                                           return <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                                                           <div className="rounded position-relative fruite-item">
                                                               <div className="fruite-img">
                                                                   <img src={item.pic[0]} style={{ height: 250 }} className="img-fluid w-100 rounded-top" alt="" />
                                                               </div>
                                                               <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>{item.brand}</div>
                                                               <div className="p-4 border border-dark border-top-0 rounded-bottom">
                                                                   <Link to={`/product/${item.id}`}><h4 style={{ height: 50 }}>{item.name}</h4></Link>
                                                                   <div className="d-flex justify-content-between flex-lg-wrap">
                                                                       <p>&#8377;<del className='text-danger'>{item.basePrice}</del></p>
                                                                       <p className={`${item.stock ? "text-success" : "text-danger"}`}>{item.stock ? `(In Stock / only ${item.quantity} Left)` : "(Out of Stock)"}</p>
                                                                   </div>
                                                                   <div className="d-flex justify-content-between flex-lg-wrap">
                                                                       <p>&#8377;{item.finalPrice} <sup>{item.discount}% off</sup></p>
                                                                       <Link to={`/product/${item.id}`} className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</Link>
                                                                   </div>
                                                               </div>
                                                           </div>
                                                       </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-3" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            {
                                                data.some((x) => x.maincategory === "Female")?
                                                data.filter((x)=>x.maincategory === "Female").map((item,index)=>{
                                                           return <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                                                           <div className="rounded position-relative fruite-item">
                                                               <div className="fruite-img">
                                                                   <img src={item.pic[0]} style={{ height: 250 }} className="img-fluid w-100 rounded-top" alt="" />
                                                               </div>
                                                               <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>{item.brand}</div>
                                                               <div className="p-4 border border-dark border-top-0 rounded-bottom">
                                                                   <Link to={`/product/${item.id}`}><h4 style={{ height: 50 }}>{item.name}</h4></Link>
                                                                   <div className="d-flex justify-content-between flex-lg-wrap">
                                                                       <p>&#8377;<del className='text-danger'>{item.basePrice}</del></p>
                                                                       <p className={`${item.stock ? "text-success" : "text-danger"}`}>{item.stock ? `(In Stock / only ${item.quantity} Left)` : "(Out of Stock)"}</p>
                                                                   </div>
                                                                   <div className="d-flex justify-content-between flex-lg-wrap">
                                                                       <p>&#8377;{item.finalPrice} <sup>{item.discount}% off</sup></p>
                                                                       <Link to={`/product/${item.id}`} className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</Link>
                                                                   </div>
                                                               </div>
                                                           </div>
                                                       </div>
                                                })
                                                :
                                                <p>No Female products available.</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-4" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            {
                                                data.some((x) => x.maincategory === "Kids")?
                                                data.filter((x)=>x.maincategory === "Kids").map((item,index)=>{
                                                           return <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                                                           <div className="rounded position-relative fruite-item">
                                                               <div className="fruite-img">
                                                                   <img src={item.pic[0]} style={{ height: 250 }} className="img-fluid w-100 rounded-top" alt="" />
                                                               </div>
                                                               <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>{item.brand}</div>
                                                               <div className="p-4 border border-dark border-top-0 rounded-bottom">
                                                                   <Link to={`/product/${item.id}`}><h4 style={{ height: 50 }}>{item.name}</h4></Link>
                                                                   <div className="d-flex justify-content-between flex-lg-wrap">
                                                                       <p>&#8377;<del className='text-danger'>{item.basePrice}</del></p>
                                                                       <p className={`${item.stock ? "text-success" : "text-danger"}`}>{item.stock ? `(In Stock / only ${item.quantity} Left)` : "(Out of Stock)"}</p>
                                                                   </div>
                                                                   <div className="d-flex justify-content-between flex-lg-wrap">
                                                                       <p>&#8377;{item.finalPrice} <sup>{item.discount}% off</sup></p>
                                                                       <Link to={`/product/${item.id}`} className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</Link>
                                                                   </div>
                                                               </div>
                                                           </div>
                                                       </div>
                                                })
                                                :
                                                <p>No Kid's products available.</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-5" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            {
                                                 data.some((x) => x.maincategory === "Electronics")?
                                                data.filter((x)=>x.maincategory === "Electronics").map((item,index)=>{
                                                           return <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                                                           <div className="rounded position-relative fruite-item">
                                                               <div className="fruite-img">
                                                                   <img src={item.pic[0]} style={{ height: 250 }} className="img-fluid w-100 rounded-top" alt="" />
                                                               </div>
                                                               <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>{item.brand}</div>
                                                               <div className="p-4 border border-dark border-top-0 rounded-bottom">
                                                                   <Link to={`/product/${item.id}`}><h4 style={{ height: 50 }}>{item.name}</h4></Link>
                                                                   <div className="d-flex justify-content-between flex-lg-wrap">
                                                                       <p>&#8377;<del className='text-danger'>{item.basePrice}</del></p>
                                                                       <p className={`${item.stock ? "text-success" : "text-danger"}`}>{item.stock ? `(In Stock / only ${item.quantity} Left)` : "(Out of Stock)"}</p>
                                                                   </div>
                                                                   <div className="d-flex justify-content-between flex-lg-wrap">
                                                                       <p>&#8377;{item.finalPrice} <sup>{item.discount}% off</sup></p>
                                                                       <Link to={`/product/${item.id}`} className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</Link>
                                                                   </div>
                                                               </div>
                                                           </div>
                                                       </div>
                                                })
                                                :
                                                <p>No electronics products available.</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Fruits Shop End--> */}
        </>
    )
}
