import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
    props.title?
    <>
        <div className="container mt-4">
        <div className="testimonial-item ms-2 img-border-radius shadow-sm bg-light p-3">
            <h5>Delivery Address <span className='float-end'><Link to='/update-profile' className='btn border-1 border-info'>Change</Link></span></h5>
            <span><strong>{user.name}</strong>, {user.address}, {user.city}, {user.state}-<strong>{user.pin}</strong>, (+91) {user.phone}</span>
        </div>
        </div>  
    </>:
    <div className="container mt-4">
    <div className="testimonial-item ms-2 img-border-radius bg-light rounded p-4">
        <div className="row mx-3">
            <div className="col-md-6">
                {
                    user?.pic ?
                        <img src={user.pic} height={350} width="100%" alt="user image" /> :
                        <img src='/img/avatar.jpg' height={350} width="100%" alt="user image" />
                }
            </div>
            <div className="col-md-6">
                <h3 className='border-bottom border-2 mb-4'>Information</h3>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <strong>Name</strong>
                        
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <strong>User Name</strong>
                        <p>{user.username}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <strong>Email</strong>
                        <p>{user.email}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <strong>Phone</strong>
                        <p>{user.phone}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <strong>Address</strong>
                        <p>{user.address}</p>
                    </div>
                    <div className="col-md-6">
                        <strong>Pin</strong>
                        <p>{user.pin}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <strong>City</strong>
                        <p>{user.city}</p>
                    </div>
                    <div className="col-md-6">
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
  )
}
