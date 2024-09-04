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
import Product from './Product'
import SignUp from './SignUp'
import Login from './Login'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'
import Cart from './Cart'
import Checkout from './Checkout'
import Confirmation from './Confirmation'
import Wishlist from './Wishlist'
import Order from './Order'
import OrderDetail from './OrderDetail'

export default function App() {
    const Layout = ({ children }) => {
        const location = useLocation();
        const isAdminPath = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login') || location.pathname.startsWith('/signup') || location.pathname.startsWith('/update-profile')
        
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
                    <Route path='/product/:id' element={<Product />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='*' element={<Error404 />} />

                    {/* user route */}
                    <Route path='/Profile' element={<Profile />} />
                    <Route path='/update-profile' element={<UpdateProfile />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/wishlist' element={<Wishlist />} />
                    <Route path='/order' element={<Order />} />
                    <Route path='/order_detail/:id' element={<OrderDetail />} />
                    <Route path='/confirmation' element={<Confirmation />} />

                    {/* authentication route */}
                    <Route path='/signup' element={<SignUp/>} />
                    <Route path='/login' element={<Login/>} />

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


