import React, { useEffect, useState } from 'react'
import { getCheckout } from '../Redux/ActionCreator/CheckoutActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Breadcrum from './Partial/Breadcrum'
import UserSidebar from './Partial/UserSidebar'

export default function OrderDetail() {
    let [order, setOrder] = useState({})
    let dispatch = useDispatch()
    let { id } = useParams();
    let CheckoutStateData = useSelector(state => state.CheckoutStateData)

    useEffect(() => {
        (() => {
            dispatch(getCheckout())
            if (CheckoutStateData.length) {
                let data = CheckoutStateData.find((x) => x.user === sessionStorage.getItem("userid") && x.id === id)
                setOrder(data)
            }
            else
                setOrder({})
        })()

    }, [CheckoutStateData.length])
    return (
        <>
            <Breadcrum title="Order Tracking Page" />
            <div className="container mt-4">
                <h5 className='ms-2'>Order Id : #{order.id}</h5>
                <div className="testimonial-item ms-2 img-border-radius shadow-sm bg-white">
                </div>
                <div className="testimonial-item ms-2 img-border-radius shadow-sm bg-white p-2">
                    {
                        order.products?.map((item,index)=>{
                            return <div key={index} className="row px-4">
                            <div className="col-md-2 mb-1">
                                <img src={item.pic} height={100} width="100%" alt="" />
                            </div>
                            <div className='col-md-10'>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <h6>{item.name}</h6>
                                        <p className='extra'>Brand: {item.brand}</p>
                                        <span>Color: {item.color}</span >, <span>Size: {item.size}</span>
                                        
                                        <p className='text-dark mt-3'>&#8377; {item.price}</p >
                                    </div>

                                </div>

                            </div>
                        </div>
                        })
                    }
                    <hr />
                </div>
            </div>

        </>
    )
}


