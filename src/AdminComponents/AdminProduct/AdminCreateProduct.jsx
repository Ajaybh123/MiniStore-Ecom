import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createProduct } from '../../Redux/ActionCreator/ProductActionCreator'
import { getMaincategory } from '../../Redux/ActionCreator/MaincategoryActionCreator';
import { getSubcategory } from '../../Redux/ActionCreator/SubcategoryActionCreator';
import { getBrand } from '../../Redux/ActionCreator/BrandActionCreator';

import ImageValidator from '../../UserComponents/ImageValidators/ImageValidator';
import FormValidator from '../../UserComponents/FormValidators/FormValidator';


var rte;
export default function AdminCreateProduct() {
    var refdiv=useRef(null);
    let [maincategory, setMaincategory] = useState([])
    let [subcategory, setSubcategory] = useState([])
    let [brand, setBrand] = useState([])
    let [show, setShow] = useState(false)
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: "",
        size: "",
        basePrice: "",
        discount: "",
        finalPrice: "",
        stock: true,
        quantity: "",
        pic: [],
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name is Mendatory",
        color: "Color is Mendatory",
        size: "Size is Mendatory",
        basePrice: "BasePrice is Mendatory",
        quantity: "Quantity is Mendatory",
        discount: "Discount is Mendatory",
        pic: ["Pic is Mendatory"]
    })

    let dispatch = useDispatch()
    let navigate = useNavigate()
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)


    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files ? Array.from(e.target.files).map((item) => "/products/" + item?.name) : e.target.value
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
                [name]: name === "active" || name === "stock" ? (value === "1" ? true : false) : value
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
            let basePrice = parseInt(data.basePrice)
            let discount = parseInt(data.discount)
            let finalPrice = parseInt(basePrice - basePrice * discount / 100)
            dispatch(createProduct({
                ...data,
                maincategory: data.maincategory === "" ? maincategory[0].name : data.maincategory,
                subcategory: data.subcategory === "" ? subcategory[0].name : data.subcategory,
                brand: data.brand === "" ? brand[0].name : data.brand,
                basePrice: basePrice,
                discount: discount,
                finalPrice: finalPrice,
                quantity: parseInt(data.quantity),
                description: rte.getHTMLCode()
            }))
            navigate('/admin/product')
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
            if (MaincategoryStateData.length)
                setMaincategory(MaincategoryStateData.filter((x) => x.active === true))
        })()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
            if (SubcategoryStateData.length)
                setSubcategory(SubcategoryStateData.filter((x) => x.active === true))
        })()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
            if (BrandStateData.length)
                setBrand(BrandStateData.filter((x) => x.active === true))
        })()
    }, [BrandStateData.length])

    useEffect(()=>{
        rte=new window.RichTextEditor(refdiv.current);
        rte.setHTMLCode("");
    },[])
    
    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                    <Navbar />
                    <div className="container-fluid my-3">
                        <div className="d-flex bg-info text-center p-2  justify-content-between rounded mb-3 mx-3">
                            <h4>Product</h4>
                            <Link to="/admin/product" className='btn btn-dark'><i className='fa fa-arrow-left'></i> Back</Link>
                        </div>

                        <form onSubmit={postData} className='mx-3'>
                            <div className="mb-3">
                                <label>Name*</label>
                                <input type="text" name="name" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.name ? 'border-danger' : 'border-dark'} `} placeholder='Product Name' />
                                {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                            </div>

                            <div className="row">
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label>Maincategory</label>
                                    <select name="maincategory" onChange={getInputData} className="form-control border-2 border-dark" >
                                        {
                                            maincategory.map((item, index) => {
                                                return <option key={index}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label>Subcategory</label>
                                    <select name="subcategory" onChange={getInputData} className="form-control border-2 border-dark" >
                                        {
                                            subcategory.map((item, index) => {
                                                return <option key={index}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label>Brand</label>
                                    <select name="brand" onChange={getInputData} className="form-control border-2 border-dark" >
                                        {
                                            brand.map((item, index) => {
                                                return <option key={index}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label>Stock</label>
                                    <select name="stock" onChange={getInputData} className="form-control border-2 border-dark" >
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Color*</label>
                                    <input type="text" name="color" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.color ? 'border-danger' : 'border-dark'} `} placeholder='Product Color' />
                                    {show && errorMessage.color ? <p className='text-danger text-capitalize'>{errorMessage.color}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Size*</label>
                                    <input type="text" name="size" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.size ? 'border-danger' : 'border-dark'} `} placeholder='Product Size' />
                                    {show && errorMessage.size ? <p className='text-danger text-capitalize'>{errorMessage.size}</p> : ""}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Base Price*</label>
                                    <input type="number" name="basePrice" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.basePrice ? 'border-danger' : 'border-dark'} `} placeholder='Product BasePrice' />
                                    {show && errorMessage.basePrice ? <p className='text-danger text-capitalize'>{errorMessage.basePrice}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Discount*</label>
                                    <input type="number" name="discount" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.discount ? 'border-danger' : 'border-dark'} `} placeholder='Product Discount' />
                                    {show && errorMessage.discount ? <p className='text-danger text-capitalize'>{errorMessage.discount}</p> : ""}
                                </div>
                            </div>

                            <div className='mb-3'>
                                  <label>Description*</label>
                                  <div ref={refdiv}></div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Stock Quantity*</label>
                                    <input type="number" name="quantity" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.quantity ? 'border-danger' : 'border-dark'} `} placeholder='Product Name' />
                                    {show && errorMessage.quantity ? <p className='text-danger text-capitalize'>{errorMessage.quantity}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" multiple name="pic" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.pic ? 'border-danger' : 'border-dark'} `} />
                                    {show && errorMessage.pic ? errorMessage.pic.join("|").split("|").map((item, index) => {
                                        return <p className='text-danger text-capitalize' key={index}>{item}</p>
                                    }) : ""}
                                </div>
                            </div>


                            <div className='row'>
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
