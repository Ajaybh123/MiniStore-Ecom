import React, { useEffect, useState } from 'react'
import Breadcrum from './Partial/Breadcrum'
import { Link, useNavigate } from 'react-router-dom'


import BuyerProfile from './Partial/BuyerProfile'

export default function Profile() {
    
    return (
        <>
            <Breadcrum title="Profile Page" />
            <BuyerProfile title="" />
            
        </>
    )
}
