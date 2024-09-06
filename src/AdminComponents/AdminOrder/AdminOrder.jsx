import React, { useEffect, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import { Link } from 'react-router-dom';

import $ from "jquery"
import "datatables.net"
import "datatables.net-dt/css/dataTables.dataTables.css"

import { getCheckout, deleteCheckout, updateCheckout } from '../../Redux/ActionCreator/CheckoutActionCreator'
import { useDispatch, useSelector } from 'react-redux';

export default function AdminCheckout() {
    let [data, setData] = useState([])
    let [flag,setFlag] = useState(false)
    let dispatch = useDispatch()
    let count = 1;
    let CheckoutStateData = useSelector(state => state.CheckoutStateData)

    function deleteItem(id) {
        if (window.confirm("Are you really want to delete that item?")) {
            dispatch(deleteCheckout({ id: id }))
            getAPIData()
        }
    }

    
    

    function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length) {
            setData(CheckoutStateData)
            setTimeout(() => {
                $('#dataTable').DataTable()
            }, 100)
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
                            <span className='text-white fs-4'>Order</span>
                        </div>

                        <div className='table-responsive text-center mx-3'>
                            <table className='table table-bordered display' id='dataTable' style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>User</th>
                                        <th>Order Status</th>
                                        <th>Payment Mode</th>
                                        <th>Payment Status</th>
                                        <th>SubTotal</th>
                                        <th>Shipping</th>
                                        <th>Total</th>
                                        <th>Date</th>
                                        <th>Show</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return <tr key={index}>
                                                <td className='text-center'>{count++}</td>
                                                <td>{item.user}</td>
                                                <td ><span className='bg-warning text-white rounded px-2'>{item.orderStatus}</span></td>
                                                <td>{item.paymentMode}</td>
                                                <td ><span className='bg-danger text-white rounded px-2'>{item.paymentStatus}</span></td>
                                                <td className='text-center'>&#8377;{item.subtotal}</td>
                                                <td className='text-center'>&#8377;{item.delivery}</td>
                                                <td className='text-center'>&#8377;{item.total}</td>
                                                <td>{new Date(item.date).toLocaleString()}</td>
                                                <td><Link to={`/admin/checkout/show/${item.id}`}><i className='fa fa-eye text-primary'></i></Link></td>
                                                {item.active===false?<td><button className='btn' onClick={() => deleteItem(item.id)}><i className='fa fa-trash text-danger'></i></button></td>:""} 
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>

                </MainContent>
            </div>
        </>
    )
}
