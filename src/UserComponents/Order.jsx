import React, { useEffect, useState } from 'react'
import { getCheckout } from '../Redux/ActionCreator/CheckoutActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Breadcrum from './Partial/Breadcrum'
import UserSidebar from './Partial/UserSidebar'

export default function Order() {
    let [order, setOrder] = useState([])
    let dispatch = useDispatch()

    let CheckoutStateData = useSelector(state => state.CheckoutStateData)





    useEffect(() => {
        (() => {
            dispatch(getCheckout())
            if (CheckoutStateData.length) {
                let data = CheckoutStateData.filter((x) => x.user === sessionStorage.getItem("userid"))
                setOrder(data);
            }
            else
                setOrder([])
        })()

    }, [CheckoutStateData.length])
    return (
        <>
            <Breadcrum title="History Page" />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <UserSidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="testimonial-item ms-2 img-border-radius shadow-sm bg-white mb-3">
                            <h5 className='px-4 py-3'>My Order History</h5>
                            
                        </div>

                        <div>
                            {order.map((item, index) => (
                                <div key={index}>
                                    <div className="testimonial-item ms-2 img-border-radius shadow-sm bg-white mb-2 p-2">
                                        <div className='float-end me-4'>
                                            <p className='text-success extra'>{item.orderStatus}</p>
                                            <p >{new Date(item.date).toLocaleString()}</p>
                                            <Link className='border-bottom' to={`/order_detail/${item.id}`}>Track Order</Link>

                                        </div>

                                        {item.products.map((product, idx) => (
                                            <div key={idx} className="row px-4">
                                                <div className="col-md-2 mb-1">
                                                    <img src={product.pic} height={100} width="100%" alt="" />
                                                </div>
                                                <div className='col-md-10'>
                                                    <div className='d-flex justify-content-between'>
                                                        <div>
                                                            <h6>{product.name}</h6>
                                                            <span><strong>Brand</strong>: {product.brand}</span>,
                                                            <span><strong>Color</strong>: {product.color}</span>,
                                                            <span><strong>Size</strong>: {product.size}</span>
                                                            <p>&#8377; {product.price}</p>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

