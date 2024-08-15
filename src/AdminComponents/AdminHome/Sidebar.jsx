import React, { useState } from 'react'
import Menulist from './Menulist'
import './Sidebar.css'

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState();
    const toggle = () => setIsOpen(!isOpen)
    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-toggle"><i className={`fa ${isOpen ? 'fa-times' : 'fa-bars'}`} onClick={toggle}></i></div>
                <div className={isOpen ? "sidebar open" : "sidebar"}>
                    <div className="sidebar--logo"><span className='text-info'>Mini</span>Store</div>
                    <Menulist />
                </div>
            </div>
        </>
    )
}
