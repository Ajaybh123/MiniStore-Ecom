import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function UserSidebar() {
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
    <>
      <div className="testimonial-item ms-2 img-border-radius shadow-sm mb-4 bg-white p-3">
                            <div className='d-flex gap-3'>
                                {
                                    user?.pic ?
                                        <img src={user.pic} height={50} width={50} className='rounded-circle' alt="user image" /> :
                                        <img src='/img/avatar.jpg' height={350} width="100%" alt="user image" />
                                }
                                <div>
                                    <span>Hello,</span>
                                    <p className='profil_side'><strong>{user.name}</strong></p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-item ms-2 img-border-radius shadow-sm bg-white">
                            <h5 className='px-4 pt-3'>User History & Details</h5>
                            <hr />
                            <div>
                                <p className='px-4 p-2 order'><NavLink to="/profile" className="text-dark active">My Profile</NavLink></p>
                                <p className='px-4 p-2 order'><NavLink to="/order" className="text-dark active">Orders</NavLink></p>
                                <p className='px-4 p-2 order'><NavLink to="/wishlist" className="text-dark active">Wishlist</NavLink></p>
                                <p className='px-4 p-2 order'><NavLink to="/cart" className="text-dark active">Cart</NavLink></p>
                            </div>
                            <hr />
                            <p className='px-4 pb-3'><i className='fa fa-sign-out-alt me-2'></i><Link to="/logout" className="text-dark active">Logout</Link></p>
                        </div>
    </>
  )
}
