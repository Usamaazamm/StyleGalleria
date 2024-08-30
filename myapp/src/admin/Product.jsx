import React, { useEffect, useState } from 'react'
import Adminmenu from '../components/adminmenu';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Product = () => {
    const [product, setProduct] = useState();

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`)
            setProduct(data.product)
        } catch (error) {
            console.log(error)
            alert("error in getting p")
        }
    }

    useEffect(() => {
        getProducts();
    }, []);
    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <Adminmenu />

                </div>
                <div className="col-md-9">
                    <h1>
                        All Products
                    </h1>

                    <div className="d-flex flex-wrap">
                        {product?.map((p) => (
                            <Link to={`/Dashboard/admin/Product/${p.slug}`} key={p._id} className='product '>

                                <div className="card m-3" style={{ width: '13rem' }}>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/photo-products/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text"> {p.description}</p>
                                    </div>
                                </div>

                            </Link>
                        ))}
                    </div>


                </div>

            </div>
        </>
    )
}

export default Product;