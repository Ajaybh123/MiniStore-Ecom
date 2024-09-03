import React from 'react'
import Breadcrum from './Partial/Breadcrum'
import BuyerProfile from './Partial/BuyerProfile'
import Cart from './Cart'
import CartSection from './Partial/CartSection'

export default function Checkout() {
  return (
    <>
    <Breadcrum title="Checkout Page"/>
    <BuyerProfile title="Profile Page"/>
    <CartSection title="Checkout"/>
    </>
  )
}
