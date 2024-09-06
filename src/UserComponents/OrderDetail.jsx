import React, { useEffect, useState } from 'react'
import { getCheckout } from '../Redux/ActionCreator/CheckoutActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Breadcrum from './Partial/Breadcrum'
import UserSidebar from './Partial/UserSidebar'
import BuyerProfile from './Partial/BuyerProfile'

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
                
                <div className="testimonial-item ms-2 img-border-radius shadow-sm bg-white p-2">
                    {
                        order.products?.map((item, index) => {
                            return <div key={index} className="row px-4">
                                <div className="col-md-1 mb-1">
                                    <img src={item.pic} height={100} width="100%" alt="" />
                                </div>
                                <div className='col-md-11'>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h6>{item.name}</h6>
                                            <p className='extra'>Brand: {item.brand}</p>
                                            <span>Color: {item.color}</span >, <span>Size: {item.size}</span>

                                            <p className='text-dark mt-3'>&#8377; {item.total}</p >
                                        </div>

                                    </div>

                                </div>
                            </div>
                        })
                    }
                    <hr />
                    <div className="row">

                    <div className="col-md-6 mb-3">
                        <BuyerProfile title="OrderDetail" />
                    </div>
                    <div className="col-md-6">
                        <div className="testimonial-item ms-2 img-border-radius shadow-sm bg-white p-2">
                            <span className='extra float-end'><strong>Total Amount</strong>: &#8377;{order.total}
                            <p>sponsered by Ministore</p>
                            </span>
                            <p className='extra'><strong>Payment Mode</strong>: {order.paymentMode}</p>
                            <p className='extra'><strong>Payment State</strong>: {order.paymentStatus}</p>
                            <p className='extra'><strong>Subtotal</strong>: &#8377;{order.subtotal}</p>
                            <p className='extra'><strong>Date</strong>: {new Date(order.date).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                </div>
                
            </div>

        </>
    )
}


