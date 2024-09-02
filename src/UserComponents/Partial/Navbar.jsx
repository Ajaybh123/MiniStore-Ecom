import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import {getCart} from '../../Redux/ActionCreator/CartActionCreator'
import { useDispatch, useSelector } from 'react-redux'

export default function Navbar() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [cart,setCart] = useState(0)
    let [flag, setFlag] = useState(false)
    let CartStateData = useSelector(state=>state.CartStateData)

    function logout() {
        sessionStorage.removeItem("login")
        sessionStorage.removeItem("name")
        sessionStorage.removeItem("userid")
        navigate('/login')
    }

    useEffect(()=>{
        dispatch(getCart())
        if(CartStateData.length)
            setCart(CartStateData.length)
           setFlag(!flag)
    },[CartStateData.length])
    return (
        <>
            {/* <!-- Navbar start --> */}
            <div className="container-fluid fixed-top">
                <div className="topbar bg-dark d-none d-lg-block">
                    <div className="d-flex justify-content-between">
                        <div className="top-dark">
                            <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-info"></i> <a href="#" className="text-white">A 216B New Ashok Nager, Delhi</a></small>
                            <small className="me-3"><i className="fas fa-envelope me-2 text-info"></i><Link to="mailto:ajayb0663@gmail.com" target='_blank' className="text-white">ajayb0663@gmil.com</Link></small>
                        </div>
                        <div className="top-link ps-2">
                            <Link to="#" target='_blank' className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</Link>
                            <Link to="#" target='_blank' className="text-white"><small className="text-white mx-2">Terms of Use</small>/</Link>
                            <Link to="#" target='_blank' className="text-white"><small className="text-white ms-2">Sales and Refunds</small></Link>
                        </div>
                    </div>
                </div>

                <div className="container px-0">
                    <nav className="navbar navbar-light bg-white navbar-expand-xl">
                        <Link to="/" className="navbar-brand"><h1 className="text-info display-6"><span className='text-dark'>Mini</span>Store</h1></Link>
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars text-info"></span>
                        </button>
                        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                            <div className="navbar-nav mx-auto">
                                <NavLink to="/" className="nav-item  nav-link"  >Home</NavLink>
                                <NavLink to="/about" className="nav-item  nav-link" >About</NavLink>
                                <NavLink to="/shop" className="nav-item  nav-link" >Shop</NavLink>
                                <NavLink to="/shop-detail" className="nav-item  nav-link" >Shop Detail</NavLink>
                                <NavLink to="/contact" className="nav-item  nav-link" >Contact</NavLink>
                                <NavLink to="/admin" className="nav-item  nav-link" >Become a Seller</NavLink>
                            </div>
                            <div className="icon-link d-flex m-3 me-0">
                                <button className="btn-search btn border border-info btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-info"></i></button>
                                <a href="#" className="position-relative me-4 my-auto">
                                    <i className="fa fa-shopping-bag fa-2x"></i>
                                    <Link to="/cart" className="position-absolute bg-dark rounded-circle d-flex align-items-center justify-content-center text-white px-1" style={{ top: "-5px", left: "15px", height: "20px", minWidth: "20px" }}>{cart}</Link>
                                </a>

                                {
                                    sessionStorage.getItem("login") ?
                                        <div className="nav-item dropdown">
                                            <Link to="#" className="nav-link dropdown-toggle text-dark" data-bs-toggle="dropdown">{sessionStorage.getItem("name")}</Link>
                                            <div className="dropdown-menu m-0 bg-info rounded-0">
                                                {
                                                    sessionStorage.getItem("role") === "Buyer" ?
                                                        <>
                                                            <Link to="/profile" className="dropdown-item">Profile</Link>
                                                            <Link to="/cart" className="dropdown-item">Cart</Link>
                                                            <Link to="/chackout" className="dropdown-item">Chackout</Link>
                                                        </> :
                                                        <Link to="/profile" className="dropdown-item">Profile</Link>
                                                }
                                                <button onClick={logout} className="dropdown-item">Logout</button>
                                            </div>

                                        </div>
                                        :
                                        <div className='nav-item'>
                                            <Link to="/login" className="nav-link text-dark btn border-1 border-info">Login</Link>
                                        </div>
                                }

                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {/* <!-- Navbar End --> */}


            {/* <!-- Modal Search Start --> */}
            <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal Search End --> */}
        </>
    )
}
