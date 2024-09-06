import React, { useEffect, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import { Link } from 'react-router-dom';

import $ from "jquery"
import "datatables.net"
import "datatables.net-dt/css/dataTables.dataTables.css"

import { getNewsletter, deleteNewsletter, updateNewsletter } from '../../Redux/ActionCreator/NewsletterActionCreator'
import { useDispatch, useSelector } from 'react-redux';

export default function AdminNewsletter() {
    let [data, setData] = useState([])
    let [flag,setFlag] = useState(false)
    let dispatch = useDispatch()
    let count = 1;
    let NewsletterStateData = useSelector(state => state.NewsletterStateData)

    function deleteItem(id) {
        if (window.confirm("Are you really want to delete that item?")) {
            dispatch(deleteNewsletter({ id: id }))
            getAPIData()
        }
    }

    function updateRecord(id) {
        if (window.confirm("Are you really want to delete that item?")) {
            let item = NewsletterStateData.find((x)=>x.id === id)
            let index = NewsletterStateData.findIndex((x)=>x.id === id)
            dispatch(updateNewsletter({ ...item,active: !item.active }))
            setFlag(!flag)
            data[index].active = !item.active
        }
    }
    

    function getAPIData() {
        dispatch(getNewsletter())
        if (NewsletterStateData.length) {
            setData(NewsletterStateData)
            setTimeout(() => {
                $('#dataTable').DataTable()
            }, 100)
        }
        else
            setData([])
    }

    useEffect(() => {
        getAPIData()
    }, [NewsletterStateData.length])


    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                    <Navbar />
                    <div className="container-fluid my-3">
                    <div className="text-center p-2 bg-info rounded mx-3 my-4">
                            <span className='text-white fs-4'>Newsletter</span>
                        </div>

                        <div className='table-responsive text-center mx-3'>
                            <table className='table table-bordered display' id='dataTable' style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Email</th>
                                        <th>Active</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return <tr key={index}>
                                                <td className='text-center'>{count++}</td>
                                                <td>{item.email}</td>
                                                <td onClick={()=>updateRecord(item.id)}><span className={`${item.active?"bg-success":"bg-danger"} px-2 rounded text-white hello`}>{item.active ? "Yes" : "No"}</span></td>
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
