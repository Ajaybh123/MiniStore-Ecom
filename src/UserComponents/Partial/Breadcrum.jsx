import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrum(props) {
  return (
    <>
      {/* <!-- Single Page Header start --> */}
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">{props.title}</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link className='text-info' to="/">Home</Link></li>
                <li className="breadcrumb-item active text-white">{props.title}</li>
            </ol>
        </div>
        {/* <!-- Single Page Header End --> */}
    </>
  )
}
