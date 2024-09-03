import React from 'react'
import CartSection from './Partial/CartSection'
import Breadcrum from './Partial/Breadcrum'

export default function Cart() {
    return (
        <>
            <Breadcrum title="Cart Page" />
            <CartSection title="Cart" />
        </>
    )
}
