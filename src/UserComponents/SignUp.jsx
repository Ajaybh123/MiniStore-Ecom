import React, { useState } from 'react'
import FormValidator from './FormValidators/FormValidator'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    let navigate = useNavigate();
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""

    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name is Mendetory",
        username: "Username is Mendetory",
        email: "Email is Mendetory",
        phone: "Phone is Mendetory",
        password: "Password is Mendetory"
    })

    let [show, setShow] = useState(false)

    function getInputData(e) {
        let { name, value } = e.target
        if (name !== "cpassword") {
            setErrorMessage((old) => {
                return {
                    ...old,
                    [name]: FormValidator(e)
                }
            })
        }

        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })

    }


    async function postData(e) {
        e.preventDefault()
        if (data.cpassword === data.password) {
            let error = Object.values(errorMessage).find((x) => x !== "")
            if (error)
                setShow(true)
            else {
                let response = await fetch("/user", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ ...data })
                })
                response = await response.json()
                if(response)
                    navigate("/login")
            }
        }
        else {
            setShow(true)
            setErrorMessage((old) => {
                return {
                    ...old,
                    "password": "password and confirm password is does't matched"
                }
            })
        }
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center background" style={{ height: '100vh' }}>
                <div class="card card-respon p-2" >
                    <div class="card-body">
                        <h2 className='text-center text-dark'><span className='text-info'>Mini</span>Store</h2>
                        <h5 class="card-title text-center border-bottom border-2 p-2">Create Free Account</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mt-3">
                                    <label className='text-info'>Name</label>
                                    <input type="text" name="name" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.name ? "border-danger" : "border-dark"} w-100`} placeholder='Full Name' />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className='text-info'>Username</label>
                                    <input type="text" name="username" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.username ? "border-danger" : "border-dark"} w-100`} placeholder='Username' />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : ""}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mt-3">
                                    <label className='text-info'>Email</label>
                                    <input type="email" name="email" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.email ? "border-danger" : "border-dark"} w-100`} placeholder='Email Address' />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : ""}
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className='text-info'>Phone</label>
                                    <input type="text" name="phone" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.phone ? "border-danger" : "border-dark"} w-100`} placeholder='Phone Number' />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : ""}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mt-3">
                                    <label className='text-info'>Password</label>
                                    <input type="password" name="password" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.password ? "border-danger" : "border-dark"} w-100`} placeholder='Password' />
                                    {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : ""}
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className='text-info'>Confirm Password</label>
                                    <input type="password" name="cpassword" onChange={getInputData} className='form-control border-2 border-dark w-100' placeholder='Confirm Password' />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className='btn btn-info border-2 w-100 mt-3'>SignUp</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
