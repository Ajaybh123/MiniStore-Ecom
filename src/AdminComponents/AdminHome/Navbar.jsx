import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  let navigate = useNavigate()

  function logout() {
    sessionStorage.removeItem("login")
    sessionStorage.removeItem("name")
    sessionStorage.removeItem("userid")
    navigate('/login')
  }
  return (
    <>
      <div className="header">
        <h2 className="header-title">Dashboard</h2>

        <div className="search-box">
          <input type="text" placeholder='Search...' />
          <i className='fa fa-search'></i>
        </div>

        <div className="user-box">
          <i className='fa fa-user icons'></i> 
          <div className="icon-link d-flex me-0">

            {
              sessionStorage.getItem("login") ?
                <div className="nav-item dropdown">
                  <Link to="#" className="nav-link dropdown-toggle text-dark" data-bs-toggle="dropdown">{sessionStorage.getItem("name")}</Link>
                  <div className="dropdown-menu m-0 bg-info rounded-0">
                    {
                      sessionStorage.getItem("role") === "Buyer" ?
                        <>
                          <Link to="/profile" className="dropdown-item">Profile</Link>
                          <Link to="/cart" className="dropdown-item">Cart</Link>
                          <Link to="/chackout" className="dropdown-item">Chackout</Link>
                        </> :
                        <Link to="/profile" className="dropdown-item">Profile</Link>
                    }
                    <button onClick={logout} className="dropdown-item">Logout</button>
                  </div>

                </div>
                :
                <div className='nav-item'>
                  <Link to="/login" className="nav-link text-dark btn border-1 border-info">Login</Link>
                </div>
            }

          </div>
        </div>
      </div>
    </>
  )
}

