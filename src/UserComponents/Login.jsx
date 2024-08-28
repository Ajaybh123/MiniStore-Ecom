import React, { useState } from 'react'
import FormValidator from './FormValidators/FormValidator'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    let navigate = useNavigate();
    let [data, setData] = useState({
        username: "",
        password: ""


    })
    let [errorMessage, setErrorMessage] = useState({
        username: "UserName is Mendetory",
    })

    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")

    function getInputData(e) {
        let { name, value } = e.target
        setMessage("")
        if (name !== "password") {
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
        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error)
            setShow(true)
        else {
            let response = await fetch("/user", {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
            })
            response = await response.json()
            if (response) {
                let item = response.find((x) => (x.username === data.username || x.email === data.username) && x.password === data.password)
                if (item) {
                    sessionStorage.setItem("login", true)
                    sessionStorage.setItem("name", item.name)
                    sessionStorage.setItem("userid", item.id)
                    sessionStorage.setItem("role", item.role)
                    if (item.role === "Buyer")
                        navigate("/profile")
                    else
                        navigate("/admin")

                }
                else {
                    setShow(true)
                    setMessage("Invalid Username or Password")
                }
            }
        }

    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center background" style={{ height: '100vh' }}>
                <div class="card card-respon p-2" >
                    <div class="card-body">
                        <h2 className='text-center text-dark'><span className='text-info'>Mini</span>Store</h2>
                        <h5 class="card-title text-center border-bottom border-2 p-2">Login With Account</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="mt-3">
                                    <label className='text-info'>Name</label>
                                    <input type="text" name="username" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.username ? "border-danger" : "border-dark"} w-100`} placeholder='Username Or Email' />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : ""}
                                    {show && message ? <p className='text-danger'>{message}</p> : ""}
                                </div>
                                <div className="mt-3">
                                    <label className='text-info'>Password</label>
                                    <input type="password" name="password" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.password ? "border-danger" : "border-dark"} w-100`} placeholder='Password' />
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <Link to="#" className='text-dark mt-2'>Forgetten Password</Link>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className='btn btn-info border-2 w-100 mt-4'>Login</button>
                            </div>
                            <div className='mt-2'>
                                <Link to="/signup" className='text-dark'>Don't Have Account?Create</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
