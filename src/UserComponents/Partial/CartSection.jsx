import React, { useEffect, useState } from 'react'

import { getCart, updateCart, deleteCart } from '../../Redux/ActionCreator/CartActionCreator'
import { getProduct, updateProduct } from '../../Redux/ActionCreator/ProductActionCreator'
import { createCheckout } from '../../Redux/ActionCreator/CheckoutActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
export default function CartSection(props) {
    let [cart, setCart] = useState([])
    let [subtotal, setSubTotal] = useState(0)
    let [cartitem, setCartItem] = useState(0)
    let [delivery, setDilivery] = useState(0)
    let [total, setTotal] = useState(0)
    let [mode, setMode] = useState("Case on Delivery")
    let [flag, setFlag] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let CartStateData = useSelector(state => state.CartStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)

    function placeOrder() {
        let item = {
            user: sessionStorage.getItem("userid"),
            orderStatus: "Order is Placed",
            paymentStatus: mode,
            paymentStatus: "Pending",
            subtotal: subtotal,
            delivery: delivery,
            total: total,
            data: new Date(),
            products: cart
        }
        dispatch(createCheckout(item))
        for (let item of cart) {
            let product = ProductStateData.find((x) => x.id === item.product)
            product.quantity = product.quantity - item.qty
            product.stock = product.quantity === 0 ? false : true
            dispatch(updateProduct({...product}))
            dispatch(deleteCart({ id: item.id }))
        }
        navigate("/confirmation")
    }

    function calculate(data) {
        let sum = 0
        for (let item of data) {
            sum = sum + item.total
        }
        setSubTotal(sum)
        setDilivery(sum > 0 && sum < 1000 ? 40 : 0)
        setTotal(sum > 0 && sum < 1000 ? sum + 40 : sum)
    }

    function updateItem(id, option) {
        let item = cart.find((x) => x.id === id)
        if (item) {
            if (option === "Dec" && item.qty === 1)
                return
            else if (option === "Dec") {
                item.qty = item.qty - 1;
                item.total = item.total - item.price
            }
            else {
                if (item.qty < item.quantity) {
                    item.qty = item.qty + 1;
                    item.total = item.total + item.price
                }
            }
            dispatch(updateCart({ ...item }))
            setFlag(!flag)
            calculate(cart)
        }
    }

    function deleteItem(id) {
        if (window.confirm("Are You really want to remove that item from cart")) {
            dispatch(deleteCart({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getCart())
        if (CartStateData.length) {
            let data = CartStateData.filter((x) => x.user === sessionStorage.getItem("userid"))
            setCart(data);
            calculate(data)
            setCartItem(CartStateData.length)

        }
        else
            setCart([])
    }

    useEffect(() => {
        getAPIData()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-8">
                        <div className="testimonial-item ms-2 img-border-radius shadow-sm bg-light p-4 mb-3">
                            {
                                cart.length ?
                                    cart.map((item, index) => {
                                        return <> <div key={index} className="row">
                                            <div className="col-md-4">
                                                <img src={item.pic} height={200} width="80%" alt="" />
                                                {props.title === "Cart" ?
                                                    <div className="d-flex gap-2 align-items-center m-3 quantity mb-2" >
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => updateItem(item.id, "Dec")}>
                                                                <i className="fa fa-minus"></i>
                                                            </button>
                                                        </div>
                                                        <input type="text" className="form-control form-control-sm text-center border-1" value={item.qty} style={{ width: "50px" }} />
                                                        <div className="input-group-btn ">
                                                            <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => updateItem(item.id, "Inc")}>
                                                                <i className="fa fa-plus"></i>
                                                            </button>
                                                        </div>
                                                    </div> : ""
                                                }
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='d-flex justify-content-between'>
                                                    <div><h6>{item.name}</h6>
                                                        <p><strong>Brand</strong>: {item.brand}</p>
                                                        <p><strong>Color</strong>: {item.color}</p>
                                                        <p><strong>Price</strong>: &#8377; {item.price}</p>
                                                        <p><strong>Size</strong>: {item.size}</p>
                                                        {props.title === "Cart" ? "" : <span><strong>Quantity</strong>: {item.qty}</span>}
                                                        {props.title === "Cart" ? <p className='btn text-danger p-0' onClick={() => deleteItem(item.id)}><i className='fa fa-trash'></i> Remove</p> : ""}

                                                    </div>
                                                    <div>
                                                        <span><strong>Total Price</strong><p><strong>&#8377;</strong> {item.total}</p></span>
                                                        <p className='text-success'>(only {item.quantity} left)</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                            <hr></hr>
                                        </>
                                    }) :
                                    <div className='text-center'>
                                        <img src="./img/shopcart.png" height={300} alt="" />
                                        <h5>Your Cart is Empty</h5>
                                        <Link to="/shop" className='btn btn-info '>Shop Now</Link>
                                    </div>
                            }

                        </div>
                    </div>
                    {
                        cart.length ?
                            <div className="col-md-4">
                                <div className="testimonial-item ms-2 img-border-radius shadow-sm bg-light pb-2">
                                    <h4 className='px-4 pt-4'>Price Details</h4>
                                    <hr />
                                    <div className='px-4'>
                                        <p>Subtotal <span className='float-end'>&#8377;{subtotal}</span></p>
                                        <p>Items <span className='float-end'>{cartitem}</span></p>
                                        <p>Delivery Charge <span className='float-end'>&#8377;{delivery ? delivery : "Free"}</span></p>
                                        {props.title === "Checkout" ?
                                            <p>Payment Mode <span className='float-end'>
                                                <select onClick={(e) => setMode(e.target.value)} name="mode" className='form-select bg-light'>
                                                    <option value="">Case on delivery</option>
                                                    <option value="">UPI/Net Banking</option>
                                                </select>
                                            </span></p> :
                                            ""
                                        }
                                        <h5 className='py-2' style={{ border: "dotted", borderLeft: 0, borderRight: 0 }}>Total Amount <span className='float-end'>&#8377;{total}</span></h5>
                                        {props.title === "Cart" ?
                                            <Link to='/checkout' className='btn btn-info w-100 mt-1'>Process To Checkout</Link> :
                                            <Link to='/confirmation' className='btn btn-info w-100 mt-1' onClick={placeOrder}>Place Order</Link>
                                        }
                                    </div>
                                </div>
                            </div> : ""
                    }

                </div>

            </div>
        </>
    )
}
