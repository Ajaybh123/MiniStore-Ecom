import React from 'react'
import Breadcrum from './Partial/Breadcrum'
import { Link } from 'react-router-dom'

export default function Error404() {
  return (
    <>
    <Breadcrum title="404!!! Page Not Found"/>

    {/* <!-- 404 Start --> */}
        <div class="container-fluid py-5">
            <div class="container py-5 text-center">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <i class="bi bi-exclamation-triangle display-1 text-dark"></i>
                        <h1 class="display-1">404</h1>
                        <h1 class="mb-4">Page Not Found</h1>
                        <p class="mb-4">We’re sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to use a search?</p>
                        <Link class="btn border-dark rounded-pill py-3 px-5" to="/">Go Back To Home</Link>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- 404 End --> */}
    </>
  )
}
