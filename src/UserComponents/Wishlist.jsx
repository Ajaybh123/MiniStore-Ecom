import React, { useEffect, useState } from 'react'
import { getWishlist, deleteWishlist } from '../Redux/ActionCreator/WishlistActionCreator'
import { getCheckout } from '../Redux/ActionCreator/CheckoutActionCreator'
import { useDispatch, useSelector } from 'react-redux' 
import { Link } from 'react-router-dom'
import Breadcrum from './Partial/Breadcrum'
import BuyerProfile from './Partial/BuyerProfile'
import UserSidebar from './Partial/UserSidebar'

export default function Wishlist() {
    let [wishlist, setWishlist] = useState([])
    let [order, setOrder] = useState([])
    // let navigate = useNavigate()
    let dispatch = useDispatch()

    let WishlistStateData = useSelector(state => state.WishlistStateData)
    let CheckoutStateData = useSelector(state => state.CheckoutStateData)

    function deleteItem(id) {
        if (window.confirm("Are You really want to remove that item from cart")) {
            dispatch(deleteWishlist({ id: id }))
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getWishlist())
            if (WishlistStateData.length) {
                let data = WishlistStateData.filter((x) => x.user === sessionStorage.getItem("userid"))
                setWishlist(data);
            }
            else
                setWishlist([])
        })()

    }, [WishlistStateData.length])

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
    <Breadcrum title="Wishlist Page"/>
       <div className="container mt-4">
        <div className="row">
            <div className="col-md-3">
                <UserSidebar/>
            </div>
            <div className="col-md-9">
            <div className="testimonial-item ms-2 img-border-radius shadow-sm bg-white mb-3">
                    <h4 className='px-4 pt-4'>My Wishlish</h4>
                    <hr />
                    {   wishlist.length?
                        wishlist.map((item, index) => {
                            return <> <div key={index} className="row px-4">
                                <div className="col-md-4">
                                    <img src={item.pic} height={200} width="80%" alt="" />
                                </div>
                                <div className='col-md-8'>
                                    <div className='d-flex justify-content-between'>
                                        <div><h6>{item.name}</h6>
                                            <p><strong>Brand</strong>: {item.brand}</p>
                                            <p><strong>Color</strong>: {item.color}</p>
                                            <p><strong>Size</strong>: {item.size}</p>
                                            <p><strong>Price</strong>: &#8377;{item.price}</p>
                                        </div>
                                        <div>
                                            <Link to={`/product/${item.product}`} className='btn text-dark'><i className='fa fa-shopping-bag'></i></Link>
                                            <button className='btn text-danger' onClick={() => deleteItem(item.id)}><i className='fa fa-trash'></i></button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                                <hr></hr>
                            </>
                        }):
                        <div className='text-center pb-3'>
                            <h6>No Item In Wishlist</h6>
                        </div>
                    }
                </div>
            </div>
        </div>
                
            </div>

    </>
  )
}
