import React, { useEffect, useState } from 'react'
import FormValidator from './FormValidators/FormValidator'
import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    let navigate = useNavigate();
    let [data, setData] = useState({
        name: "",
        phone: "",
        address: "",
        pin: "",
        city: "",
        state: "",
        pic: ""
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        phone: "",
    })

    let [show, setShow] = useState(false)

    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? `/products/${e.target.files[0].name}` : e.target.value
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidator(e)
            }
        })

        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })

    }


    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error)
            setShow(true)
        else {
            let response = await fetch("/user/"+data.id, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...data })
            })
            response = await response.json()
            if (response) {
                if (data.role === "Buyer")
                    navigate('/profile')
                else
                    navigate("/admin")
            }
        }
    }


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
                setData((old) => {
                    return {
                        ...old,
                        ...item
                    }

                })
            else
                navigate('/login')
        })()
    }, [])
    return (
        <>
            <div className="d-flex justify-content-center align-items-center background" style={{ height: '100vh' }}>
                <div class="card card-respon p-2" >
                    <div class="card-body">
                        <h2 className='text-center text-dark'><span className='text-info'>Mini</span>Store</h2>
                        <h5 class="card-title text-center border-bottom border-2 p-2">Update Your Account</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mt-3">
                                    <label className='text-info'>Name</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} className={`form-control border-2 ${show && errorMessage.name ? "border-danger" : "border-dark"} w-100`} placeholder='Full Name' />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className='text-info'>Phone</label>
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} className={`form-control border-2 ${show && errorMessage.phone ? "border-danger" : "border-dark"} w-100`} placeholder='Phone Number' />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : ""}
                                </div>
                            </div>

                            <div className="mt-3">
                                <label className='text-info'>Address</label>
                                <textarea name="address" value={data.address} onChange={getInputData} className='form-control border-2 border-dark' placeholder='Address...'></textarea>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mt-3">
                                    <label className='text-info'>Pin</label>
                                    <input type="text" name="pin" value={data.pin} onChange={getInputData} className='form-control border-2 border-dark' placeholder='Your Pin' />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className='text-info'>City</label>
                                    <input type="text" name="city" value={data.city} onChange={getInputData} className='form-control border-2 border-dark' placeholder='Your City' />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mt-3">
                                    <label className='text-info'>State</label>
                                    <input type="text" name="state" value={data.state} onChange={getInputData} className='form-control border-2 border-dark' placeholder='Your State' />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className='text-info'>Pic</label>
                                    <input type="file" name="pic" onChange={getInputData} className='form-control border-2 border-dark' placeholder='Your City' />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className='btn btn-info border-2 w-100 mt-4'>Update</button>
                            </div>
                            <div className='mt-2'>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
