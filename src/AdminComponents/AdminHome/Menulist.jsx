import React from 'react'
import { Link } from 'react-router-dom'
import './Menulist.css'

export default function Menulist() {
  return (
    <>
    <ul className='menu-list'>
        <li className='menu-list-item activate'><Link to='/admin'><i className='fa fa-home'></i>Home</Link></li>
        <li className='menu-list-item'><Link to='/admin/maincategory'><i className='fa fa-list'></i>Maincategory</Link></li>
        <li className='menu-list-item'><Link to='/admin/subcategory'><i className='fa fa-list'></i>Subcategory</Link></li>
        <li className='menu-list-item'><Link to='/admin/brand'><i className='fa fa-list'></i>Brand</Link></li>
        <li className='menu-list-item'><Link to='/admin/product'><i className='fa fa-list'></i>Product</Link></li>
        <li className='menu-list-item'><Link to='/admin/testimonial'><i className='fa fa-star'></i>Testimonial</Link></li>
        <li className='menu-list-item'><Link to='/admin/users'><i className='fa fa-users'></i>Users</Link></li>
        <li className='menu-list-item'><Link to='/admin/newsletter'><i className='fa fa-envelope'></i>Newletters</Link></li>
        <li className='menu-list-item'><Link to='/admin/contacts'><i className='fa fa-phone'></i>Contacts</Link></li>
        <li className='menu-list-item'><Link to='/admin/checkout'><i className='fa fa-shopping-bag'></i>Orders</Link></li>
    </ul>
    </>
  )
}
