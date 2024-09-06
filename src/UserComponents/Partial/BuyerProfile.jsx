import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserSidebar from './UserSidebar'

export default function BuyerProfile(props) {
    let [user, setUser] = useState({})
    let navigate = useNavigate()

    useEffect(() => {
        (async () => {
            let response = await fetch("/user", {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            let item = response.find((x) => x.id === sessionStorage.getItem("userid"))
            if (item)
                setUser(item)
            else
                navigate('/login')
        })()
    }, [])

    return (
        props.title ?
            <>
                <div className={`${props.title === "OrderDetail" ? "" : "container mt-4"}`}>
                    <div className="testimonial-item ms-2 img-border-radius shadow-sm bg-white p-3">
                        <h5>Delivery Address {props.title === "OrderDetail" ? "" : <span className='float-end'><Link to='/update-profile' className='btn border-1 border-info'>Change</Link></span>}</h5>
                        <span><strong>{user.name}</strong>, {user.address}, {user.city}, {user.state}-<strong>{user.pin}</strong>, (+91) {user.phone}</span>
                    </div>
                </div>
            </> :
            <div className="container mt-4">
                <div className='row'>
                    <div className="col-md-3">
                        <UserSidebar />
                    </div>

                    <div className="col-md-9">
                        <div className="testimonial-item ms-2 img-border-radius shadow-sm bg-white p-4">
                            <div className="mt-3">
                                <h3 className='border-bottom border-2 mb-4'>Information</h3>
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <strong>Name</strong>
                                        <p>{user.name}</p>

                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <strong>User Name</strong>
                                        <p>{user.username}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <strong>Email</strong>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <strong>Phone</strong>
                                        <p>{user.phone}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <strong>Address</strong>
                                        <p>{user.address}</p>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <strong>Pin</strong>
                                        <p>{user.pin}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <strong>City</strong>
                                        <p>{user.city}</p>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <strong>State</strong>
                                        <p>{user.state}</p>
                                    </div>
                                </div>
                                <div>
                                    <Link to='/update-profile' className='btn bg-info text-dark w-100'>Update Profile</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}
