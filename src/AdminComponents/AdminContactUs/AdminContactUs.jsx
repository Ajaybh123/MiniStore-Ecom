import React, { useEffect, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import { Link } from 'react-router-dom';

import $ from "jquery"
import "datatables.net"
import "datatables.net-dt/css/dataTables.dataTables.css"

import { getContactUs, deleteContactUs, updateContactUs } from '../../Redux/ActionCreator/ContactUsActionCreator'
import { useDispatch, useSelector } from 'react-redux';

export default function AdminContactUs() {
    let [data, setData] = useState([])
    let [flag,setFlag] = useState(false)
    let dispatch = useDispatch()
    let count = 1;
    let ContactUsStateData = useSelector(state => state.ContactUsStateData)

    function deleteItem(id) {
        if (window.confirm("Are you really want to delete that item?")) {
            dispatch(deleteContactUs({ id: id }))
            getAPIData()
        }
    }

    function updateRecord(id) {
        if (window.confirm("Are you really want to delete that item?")) {
            let item = ContactUsStateData.find((x)=>x.id === id)
            let index = ContactUsStateData.findIndex((x)=>x.id === id)
            dispatch(updateContactUs({ ...item,active: !item.active }))
            setFlag(!flag)
            data[index].active = !item.active
        }
    }
    

    function getAPIData() {
        dispatch(getContactUs())
        if (ContactUsStateData.length) {
            setData(ContactUsStateData)
            setTimeout(() => {
                $('#dataTable').DataTable()
            }, 100)
        }
        else
            setData([])
    }

    useEffect(() => {
        getAPIData()
    }, [ContactUsStateData.length])


    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                    <Navbar />
                    <div className="container-fluid my-3">
                    <div className="text-center p-2 bg-info rounded mx-3 my-4">
                            <span className='text-white fs-4'>Contact Us</span>
                        </div>

                        <div className='table-responsive text-center mx-3'>
                            <table className='table table-bordered display' id='dataTable' style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Show</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return <tr key={index}>
                                                <td className='text-center'>{count++}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.subject.slice(0,100)+"..."}</td>
                                                <td><Link to={`/admin/contacts/show/${item.id}`}><i className='fa fa-eye text-primary'></i></Link></td>
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
