import React, { useEffect, useState } from 'react'
import Adminmenu from '../components/adminmenu';
import axios from 'axios';
import antd, { Select } from 'antd';

const { Option } = Select;



const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("");





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

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("category", category)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("shipping", shipping)
            const { data } = axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData)
            if (data?.success) {
                alert("product not created")
            }
            else {
                alert("product created successfully")
            }

        } catch (error) {
            console.log(error)
            alert('something went wrong')

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
                        manage  products
                    </h1>
                    <form onSubmit={handleCreate} className='m-2 w-75'>
                        <Select
                            variant={false}
                            placeholder="enter a category"
                            size='large'
                            showSearch
                            className='form-select mb-3'
                            onChange={(value) => setCategory(value)}
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
                            {photo && (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} alt="product"
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
                            className='form-select mb-3' onChange={(value) => setShipping(value)}>
                            <Option value='0'>no</Option>
                            <Option value='1'>yes</Option>
                        </Select>
                        <button className='btn btn-primary'> Create Product</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateProduct;