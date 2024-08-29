import React, { useEffect, useState } from 'react'
import './Miancontent.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Content() {
  let [user, setUser] = useState({})
  let navigate = useNavigate()

  useEffect(() => {
    (async () => {
      let response = await fetch("/user", {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      let item = response.find((x) => x.id === sessionStorage.getItem("userid"))
      if (item)
        setUser(item)
      else
        navigate('/login')
    })()
  }, [])
  return (
    <>
      <div className="content ">
        <div className="container">
        <div className="testimonial-item ms-2 img-border-radius bg-light rounded p-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              {
                user?.pic ?
                  <img src={user.pic} height={350} width="100%" alt="user image" /> :
                  <img src='/img/avatar.jpg' height={350} width="100%" alt="user image" />
              }            </div>
            <div className="col-md-6">
              <h5 className='text-center p-2 bg-info'>Admin Details</h5>
              <table className='table table-bordered'>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <th>Username</th>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{user.phone}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}><Link to="/update-profile" className='btn btn-info w-100'>Update Profile</Link></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
