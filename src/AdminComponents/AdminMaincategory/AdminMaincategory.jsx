import React, { useEffect, useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import FormValidator from '../../UserComponents/FormValidators/FormValidator';
import { Link } from 'react-router-dom';

export default function AdminMaincategory() {
    let [data, setData] = useState([])


    async function deleteItem(id){
        if(window.confirm("Are you really want to delete that item?")){
            let response = await fetch('http://localhost:8000/maincategory/'+id,{
                method:"DELETE",
                headers:{
                    "content-type":"application/json"
                }
            })
            response = await response.json()
            getAPIData()
        }
    }

    async function getAPIData(){
        let response = await fetch('http://localhost:8000/maincategory', {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        if (response) {
            setData(response)
        }
    }

    useEffect(() => {
        getAPIData()
    },[])

    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                    <Navbar />
                    <div className="container-fluid my-3">
                        <div className="d-flex bg-info text-center p-2  justify-content-between rounded mb-3">
                            <h4>Maincategory</h4>
                            <Link to="/admin/maincategory/create" className='btn btn-dark'><i className='fa fa-plus'></i> Add</Link>
                        </div>

                        <div className='table-responsive text-center'>
                            <table className='table table-bordered'>
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
                                                <td className={`${item.active?"text-success":"text-danger"}`}>{item.active?"Yes":"No"}</td>
                                                <td><Link to={`/admin/maincategory/update/${item.id}`} className='btn'><i className='fa fa-edit text-success'></i></Link></td>
                                                <td><button className='btn' onClick={()=>deleteItem(item.id)}><i className='fa fa-trash text-danger'></i></button></td>
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
