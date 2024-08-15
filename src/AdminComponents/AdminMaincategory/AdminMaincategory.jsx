import React, { useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import FormValidator from '../../UserComponents/FormValidators/FormValidator';

export default function AdminMaincategory() {
    let [data, setData] = useState({
        name: "",
        active: true
    });

    let [errorMessage, setErrorMessage] = useState({
        name: "Name is Mendatory"
    })
    let [show, setShow] = useState(false)

    function getInputData(e) {
        var { name, value } = e.target
        if (name !== "active") {
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
                [name]: name === "active" ? (value === "1" ? true : false) : value
            }
        })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error)
            setShow(true)
        else {
            let response = await fetch("http://localhost:8000/maincategory", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...data })
            })           
        }

    }

    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                    <Navbar />

                    
                </MainContent>
            </div>
        </>
    )
}
