import React, { useEffect, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getBrand, updateBrand } from '../../Redux/ActionCreator/BrandActionCreator'

import ImageValidator from '../../UserComponents/ImageValidators/ImageValidator';
import FormValidator from '../../UserComponents/FormValidators/FormValidator';

export default function AdminUpdateBrand() {
    let [allData, setAllData] = useState([])
    let [show, setShow] = useState(false)
    let [data, setData] = useState({
        name: "",
        pic:"",
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic:""
    })

    let navigate = useNavigate();
    let { id } = useParams()
    let dispatch = useDispatch();
    let BrandStateData = useSelector(state => state.BrandStateData)

    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files ? "/brands/"+ e.target.files[0].name : e.target.value
        if (name !== "active") {
            setErrorMessage((old) => {
                return {
                    ...old,
                    [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
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
            let item = allData.find((x) => x.name?.toLocaleLowerCase() === data.name.toLocaleLowerCase() && x.id !== id)
            if (item) {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'name': "Brand Name is already exist"
                    }
                })
            }
            else {
                dispatch(updateBrand({ ...data }))
                navigate("/admin/brand")
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getBrand())
            if (BrandStateData.length) {
                setAllData(BrandStateData)
                setData(BrandStateData.find((x)=>x.id===id))
            }
            else
                setAllData([])
        })()
    }, [BrandStateData.length])
    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                    <Navbar />
                    <div className="container-fluid my-3">
                        <div className="mx-3">
                        <div className="d-flex bg-info text-center p-2  justify-content-between rounded mb-3 my-4">
                        <span className='text-white fs-4'>Brand</span>
                            <Link to="/admin/brand" className='btn btn-dark'><i className='fa fa-arrow-left'></i> Back</Link>
                        </div>

                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} className={`form-control border-2 ${show && errorMessage.name ? 'border-danger' : 'border-dark'} `} placeholder='Brand Name' />
                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                <label>Pic*</label>
                                    <input type="file" name="pic" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.pic ? 'border-danger' : 'border-dark'} `} />
                                    {show && errorMessage.pic ? <p className='text-danger text-capitalize'>{errorMessage.pic}</p> : ""}
                                </div>

                                <div className='row'>
                                    <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" value={data.active ? "1" : "0"} onChange={getInputData} className='form-control border-2 border-dark'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <button type='submit' className='btn btn-info w-100 border-2'>Update</button>
                            </div>
                        </form>
                        </div>
                    </div>

                </MainContent>
            </div>
        </>
    )
}
