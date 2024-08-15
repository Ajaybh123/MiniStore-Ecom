import React, { useState } from 'react'
import Sidebar from '../AdminHome/Sidebar'
import MainContent from '../AdminHome/MainContent'
import Navbar from '../AdminHome/Navbar'
import FormValidator from '../../UserComponents/FormValidators/FormValidator';
import { Link } from 'react-router-dom';

export default function AdminMaincategory() {

    return (
        <>
            <div className='app d-flex'>
                <Sidebar />
                <MainContent>
                <Navbar />
                 <div className="container-fluid my-3">
                    <div className="d-flex bg-info text-center p-2  justify-content-between rounded">
                        <h4>Maincategory</h4>
                        <Link to="/admin/maincategory/create" className='btn btn-dark'><i className='fa fa-plus'></i> Add</Link>
                    </div>
                 </div>

                </MainContent>
            </div>
        </>
    )
}
