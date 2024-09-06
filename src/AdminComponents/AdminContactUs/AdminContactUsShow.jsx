import React, { useEffect, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getContactUs, deleteContactUs, updateContactUs } from '../../Redux/ActionCreator/ContactUsActionCreator'
import { useDispatch, useSelector } from 'react-redux';

export default function AdminContactUsShow() {
    let [data, setData] = useState({})
    let [flag,setFlag] = useState(false)
    let {id} = useParams()
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let count = 1;
    let ContactUsStateData = useSelector(state => state.ContactUsStateData)

    function deleteItem() {
        if (window.confirm("Are you really want to delete that item?")) {
            dispatch(deleteContactUs({ id: id }))
            navigate('/admin/contacts')
        }
    }

    function updateRecord() {
        if (window.confirm("Are you really want to change the status?")) {
            let item = ContactUsStateData.find((x)=>x.id === id)
            let index = ContactUsStateData.findIndex((x)=>x.id === id)
            dispatch(updateContactUs({ ...item,active: !item.active }))
            setFlag(!flag)
            setData((old)=>{
                return{
                    ...old,
                    active:false
                }
            })
        }
    }
    

    function getAPIData() {
        dispatch(getContactUs())
        if (ContactUsStateData.length) {
            let item = ContactUsStateData.find((x)=>x.id===id)
            setData(item)            
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
                            <span className='text-white fs-4'>Contact Us Show</span>
                        </div>

                        <div className='table-responsive mx-3'>
                            <table className='table table-bordered'>
                                <tbody>
                                <tr>
                                    <th>Id</th>
                                    <td>{data.id}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{data.email}</td>
                                </tr>
                                <tr>
                                    <th>Subject</th>
                                    <td>{data.subject}</td>
                                </tr>
                                <tr>
                                    <th>Message</th>
                                    <td>{data.message}</td>
                                </tr>
                                <tr>
                                    <th>Active</th>
                                    <td>{data.active?"Yes":"No"}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{new Date(data.date).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        {data.active?
                                        <button className='btn bg-dark text-white w-100' onClick={updateRecord}>Update Status To Done</button>:
                                        <button className='btn bg-danger text-white w-100' onClick={deleteItem}>Delete</button>
                                        }
                                        </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                </MainContent>
            </div>
        </>
    )
}
