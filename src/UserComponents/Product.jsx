import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css'
import Breadcrum from './Partial/Breadcrum';

import { getProduct } from '../Redux/ActionCreator/ProductActionCreator'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
export default function Product() {

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

    let [products, setProduct] = useState({ pic: [] })
    let [relatedProduct, SetRelatedProduct] = useState([])
    let [qty, setQty] = useState(1)

    let { id } = useParams()
    let dispatch = useDispatch()
    let ProductStateData = useSelector(state => state.ProductStateData)

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find((x) => x.id === id)
                setProduct(item)
                SetRelatedProduct(ProductStateData.filter((x) => x.maincategory === item.maincategory))
            }
        })()
    }, [ProductStateData.length])
    return (
        <>
            {/* <!-- Single Product Start --> */}
            <Breadcrum title="Product Details" />
            <div className="container-fluid mt-5">
                <div className="container">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-8 col-xl-9">
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="border rounded">
                                        <div id="carouselExampleIndicators" class="carousel slide">
                                            <div class="carousel-indicators">
                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                                {
                                                    products.pic.slice(1).map((item, index) => {
                                                        return <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index + 1} aria-label={`Slide ${index + 1}`}></button>
                                                    })
                                                }
                                            </div>
                                            <div class="carousel-inner">
                                                <div class="carousel-item active">
                                                    <img src={products.pic[0]} height={450} width="100%" class="d-block w-100" alt="..." />
                                                </div>
                                                {
                                                    products.pic.slice(1).map((item, index) => {
                                                        return <div key={index} class="carousel-item">
                                                            <img src={item} height={450} width="100%" class="d-block w-100" alt="..." />
                                                        </div>
                                                    })
                                                }

                                            </div>
                                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h4 className="fw-bold mb-3">{products.name}</h4>
                                    <table className='table'>
                                        <tbody>
                                            <tr>
                                                <th>Maincategory</th>
                                                <td>{products.maincategory}</td>
                                            </tr>
                                            <tr>
                                                <th>Maincategory</th>
                                                <td>{products.subcategory}</td>
                                            </tr>
                                            <tr>
                                                <th>Brand</th>
                                                <td>{products.brand}</td>
                                            </tr>
                                            <tr>
                                                <th>Color/Size</th>
                                                <td>{products.color}/{products.size}</td>
                                            </tr>
                                            <tr>
                                                <th>Stock</th>
                                                <td>{products.stock ? `Yes /${products.quantity} Left in Stock` : ""}</td>
                                            </tr>
                                            <tr>
                                                <th>Fare Price</th>
                                                <td>&#8377;<del className='text-danger'>{products.basePrice}</del></td>
                                            </tr>
                                            <tr>
                                                <th>Discount Price</th>
                                                <td>&#8377;{products.finalPrice} <sup>{products.discount}%</sup></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="input-group quantity mb-4" style={{ width: "100px" }}>
                                        <div className="input-group-btn">
                                            <button onClick={() => qty > 1 ? setQty(qty - 1) : ""} className="btn btn-sm btn-minus rounded-circle bg-light border" >
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text" className="form-control form-control-sm text-center border-0" value={qty} />
                                        <div className="input-group-btn">
                                            <button onClick={() => qty < products.quantity ? setQty(qty + 1) : ""} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <Link to="#" className="btn border border-info rounded-pill mx-2 px-4 py-2 mb-4 text-info w-50"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</Link>
                                        <Link to="#" className="btn border border-info rounded-pill mx-2 px-4 py-2 mb-4 text-success w-50"><i className="fa fa-heart me-2 text-success"></i> Add to wishlist</Link>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <nav>
                                        <div className="nav nav-tabs mb-3">
                                            <button className="nav-link text-dark active border-white border-bottom-0" type="button" role="tab"
                                                id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                                aria-controls="nav-about" aria-selected="true">Description</button>
                                            <button className="nav-link text-dark border-white border-bottom-0" type="button" role="tab"
                                                id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission"
                                                aria-controls="nav-mission" aria-selected="false">Reviews</button>
                                        </div>
                                    </nav>
                                    <div className="tab-content mb-5">
                                        <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                            <p dangerouslySetInnerHTML={{ __html: products.description }} />
                                            <div className="px-2">
                                                <div className="row g-4">
                                                    <div className="col-6">
                                                        <div className="row bg-light align-items-center text-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Weight</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">1 kg</p>
                                                            </div>
                                                        </div>
                                                        <div className="row text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Country of Origin</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">Agro Farm</p>
                                                            </div>
                                                        </div>
                                                        <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Quality</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">Organic</p>
                                                            </div>
                                                        </div>
                                                        <div className="row text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Сheck</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">Healthy</p>
                                                            </div>
                                                        </div>
                                                        <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Min Weight</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">250 Kg</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
                                            <div className="d-flex">
                                                <img src="img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: "100px", height: "100px" }} alt="" />
                                                /                                         <div className="">
                                                    <p className="mb-2" style={{ fontSize: "14px" }}>April 12, 2024</p>
                                                    <div className="d-flex justify-content-between">
                                                        <h5>Jason Smith</h5>
                                                        <div className="d-flex mb-3">
                                                            <i className="fa fa-star text-info"></i>
                                                            <i className="fa fa-star text-info"></i>
                                                            <i className="fa fa-star text-info"></i>
                                                            <i className="fa fa-star text-info"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                    </div>
                                                    <p>The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic
                                                        words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <img src="img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: "100px", height: "100px" }} alt="" />
                                                /                                         <div className="">
                                                    <p className="mb-2" style={{ fontSize: "14px" }}>April 12, 2024</p>
                                                    <div className="d-flex justify-content-between">
                                                        <h5>Sam Peters</h5>
                                                        <div className="d-flex mb-3">
                                                            <i className="fa fa-star text-info"></i>
                                                            <i className="fa fa-star text-info"></i>
                                                            <i className="fa fa-star text-info"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                    </div>
                                                    <p className="text-dark">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic
                                                        words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="nav-vision" role="tabpanel">
                                            <p className="text-dark">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam
                                                amet diam et eos labore. 3</p>
                                            <p className="mb-0">Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore.
                                                Clita erat ipsum et lorem et sit</p>
                                        </div>
                                    </div>
                                </div>
                                <form action="#">
                                    <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                                    <div className="row g-4">
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input type="text" className="form-control border-0 me-4" placeholder="Yur Name *" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input type="email" className="form-control border-0" placeholder="Your Email *" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="border-bottom rounded my-4">
                                                <textarea name="" id="" className="form-control border-0" cols="30" rows="8" placeholder="Your Review *" spellcheck="false"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="d-flex justify-content-between py-3 mb-5">
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 me-3">Please rate:</p>
                                                    <div className="d-flex align-items-center" style={{ fontSize: "12px" }}>
                                                        <i className="fa fa-star text-muted"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <a href="#" className="btn border border-info text-info rounded-pill px-4 py-3"> Post Comment</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3">
                            <div className="row g-4 fruite">
                                <div className="col-lg-12">
                                    <div className="input-group w-100 mx-auto d-flex mb-4">
                                        <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                        <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                                    </div>
                                    <div className="mb-4">
                                        <h4>Categories</h4>
                                        <ul className="list-unstyled fruite-categorie">
                                            <li>
                                                <div className="d-flex justify-content-between fruite-name">
                                                    <a className='text-dark' href="#"><i className="fas text-info fa-apple-alt me-2"></i>Apples</a>
                                                    <span>(3)</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex justify-content-between fruite-name">
                                                    <a className='text-dark' href="#"><i className="fas text-info fa-apple-alt me-2"></i>Oranges</a>
                                                    <span>(5)</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex justify-content-between fruite-name">
                                                    <a className='text-dark' href="#"><i className="fas text-info fa-apple-alt me-2"></i>Strawbery</a>
                                                    <span>(2)</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex justify-content-between fruite-name">
                                                    <a className='text-dark' href="#"><i className="fas text-info fa-apple-alt me-2"></i>Banana</a>
                                                    <span>(8)</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex justify-content-between fruite-name">
                                                    <a className='text-dark' href="#"><i className="fas text-info fa-apple-alt me-2"></i>Pumpkin</a>
                                                    <span>(5)</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <h4 className="mb-4">Featured products</h4>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded" style={{ width: "100px", height: "100px" }}>
                                            <img src="img/featur-1.jpg" className="img-fluid rounded" alt="Image" />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded" style={{ width: "100px", height: "100px" }}>
                                            <img src="img/featur-2.jpg" className="img-fluid rounded" alt="" />
                                            /                                 </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded" style={{ width: "100px", height: "100px" }}>
                                            <img src="img/featur-3.jpg" className="img-fluid rounded" alt="" />
                                            /                                 </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded me-4" style={{ width: "100px", height: "100px" }}>
                                            <img src="img/vegetable-item-4.jpg" className="img-fluid rounded" alt="" />
                                            /                                 </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded me-4" style={{ width: "100px", height: "100px" }}>
                                            <img src="img/vegetable-item-5.jpg" className="img-fluid rounded" alt="" />
                                            /                                 </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded me-4" style={{ width: "100px", height: "100px" }}>
                                            <img src="img/vegetable-item-6.jpg" className="img-fluid rounded" alt="" />
                                            /                                 </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star text-info"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center my-4">
                                        <a href="#" className="btn border border-info px-4 py-3 rounded-pill text-info w-100">Vew More</a>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="position-relative">
                                        <img src="img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt="" />
                                        /                                 <div className="position-absolute" style={{ top: "50%", right: " 10px", transform: "translateY(-50%)" }}>
                                            {/* <h3 className="text-info fw-bold">Fresh <br> Fruits <br> Banner</h3> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="fw-bold mb-0">Related products</h1>
                    <div className="vesitable">
                        <div className="vegetable-carousel justify-content-center">
                            <OwlCarousel className='owl-theme' {...option}>
                                {
                                    relatedProduct.map((item, index) => {
                                        return <div key={index} className="border border-dark ms-2 rounded position-relative vesitable-item">
                                            <div className="vesitable-img">
                                                <img src={item.pic[0]} style={{ height: 250 }} className="img-fluid w-100 rounded-top" alt="" />
                                            </div>
                                            <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", right: "10px" }}>{item.brand}</div>
                                            <div className="p-4 pb-0 rounded-bottom">
                                                <Link to={`/product/${item.id}`}><h4 style={{ height: 50 }}>{item.name}</h4></Link>
                                                <div className="d-flex justify-content-between flex-lg-wrap">
                                                    <p>&#8377;<del className='text-danger'>{item.basePrice}</del></p>
                                                    <p className={`${item.stock ? "text-success" : "text-danger"}`}>{item.stock ? `(In Stock / only ${item.quantity} Left)` : "(Out of Stock)"}</p>
                                                </div>
                                                <div className="d-flex justify-content-between flex-lg-wrap mb-3">
                                                    <p>&#8377;{item.finalPrice} <sup>{item.discount}% off</sup></p>
                                                    <Link to={`/product/${item.id}`} className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</Link>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }

                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Single Product End --> */}

        </>
    )
}
