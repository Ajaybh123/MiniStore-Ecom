import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import { Link } from 'react-router-dom';

import $ from "jquery"
import "datatables.net"
import "datatables.net-dt/css/dataTables.dataTables.css"

import { getTestimonial, deleteTestimonial } from '../../Redux/ActionCreator/TestimonialActionCreator'
import { useDispatch, useSelector } from 'react-redux';

export default function AdminTestimonial() {
    const tableRef = useRef()
    let [data, setData] = useState([])
    let dispatch = useDispatch()
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)


    function deleteItem(id) {
        if (window.confirm("Are you really want to delete that item?")) {
            dispatch(deleteTestimonial({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getTestimonial())
        if (TestimonialStateData.length){
            setData(TestimonialStateData)
            setTimeout(()=>{
            $('#dataTable').DataTable()
            },100)
        }
        else
            setData([])
    }

    useEffect(() => {
        getAPIData()
    }, [TestimonialStateData.length])

   
    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                    <Navbar />
                    <div className="container-fluid my-3">
                        <div className="d-flex border-bottom border-2 text-center p-2  justify-content-between rounded mx-3 my-4">
                            <h4>Testimonial</h4>
                            <Link to="/admin/testimonial/create" className='btn btn-dark'><i className='fa fa-plus'></i> Add</Link>
                        </div>

                        <div className='table-responsive text-center mx-3'>
                            <table className='table table-bordered display' id='dataTable' style={{width:"100%"}}>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Pic</th>
                                        <th>Message</th>
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
                                                <td>
                                                    <Link to={`${item.pic}`} target='_blank'>
                                                    <img src={item.pic} height={50} width={50} alt="Testimonial pic" />
                                                    </Link>
                                                </td>
                                                <td >
                                                    <div className='message-table'>
                                                    {item.message}
                                                    </div>
                                                    </td>
                                                <td className={`${item.active ? "text-success" : "text-danger"}`}>{item.active ? "Yes" : "No"}</td>
                                                <td><Link to={`/admin/testimonial/update/${item.id}`} className='btn'><i className='fa fa-edit text-success'></i></Link></td>
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
