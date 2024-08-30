import React, { useEffect, useState } from 'react'
import Adminmenu from '../components/adminmenu';
import axios from 'axios';
import antd, { Select } from 'antd';
import { Navigate, useParams } from 'react-router-dom';

const { Option } = Select;
const UpdateProduct = () => {
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");





    // get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
            alert('error while getting category in fron');
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])

    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-products/${params.slug}`)
            setName(data.product.name)
            setQuantity(data.product.quantity)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setShipping(data.product.shipping)
            setId(data.product._id)
            setCategory(data.product.category._id)
            setPhoto(data.product.photo)
        } catch (error) {
            console.log(error)
            alert("error in get single product")
        }
    }

    useEffect(() => {
        getSingleProduct();
        // eslint-disable-next-line 
    }, [])

    //update products
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("category", category)
            productData.append("price", price)
            productData.append("quantity", quantity)
            photo && productData.append("photo", photo)
            productData.append("shipping", shipping)
            const { data } = axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-products/${id}`, productData)
            if (data?.success) {

                alert(data.error);
            }
            else {
                alert("data updated successfully");

            }

        } catch (error) {
            console.log(error)
            alert('something went wrong')

        }

    }

    //delete product
    const deleteProduct = () => {
        try {
            const answer = window.prompt("want to delete ? Type Yes")
            if (!answer) return;
            const { data } = axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-products/${id}`)
            alert("product deleted successsfully");
            Navigate("/Dashboard/admin/Product")
        } catch (error) {
            console.log(error)
            alert("error in delete product")

        }
    }
    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <Adminmenu />

                </div>
                <div className="col-md-9">
                    <h1>
                        Update products
                    </h1>
                    <form onSubmit={handleUpdate} className='m-2 w-75'>
                        <Select
                            variant={false}
                            placeholder="enter a category"
                            size='large'
                            showSearch
                            className='form-select mb-3'
                            onChange={(value) => setCategory(value)}
                            value={category}
                        >
                            {categories?.map((c) => (
                                <Option key={c._id} value={c._id}>{c.name}</Option>
                            ))}
                        </Select>
                        <label className='btn btn-primary col-md-12 mb-3'>
                            {photo ? photo.name : 'upload photo'}
                            <input
                                type="file"
                                name='photo'
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                hidden />
                        </label>
                        <div className="mb-3">
                            {photo ? (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} alt="product"
                                        height={'200px'} className='img img-responsive' />
                                </div>
                            ) : (
                                <div className="text-center">
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/photo-products/${id}`} alt="product"
                                        height={'200px'} className='img img-responsive' />
                                </div>
                            )}
                        </div>
                        <input
                            type="text"
                            placeholder='enter the product name'
                            value={name}
                            className='form-control mb-3'
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="textarea"
                            placeholder='enter the product description'
                            value={description}
                            className='form-control mb-3'
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder='enter the product price'
                            value={price}
                            className='form-control mb-3'
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder='enter the product quantity'
                            value={quantity}
                            className='form-control mb-3'
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <Select variant={false}
                            placeholder="select a shipping "
                            showSearch
                            size='large'
                            className='form-select mb-3' onChange={(value) => setShipping(value)}
                            value={shipping ? 'yes' : 'no'}
                        >
                            <Option value='0'>no</Option>
                            <Option value='1'>yes</Option>
                        </Select>
                        <button className='btn btn-primary'> Update Product</button>
                    </form>
                    <button className='btn btn-danger' onClick={deleteProduct}> Delete Product</button>
                </div>
            </div>
        </>
    )
}
export default UpdateProduct;