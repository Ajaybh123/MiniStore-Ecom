import React, { useEffect, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getCheckout, deleteCheckout, updateCheckout } from '../../Redux/ActionCreator/CheckoutActionCreator'
import { useDispatch, useSelector } from 'react-redux';

export default function AdminCheckoutShow() {
    let [data, setData] = useState({})
    let [user, setUser] = useState({})
    let [flag, setFlag] = useState(false)
    let { id } = useParams()
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let count = 1;
    let CheckoutStateData = useSelector(state => state.CheckoutStateData)

    function deleteItem() {
        if (window.confirm("Are you really want to delete that item?")) {
            dispatch(deleteCheckout({ id: id }))
            navigate('/admin/contacts')
        }
    }

    function updateRecord() {
        if (window.confirm("Are you really want to change the status?")) {
            let item = CheckoutStateData.find((x) => x.id === id)
            let index = CheckoutStateData.findIndex((x) => x.id === id)
            dispatch(updateCheckout({ ...item, active: !item.active }))
            setFlag(!flag)
            setData((old) => {
                return {
                    ...old,
                    active: false
                }
            })
        }
    }


    async function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length) {
            let item = CheckoutStateData.find((x) => x.id === id)
            setData(item)
            let response = await fetch("/user/" + item.user, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            if (response)
                setUser(response)
        }
        else
            setData([])
    }

    useEffect(() => {
        getAPIData()
    }, [CheckoutStateData.length])


    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                    <Navbar />
                    <div className="container-fluid my-3">
                        <div className="text-center p-2 bg-info rounded mx-3 my-4">
                            <span className='text-white fs-4'>Order Show</span>
                        </div>

                        <div className="mx-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="testimonial-item img-border-radius shadow-sm bg-white p-4">
                                        <span className='float-end text-primary'>{new Date(data.date).toDateString()}</span>

                                        {data.products?.map((product, idx) => (
                                            <div key={idx} className="row">
                                                <div className="col-md-3 mb-1">
                                                    <img src={product.pic} height={100} width="100%" alt="" />
                                                </div>
                                                <div className='col-md-9'>
                                                    <div className='d-flex justify-content-between'>
                                                        <div>
                                                            <h6>{product.name}</h6>
                                                            <span><strong>Brand</strong>: {product.brand}</span>,
                                                            <span><strong>Color</strong>: {product.color}</span>,
                                                            <span><strong>Size</strong>: {product.size}</span>
                                                            <p><strong>Quantity</strong>: {product.qty} * &#8377;{product.price} </p>
                                                            <span>&#8377;{product.total}</span>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="testimonial-item img-border-radius shadow-sm bg-white p-4">
                                        <h6>Delivery Info</h6>
                                        <span><strong>{user.name}</strong>, {user.address}, {user.city}, {user.state}-<strong>{user.pin}</strong>, (+91) {user.phone}</span>

                                        <h6 className='mt-3'>Payment Info</h6>
                                        <p className='extra'>Payment Mode: {data.paymentMode}</p>
                                        <p className='extra'>Payment Status: {data.paymentStatus}</p>
                                        
                                        <p className='extra'>Subtotal: &#8377;{data.subtotal}</p>
                                        <p className='extra'>Shipping: &#8377;{data.delivery}</p>
                                        <p className='extra'>Total Amount: &#8377;{data.total}</p>
                                        
                                        <h6 className='mt-3'>Order Info</h6>
                                        <p>Order Status: {data.orderStatus}</p>
                                        {
                                            data.orderStatus!=="Delivered" && data.paymentStatus!=="Done"?<button className='btn bg-info text-white w-100'>Update Status</button>:""
                                        }
                                        {/* <div className='table-responsive mx-3'>
                                        <table className='table table-bordered'>
                                            <tbody>
                                                <tr>
                                                    <th>Id</th>
                                                    <td>{data.id}</td>
                                                </tr>
                                                <tr>
                                                    <th>User</th>
                                                    <td>{data.user}</td>
                                                </tr>
                                                <tr>
                                                    <th>Order Status</th>
                                                    <td>{data.orderStatus}</td>
                                                </tr>
                                                <tr>
                                                    <th>Payment Mode</th>
                                                    <td>{data.paymentMode}</td>
                                                </tr>
                                                <tr>
                                                    <th>Payment Status</th>
                                                    <td>{data.paymentStatus}</td>
                                                </tr>
                                                <tr>
                                                    <th>Subtotal</th>
                                                    <td>&#8377;{data.subtotal}</td>
                                                </tr>
                                                <tr>
                                                    <th>Shipping Charge</th>
                                                    <td>&#8377;{data.delivery}</td>
                                                </tr>
                                                <tr>
                                                    <th>Total Amount</th>
                                                    <td>&#8377;{data.total}</td>
                                                </tr>
                                                <tr>
                                                    <th>Rppid</th>
                                                    <td>{data.rppid}</td>
                                                </tr>
                                                <tr>
                                                    <th>Date</th>
                                                    <td>{new Date(data.date).toLocaleString()}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>
                                                        {data.active ?
                                                            <button className='btn bg-dark text-white w-100' onClick={updateRecord}>Update Status To Done</button> :
                                                            <button className='btn bg-danger text-white w-100' onClick={deleteItem}>Delete</button>
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainContent>
            </div>
        </>
    )
}
