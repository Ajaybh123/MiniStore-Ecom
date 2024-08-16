import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import { Link } from 'react-router-dom';

import $ from "jquery"
import "datatables.net"
import "datatables.net-dt/css/dataTables.dataTables.css"

import { getMaincategory, deleteMaincategory } from '../../Redux/ActionCreator/MaincategoryActionCreator'
import { useDispatch, useSelector } from 'react-redux';

export default function AdminMaincategory() {
    const tableRef = useRef()
    let [data, setData] = useState([])
    let dispatch = useDispatch()
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)


    function deleteItem(id) {
        if (window.confirm("Are you really want to delete that item?")) {
            dispatch(deleteMaincategory({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getMaincategory())
        if (MaincategoryStateData.length){
            setData(MaincategoryStateData)
            setTimeout(()=>{
            $('#dataTable').DataTable()
            },100)
        }
        else
            setData([])
    }

    useEffect(() => {
        getAPIData()
    }, [MaincategoryStateData.length])

   
    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                    <Navbar />
                    <div className="container-fluid my-3">
                        <div className="d-flex border-bottom border-2 text-center p-2  justify-content-between rounded mx-3 my-4">
                            <h4>Maincategory</h4>
                            <Link to="/admin/maincategory/create" className='btn btn-dark'><i className='fa fa-plus'></i> Add</Link>
                        </div>

                        <div className='table-responsive text-center mx-3'>
                            <table className='table table-bordered display' id='dataTable' style={{width:"100%"}}>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
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
                                                <td className={`${item.active ? "text-success" : "text-danger"}`}>{item.active ? "Yes" : "No"}</td>
                                                <td><Link to={`/admin/maincategory/update/${item.id}`} className='btn'><i className='fa fa-edit text-success'></i></Link></td>
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
