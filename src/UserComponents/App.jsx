import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from '../UserComponents/Home'
import Navbar from './Partial/Navbar'
import Footer from './Partial/Footer'
import About from './About'
import Shop from '../UserComponents/Shop'
import Contact from '../UserComponents/Contact'
import Error404 from '../UserComponents/Error404'
import ShopDetail from '../UserComponents/ShopDetail'

import AdminHome from '../AdminComponents/AdminHome'

import AdminMaincategory from '../AdminComponents/AdminMaincategory/AdminMaincategory'
import AdminCreateMaincategory from '../AdminComponents/AdminMaincategory/AdminCreateMaincategory'
import AdminUpdateMaincategory from '../AdminComponents/AdminMaincategory/AdminUpdateMaincategory'

import AdminSubcategory from '../AdminComponents/AdminSubcategory/AdminSubcategory'
import AdminCreateSubcategory from '../AdminComponents/AdminSubcategory/AdminCreateSubcategory'
import AdminUpdateSubcategory from '../AdminComponents/AdminSubcategory/AdminUpdateSubcategory'

import AdminBrand from '../AdminComponents/AdminBrand/AdminBrand'
import AdminCreateBrand from '../AdminComponents/AdminBrand/AdminCreateBrand'
import AdminUpdateBrand from '../AdminComponents/AdminBrand/AdminUpdateBrand'

import AdminTestimonial from '../AdminComponents/AdminTestimonial/AdminTestimonial'
import AdminCreateTestimonial from '../AdminComponents/AdminTestimonial/AdminCreateTestimonial'
import AdminUpdateTestimonial from '../AdminComponents/AdminTestimonial/AdminUpdateTestimonial'

import AdminProduct from '../AdminComponents/AdminProduct/AdminProduct'
import AdminCreateProduct from '../AdminComponents/AdminProduct/AdminCreateProduct'
import AdminUpdateProduct from '../AdminComponents/AdminProduct/AdminUpdateProduct'

export default function App() {
    const Layout = ({ children }) => {
        const location = useLocation();
        const isAdminPath = location.pathname.startsWith('/admin');
        
        return (
            <div>
                {!isAdminPath && <Navbar />}
                {children}
                {!isAdminPath && <Footer />}
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Layout>
                <Routes>

                    {/* public route */}
                    <Route path='/' element={<Home/>} />
                    <Route path='/about' element={<About />} />
                    <Route path='/shop' element={<Shop />} />
                    <Route path='/shop-detail' element={<ShopDetail />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='*' element={<Error404 />} />


                    {/* admin route */}
                    <Route path='/admin' element={<AdminHome />} />

                    <Route path='/admin/maincategory' element={<AdminMaincategory />} />
                    <Route path='/admin/maincategory/create' element={<AdminCreateMaincategory />} />
                    <Route path='/admin/maincategory/update/:id' element={<AdminUpdateMaincategory />} />

                    <Route path='/admin/subcategory' element={<AdminSubcategory />} />
                    <Route path='/admin/subcategory/create' element={<AdminCreateSubcategory />} />
                    <Route path='/admin/subcategory/update/:id' element={<AdminUpdateSubcategory />} />

                    <Route path='/admin/brand' element={<AdminBrand />} />
                    <Route path='/admin/brand/create' element={<AdminCreateBrand />} />
                    <Route path='/admin/brand/update/:id' element={<AdminUpdateBrand />} />

                    <Route path='/admin/testimonial' element={<AdminTestimonial />} />
                    <Route path='/admin/testimonial/create' element={<AdminCreateTestimonial />} />
                    <Route path='/admin/testimonial/update/:id' element={<AdminUpdateTestimonial />} />

                    <Route path='/admin/product' element={<AdminProduct />} />
                    <Route path='/admin/product/create' element={<AdminCreateProduct />} />
                    <Route path='/admin/product/update/:id' element={<AdminUpdateProduct />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}


