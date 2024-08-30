import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { prices } from '../components/prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';



const Home = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  // get all products
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`)
      setProduct(data.product)
    } catch (error) {
      console.log(error)
      // alert("error in getting p")
    }
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  // get all categories

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error)
      // alert('error while getting category in fron');
    }
  }
  useEffect(() => {
    getAllCategory();
  }, [])

  const filterhandler = (value, id) => {
    let all = [...checked]
    if (value) { all.push(id) }
    else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all);


  }
  // get filterred product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-products`, { checked, radio })
      setProduct(data?.product);

    } catch (error) {
      console.log(`error in filtered product , ${error}`);

    }
  }

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <div className="d-flex flex-column">
            <h3 className='text-center mt-2'>Filter by categories</h3>
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => filterhandler(e.target.checked, c._id)}> {c.name}</Checkbox>
            ))}
          </div>

          <div className="d-flex flex-column ">
            <h3 className='text-center mt-5'>Filter by prices</h3>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name} </Radio>
                </div>
              ))}

            </Radio.Group>

          </div>
          <div className="d-flex flex-column">
            <button className=' btn btn-danger  m-2' style={{ width: '10rem' }} onClick={() => window.location.reload()}>reset filter</button>
          </div>

        </div>

        <div className="col-md-9">
          <h1 className="text-center mt-2">All products</h1>
          <div className="d-flex flex-wrap">
            {product?.map((p) => (
              <div className="card m-3" style={{ width: '16.5rem' }}>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/photo-products/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text"> {p.description.substring(0, 30)}...</p>
                  <p className="card-text">PKR {p.price}</p>
                  <button className='btn btn-primary ms-1 ' onClick={() => navigate(`/product/${p.slug}`)}> More details</button>
                  <button
                    className="btn btn-dark ms-1 "
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      // alert("Item Added to cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;