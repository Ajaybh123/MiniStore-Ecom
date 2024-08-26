import React, { useEffect, useState } from 'react'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css'

import { getBrand } from '../../Redux/ActionCreator/BrandActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
export default function Brandslider() {
    let [brand, setBrand] = useState([])
    let dispatch = useDispatch()
    let BrandStateData = useSelector(state => state.BrandStateData)

    const option = {
        responsive: {
            0: {
                items: 2.5
            },
            578:{
                 items: 3.5
            },
            768: {
                items: 4.5
            },
            900:{
                items:6.5
            },
            1200:{
                items:8
            }
        },

        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 900, // Transition speed
        fluidSpeed: true, // Makes the transition smoother
    }

    useEffect(() => {
        (() => {
            dispatch(getBrand())
            if (BrandStateData.length)
                setBrand(BrandStateData)
        })()
    }, [BrandStateData.length])
    return (
        <>
            <div className="container my-5">
                <div className="text-center mb-5">
                    <h5 className="display-6 mb-5">Top Brands On MiniStore</h5>
                    <div className='border-2 border-danger'>
                    <OwlCarousel className='owl-theme' {...option}>
                        {
                            brand.map((item, index) => {
                                return <div key={index} className='me-3 border p-2 rounded'>
                                   <Link to={`/shop?br=${item.name}`}><img src={item.pic} height={100} width="4px" alt="brand-image" /></Link> 
                                    
                                </div>
                            })
                        }
                    </OwlCarousel>
                    </div>
                </div>
            </div>
        </>
    )
}
