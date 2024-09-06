import React, { useEffect, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'

import $ from "jquery"
import "datatables.net"
import "datatables.net-dt/css/dataTables.dataTables.css"


export default function AdminNewsletter() {
    let [data, setData] = useState([])
    let count = 1;

    async function deleteItem(id) {
        if (window.confirm("Are you really want to delete that item?")) {
            let response = await fetch("/user/" + id, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            getAPIData()
        }
    }


    async function getAPIData() {
        let response = await fetch("/user", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        if (response) {
            setData(response)
            setTimeout(() => {
                $('#dataTable').DataTable()
            }, 100)
        }
        else
            setData([])
    }

    useEffect(() => {
        getAPIData()
    }, [])


    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                    <Navbar />
                    <div className="container-fluid my-3">
                        <div className="text-center p-2 bg-info rounded mx-3 my-4">
                            <span className='text-white fs-4'>Users</span>
                        </div>

                        <div className='table-responsive text-center mx-3'>
                            <table className='table table-bordered display' id='dataTable' style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>User Name</th>
                                        <th>Role</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return <tr key={index}>
                                                <td className='text-center'>{count++}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td className='text-center'>{item.phone}</td>
                                                <td>{item.username}</td>
                                                <td>{item.role}</td>
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
