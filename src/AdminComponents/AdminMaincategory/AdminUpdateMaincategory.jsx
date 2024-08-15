import React, { useEffect, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import FormValidator from '../../UserComponents/FormValidators/FormValidator';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function AdminUpdateMaincategory() {
    let [allData, setAllData] = useState([])
    let [show, setShow] = useState(false)
    let [data, setData] = useState({
        name: "",
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: ""
    })

    let navigate = useNavigate();
    let {id} = useParams()

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

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error) {
            setShow(true)
        }
        else {
            let item = allData.find((x) => x.name?.toLocaleLowerCase() === data.name.toLocaleLowerCase() && x.id !== id)
            if (item) {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        "name": "Maincategory Name is already exist"
                    }
                })
            }
            else {
                let response = await fetch('http://localhost:8000/maincategory/'+id, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ ...data })
                })
                if (response)
                    navigate('/admin/maincategory')
                else
                    alert("Something Went Wrong")
            }
        }
    }

    useEffect(() => {
        (async () => {
            let response = await fetch('http://localhost:8000/maincategory', {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            if (response)
                setAllData(response)
            let item = response.find((x) => x.id === id)
            setData({ ...item })
        })()
    }, [])
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
                                    <input type="text" name="name" value={data.name} onChange={getInputData} className={`form-control border-2 ${show && errorMessage.name ? 'border-danger' : 'border-dark'} `} placeholder='Maincategory Name' />
                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" value={data.active?"1":"0"} onChange={getInputData} className='form-control border-2 border-dark'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <button type='submit' className='btn btn-info w-100 border-2'>Update</button>
                            </div>
                        </form>
                    </div>

                </MainContent>
            </div>
        </>
    )
}
