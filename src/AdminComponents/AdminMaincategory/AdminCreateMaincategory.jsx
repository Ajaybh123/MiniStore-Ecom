import React, { useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import FormValidator from '../../UserComponents/FormValidators/FormValidator';
import { Link } from 'react-router-dom';

export default function AdminMaincategory() {
    let [show, setShow] = useState(false)
    let [data, setData] = useState({
        name: "",
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name is Mendatory"
    })


    function getInputData(e) {
        let { name, value } = e.target
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

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error) {
            setShow(true)
        }
        else {
            alert(`Name ${data.name} and ${data.active}`)
        }

    }


    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                    <Navbar />
                    <div className="container-fluid my-3">
                        <div className="d-flex bg-info text-center p-2  justify-content-between rounded mb-3">
                            <h4>Maincategory</h4>
                            <Link to="/admin/maincategory" className='btn btn-dark'><i className='fa fa-arrow-left'></i> Back</Link>
                        </div>

                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.name?'border-danger':'border-dark'} `} placeholder='Maincategory Name' />
                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" onChange={getInputData} className='form-control border-2 border-dark'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <button type='submit' className='btn btn-info w-100 border-2'>Create</button>
                            </div>
                        </form>
                    </div>

                </MainContent>
            </div>
        </>
    )
}
