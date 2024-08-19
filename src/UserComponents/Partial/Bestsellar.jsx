import React from 'react'

export default function Bestsellar({title,data}) {
  return (
    <>
      {/* <!-- Bestsaler Product Start --> */}
        <div className="container-fluid">
            <div className="container">
                <div className="text-center mx-auto mb-5" style={{maxWidth:" 700px"}}>
                    <h1 className="display-4">{title}</h1>
                    <p>Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</p>
                </div>
                <div className="row g-4">
                    {
                        data.map((item,index)=>{
                            return  <div key={index} className="col-lg-6 col-xl-4">
                            <div className="p-4 rounded bg-light">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <img src={item.pic[1]} style={{height:180}} className="img-fluid rounded-circle w-100" alt=""/>
                                    </div>
                                    <div className="col-6">
                                        <a href="#" className="h5">{item.name}</a>
                                        <div className="d-flex my-3">
                                            <i className="fas fa-star text-info"></i>
                                            <i className="fas fa-star text-info"></i>
                                            <i className="fas fa-star text-info"></i>
                                            <i className="fas fa-star text-info"></i>
                                            <i className="fas fa-star"></i>
                                        </div>
                                        <div className='d-flex gap-2'>
                                        <p>&#8377;<del className='text-danger'>{item.basePrice}</del></p>
                                        <p>&#8377;{item.finalPrice} <sup>{item.discount}% off</sup></p>
                                        </div>
                                        <a href="#" className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        })
                    }
                    
                    
                </div>
            </div>
        </div>
        {/* <!-- Bestsaler Product End --> */}
    </>
  )
}
