import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import { Link } from 'react-router-dom';

import $ from "jquery"
import "datatables.net"
import "datatables.net-dt/css/dataTables.dataTables.css"

import { getProduct, deleteProduct } from '../../Redux/ActionCreator/ProductActionCreator'
import { useDispatch, useSelector } from 'react-redux';

export default function AdminProduct() {
    const tableRef = useRef()
    let [data, setData] = useState([])
    let dispatch = useDispatch()
    let ProductStateData = useSelector(state => state.ProductStateData)


    function deleteItem(id) {
        if (window.confirm("Are you really want to delete that item?")) {
            dispatch(deleteProduct({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getProduct())
        if (ProductStateData.length) {
            setData(ProductStateData)
            setTimeout(() => {
                $('#dataTable').DataTable()
            }, 100)
        }
        else
            setData([])
    }

    useEffect(() => {
        getAPIData()
    }, [ProductStateData.length])


    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                    <Navbar />
                    <div className="container-fluid my-3">
                        <div className="d-flex border-bottom border-2 text-center p-2  justify-content-between rounded mx-3 my-4">
                            <h4>Product</h4>
                            <Link to="/admin/product/create" className='btn btn-dark'><i className='fa fa-plus'></i> Add</Link>
                        </div>

                        <div className='table-responsive text-center mx-3'>
                            <table className='table table-bordered display' id='dataTable' style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Maincategory</th>
                                        <th>Subcategory</th>
                                        <th>Brand</th>
                                        <th>Stock</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Base Price</th>
                                        <th>Discount</th>
                                        <th>Final Price</th>
                                        <th>Stock Quantity</th>
                                        <th>Pic</th>
                                        <th>Active</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.maincategory}</td>
                                                <td>{item.subcategory}</td>
                                                <td>{item.brand}</td>
                                                <td className={`${item.stock ? "text-success" : "text-danger"}`}>{item.stock ? "Yes" : "No"}</td>
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                                <td>&#8377;{item.basePrice}</td>
                                                <td>{item.discount}%</td>
                                                <td>&#8377;{item.finalPrice}</td>
                                                <td>{item.quantity}</td>
                                                <td>
                                                    {
                                                        item.pic.map((img, index) => {
                                                            return <Link key={index} to={`${img}`} target='_blank' rel='noreferrer'>
                                                                <img src={img} height={50} width={50} alt="product img" />
                                                            </Link>
                                                        })
                                                    }
                                                </td>
                                                <td className={`${item.active ? "text-success" : "text-danger"}`}>{item.active ? "Yes" : "No"}</td>
                                                <td><Link to={`/admin/product/update/${item.id}`} className='btn'><i className='fa fa-edit text-success'></i></Link></td>
                                                <td><button className='btn' onClick={() => deleteItem(item.id)}><i className='fa fa-trash text-danger'></i></button></td>
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
