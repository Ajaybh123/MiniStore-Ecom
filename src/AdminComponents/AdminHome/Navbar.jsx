import React from 'react'
import './Navbar.css'

export default function Navbar() {
  return (
    <>
    <div className="header">
      <h2 className="header-title">Dashboard</h2>

      <div className="search-box">
        <input type="text" placeholder='Search...'/>
        <i className='fa fa-search'></i>
      </div>

      <div className="user-box">
        <i className='fa fa-user icons'></i>
        <i className='fa fa-sign-out-alt icons'></i>
        <button>Ajay bhardwaj</button>
      </div>
    </div>
    </>
  )
}

