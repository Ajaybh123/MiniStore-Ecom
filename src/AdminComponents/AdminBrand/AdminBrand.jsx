import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import { Link } from 'react-router-dom';

import $ from "jquery"
import "datatables.net"
import "datatables.net-dt/css/dataTables.dataTables.css"

import { getBrand, deleteBrand } from '../../Redux/ActionCreator/BrandActionCreator'
import { useDispatch, useSelector } from 'react-redux';

export default function AdminBrand() {
    const tableRef = useRef()
    let [data, setData] = useState([])
    let dispatch = useDispatch()
    let count = 1;
    let BrandStateData = useSelector(state => state.BrandStateData)


    function deleteItem(id) {
        if (window.confirm("Are you really want to delete that item?")) {
            dispatch(deleteBrand({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getBrand())
        if (BrandStateData.length){
            setData(BrandStateData)
            setTimeout(()=>{
            $('#dataTable').DataTable()
            },100)
        }
        else
            setData([])
    }

    useEffect(() => {
        getAPIData()
    }, [BrandStateData.length])

   
    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                    <Navbar />
                    <div className="container-fluid my-3">
                        <div className="d-flex bg-info text-center p-2  justify-content-between rounded mx-3 my-4">
                            <span className='text-white fs-4'>Brand</span>
                            <Link to="/admin/brand/create" className='btn btn-dark'><i className='fa fa-plus'></i> Add</Link>
                        </div>

                        <div className='table-responsive text-center mx-3'>
                            <table className='table table-bordered display' id='dataTable' style={{width:"100%"}}>
                                <thead>
                                    <tr>
                                        <th>S.NO</th>
                                        <th>Name</th>
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
                                                <td className='text-center'>{count++}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <Link to={`${item.pic}`} target='_blank' rel='noreferrer'>
                                                    <img src={item.pic} height={50} width={50} alt="brand pic" />
                                                    </Link>
                                                </td>
                                                <td><span className={`${item.active?"bg-success":"bg-danger"} px-2 rounded text-white hello`}>{item.active ? "Yes" : "No"}</span></td>
                                                <td><Link to={`/admin/brand/update/${item.id}`} className='btn'><i className='fa fa-edit text-primary'></i></Link></td>
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
