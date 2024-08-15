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
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}


