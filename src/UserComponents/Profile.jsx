import React, { useEffect, useState } from 'react'
import Breadcrum from './Partial/Breadcrum'
import { Link, useNavigate } from 'react-router-dom'

export default function Profile() {
    let [user,setUser] = useState({})
    let navigate = useNavigate()

    useEffect(()=>{
        (async()=>{
            let response = await fetch("/user",{
                method:"GET",
                headers:{
                    "content-type":"application/json"
                }
            })
            response = await response.json()
            let item = response.find((x)=>x.id === sessionStorage.getItem("userid"))
            if(item)
                setUser(item)           
            else
            navigate('/login')
        })()
    },[])
    return (
        <>
            <Breadcrum title="Profile Page" />
            <div className="container mt-4">
                <div className="testimonial-item ms-2 img-border-radius bg-light rounded p-4">
                    <div className="row mx-3">
                        <div className="col-md-6">
                            {
                                user.pic?
                                <img src={user.pic} height={350} width="100%" alt="user image" />:
                                <img src='/img/avatar.jpg' height={350} width="100%" alt="user image" />
                            }
                        </div>
                        <div className="col-md-6">
                            <h3 className='border-bottom border-2 mb-4'>Information</h3>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <strong>Name</strong>
                                    <p>{user.name}</p>
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
                            {/* <table className='table'>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <th>User Name</th>
                                        <td>{user.username}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{user.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Pin</th>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <th>City</th>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <th>State</th>
                                        <td>{user.name}</td>
                                    </tr>
                                </tbody>
                            </table> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
