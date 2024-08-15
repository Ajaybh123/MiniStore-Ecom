import React from 'react'
import Sidebar from './AdminHome/Sidebar'
import MainContent from './AdminHome/MainContent'
import Navbar from './AdminHome/Navbar'
import Content from './AdminHome/Content'
import AdminMaincategory from './AdminMaincategory/AdminMaincategory'

export default function AdminHome() {
  return (
    <>
      <div className="app d-flex">
        <Sidebar />
        <MainContent>
          <Navbar />
          <Content/>
        </MainContent>
      </div>
    </>
  )
}

