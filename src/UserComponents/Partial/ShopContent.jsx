import React, { useEffect, useState } from 'react'

import { getProduct } from '../../Redux/ActionCreator/ProductActionCreator'
import { getMaincategory } from '../../Redux/ActionCreator/MaincategoryActionCreator'
import { getSubcategory } from '../../Redux/ActionCreator/SubcategoryActionCreator'
import { getBrand } from '../../Redux/ActionCreator/BrandActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
export default function ShopContent() {
    let [products, setProducts] = useState([])
    let [maincategory, setMaincategory] = useState([])
    let [subcategory, setSubcategory] = useState([])
    let [brand, setBrand] = useState([])
    let [mc, setMc] = useState("All")
    let [sc, setSc] = useState("All")
    let [br, setBr] = useState("All")
    let [flag, setFlag] = useState(false)
    let [min, setMin] = useState(0)
    let [max, setMax] = useState(0)
    let [search, setSearch] = useState()


    let location = useLocation()

    let dispatch = useDispatch()
    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)

    function filterData(mc, sc, br, min = -1, max = -1) {
        let data = []
        if (mc === "All" && sc === "All" && br === "All")
            data = ProductStateData
        else if (mc !== "All" && sc === "All" && br === "All")
            data = ProductStateData.filter(x => x.maincategory === mc)
        else if (mc === "All" && sc !== "All" && br === "All")
            data = ProductStateData.filter(x => x.subcategory === sc)
        else if (mc === "All" && sc === "All" && br !== "All")
            data = ProductStateData.filter(x => x.brand === br)
        else if (mc !== "All" && sc !== "All" && br === "All")
            data = ProductStateData.filter(x => x.maincategory === mc && x.subcategory === sc)
        else if (mc !== "All" && sc === "All" && br !== "All")
            data = ProductStateData.filter(x => x.maincategory === mc && x.brand === br)
        else if (mc === "All" && sc !== "All" && br !== "All")
            data = ProductStateData.filter(x => x.subcategory === sc && x.brand === br)
        else
            data = ProductStateData.filter(x => x.subcategory === sc && x.brand === br && x.maincategory === mc)

        if (min !== -1 && max !== -1)
            data = data.filter((x) => x.finalPrice >= min && x.finalPrice <= max)
        setProducts(data)
    }

    function sortFilter(option) {
        if (option === "1")
            setProducts(products.sort((x, y) => y.id.localeCompare(x.id)))
        else if (option === "2")
            setProducts(products.sort((x, y) => y.finalPrice - x.finalPrice))
        else
            setProducts(products.sort((x, y) => x.finalPrice - y.finalPrice))
        setFlag(!flag)
    }

    function priceFilter(e) {
        e.preventDefault()
        filterData(mc, sc, br, min, max)
    }

    function postSearch(e) {
        e.preventDefault()
        let ch = search.toLowerCase()
        setProducts(ProductStateData.filter((x) => x.name.toLowerCase().includes(ch) || x.maincategory.toLowerCase() === ch || x.subcategory.toLowerCase() === ch || x.brand.toLowerCase() === ch || x.color.toLowerCase() === ch || x.descripton?.toLowerCase().includes(ch)))
    }

    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
            if (MaincategoryStateData.length)
                setMaincategory(MaincategoryStateData)
        })()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
            if (SubcategoryStateData.length)
                setSubcategory(SubcategoryStateData)
        })()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
            if (BrandStateData.length)
                setBrand(BrandStateData)
        })()
    }, [BrandStateData.length])

    useEffect(() => {
        let query = new URLSearchParams(location.search)
        setMc(query.get("mc") ?? "All")
        setSc(query.get("sc") ?? "All")
        setBr(query.get("br") ?? "All")
        filterData(query.get("mc") ?? "All", query.get("sc") ?? "All", query.get("br") ?? "All")
    }, [location, ProductStateData.length])
    return (
        <>
            {/* <!-- Fruits Shop Start--> */}
            <div className="container-fluid fruite py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-xl-3">
                                    <h1 className="mb-4">Product shop</h1>
                                </div>
                                <div className="col-xl-3">
                                    <form onSubmit={postSearch}>
                                        <div className="input-group w-100 mx-auto d-flex">
                                            <input type="search" name='search' onChange={(e) => setSearch(e.target.value)} className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                            <button type='submit' id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-xl-3">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                        <label for="fruits">Default Sorting:</label>
                                        <select id="fruits" name="sort" onChange={(e) => sortFilter(e.target.value)} className="border-0 form-select-sm bg-light me-3" form="fruitform">
                                            <option value="1">Latest</option>
                                            <option value="2">High to Low</option>
                                            <option value="3">Low to High</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-xl-3">
                                    <div class="dropdown">
                                        <button class="bg-light text-dark ps-3 py-3 border-0  rounded mb-4 w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Category and Product Filter
                                        </button>
                                        <ul class="dropdown-menu w-100 category_dropdown">
                                            <h4 className='ms-3'>Maincategories</h4>
                                            <li>
                                                <div className="d-flex justify-content-between fruite-name">
                                                    <Link to={`/shop?mc=All&sc=${sc}&br=${br}`} className='text-info dropdown-item'>All</Link>
                                                </div>
                                            </li>
                                            {
                                                maincategory.map((item, index) => {
                                                    return <li key={index}>
                                                        <div className="d-flex justify-content-between fruite-name">
                                                            <Link to={`/shop?mc=${item.name}&sc=${sc}&br=${br}`} className='text-info dropdown-item' >{item.name}</Link>
                                                        </div>
                                                    </li>
                                                })
                                            }
                                            <hr />

                                            <h4 className='ms-3'>Subcategories</h4>
                                            <li>
                                                <div className="d-flex justify-content-between fruite-name">
                                                    <Link to={`/shop?mc=${mc}&sc=All&br=${br}`} className='text-info dropdown-item'>All</Link>
                                                </div>
                                            </li>
                                            {
                                                subcategory.map((item, index) => {
                                                    return <li key={index}>
                                                        <div className="d-flex justify-content-between fruite-name">
                                                            <Link to={`/shop?mc=${mc}&sc=${item.name}&br=${br}`} className='text-info dropdown-item' >{item.name}</Link>
                                                        </div>
                                                    </li>
                                                })
                                            }
                                            <hr />

                                            <h4 className='ms-3'>Brand</h4>
                                            <li>
                                                <div className="d-flex justify-content-between fruite-name">
                                                    <Link to={`/shop?mc=${mc}&sc=${sc}&br=All`} className='text-info dropdown-item'>All</Link>
                                                </div>
                                            </li>
                                            {
                                                brand.map((item, index) => {
                                                    return <li key={index}>
                                                        <div className="d-flex justify-content-between fruite-name">
                                                            <Link to={`/shop?mc=${mc}&sc=${sc}&br=${item.name}`} className='text-info dropdown-item' >{item.name}</Link>
                                                        </div>
                                                    </li>
                                                })
                                            }
                                            <hr />

                                            <div className='mx-2'>
                                                <p className='bg-info text-center p-2 text-dark'>Price Filter</p>
                                                <form onSubmit={priceFilter}>
                                                    <div className='d-flex gap-4 mb-3'>
                                                        <input type="number" name="min" onChange={(e) => setMin(e.target.value)} className='form-control w-50' placeholder='Min Amount' />
                                                        <input type="number" name="max" onChange={(e) => setMax(e.target.value)} className='form-control w-50' placeholder='Max Amount' />
                                                    </div>
                                                    <button type='submit' className='btn btn-info w-100'>Filter</button>
                                                </form>
                                            </div>
                                        </ul>
                                    </div>
                                </div>


                            </div>
                            <div className="row g-4">

                                <div className="col-lg-12">
                                    <div className="row g-4 justify-content-center">
                                        {
                                            products.map((item, index) => {
                                                return <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                                                    <div className="rounded position-relative fruite-item">
                                                        <div className="fruite-img">
                                                            <img src={item.pic[0]} style={{ height: 250 }} className="img-fluid w-100 rounded-top" alt="" />
                                                        </div>
                                                        <div className="text-white bg-dark px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>{item.brand}</div>
                                                        <div className="p-4 border border-dark border-top-0 rounded-bottom">
                                                            <Link to={`/product/${item.id}`}><h4 style={{ height: 50 }}>{item.name}</h4></Link>
                                                            <div className="d-flex justify-content-between flex-lg-wrap">
                                                                <p>&#8377;<del className='text-danger'>{item.basePrice}</del></p>
                                                                <p className={`${item.stock ? "text-success" : "text-danger"}`}>{item.stock ? `(In Stock / only ${item.quantity} Left)` : "(Out of Stock)"}</p>
                                                            </div>
                                                            <div className="d-flex justify-content-between flex-lg-wrap">
                                                                <p>&#8377;{item.finalPrice} <sup>{item.discount}% off</sup></p>
                                                                <Link to={`/product/${item.id}`} className="btn border border-info rounded-pill px-3 text-info"><i className="fa fa-shopping-bag me-2 text-info"></i> Add to cart</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }


                                        <div className="col-12">
                                            <div className="pagination d-flex justify-content-center mt-5">
                                                <a href="#" className="rounded">&laquo;</a>
                                                <a href="#" className="active rounded">1</a>
                                                <a href="#" className="rounded">2</a>
                                                <a href="#" className="rounded">3</a>
                                                <a href="#" className="rounded">4</a>
                                                <a href="#" className="rounded">5</a>
                                                <a href="#" className="rounded">6</a>
                                                <a href="#" className="rounded">&raquo;</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Fruits Shop End--> */}
        </>
    )
}


{/* style={{width: "100px", height: "100px"}} */ }
{/* style={{top: "10px", left: "10px"}} */ }



















{/* <div className="col-lg-3">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Maincategories</h4>
                                                <ul className="list-unstyled fruite-categorie">
                                                    <li>
                                                        <div className="d-flex justify-content-between fruite-name">
                                                            <a className='text-info' href="#">All</a>
                                                        </div>
                                                    </li>
                                                    {
                                                        maincategory.map((item, index) => {
                                                            return <li key={index}>
                                                                <div className="d-flex justify-content-between fruite-name">
                                                                    <a className='text-info' href="#">{item.name}</a>
                                                                </div>
                                                            </li>
                                                        })
                                                    }

                                                </ul>
                                            </div>
                                            <div className="mb-3">
                                                <h4>Subcategories</h4>
                                                <ul className="list-unstyled fruite-categorie">
                                                    <li>
                                                        <div className="d-flex justify-content-between fruite-name">
                                                            <a className='text-info' href="#">All</a>
                                                        </div>
                                                    </li>
                                                    {
                                                        subcategory.map((item, index) => {
                                                            return <li key={index}>
                                                                <div className="d-flex justify-content-between fruite-name">
                                                                    <a className='text-info' href="#">{item.name}</a>
                                                                </div>
                                                            </li>
                                                        })
                                                    }

                                                </ul>
                                            </div>
                                            <div className="mb-3">
                                                <h4>Brand</h4>
                                                <ul className="list-unstyled fruite-categorie">
                                                    <li>
                                                        <div className="d-flex justify-content-between fruite-name">
                                                            <a className='text-info' href="#">All</a>
                                                        </div>
                                                    </li>
                                                    {
                                                        brand.map((item, index) => {
                                                            return <li key={index}>
                                                                <div className="d-flex justify-content-between fruite-name">
                                                                    <a className='text-info' href="#">{item.name}</a>
                                                                </div>
                                                            </li>
                                                        })
                                                    }

                                                </ul>
                                            </div>
                                        </div>


                                        <div className="col-lg-12">
                                            <p className='bg-info text-center p-2 text-dark'>Price Filter</p>
                                            <form>
                                                <div className='d-flex gap-4 mb-3'>
                                                    <input type="number" name="min" className='form-control w-50' placeholder='Min Amount' />
                                                    <input type="number" name="max" className='form-control w-50' placeholder='Max Amount' />
                                                </div>
                                                <button type='submit' className='btn btn-info w-100'>Filter</button>
                                            </form>
                                        </div>
                                    </div>
                                </div> */}