{/* <form className="m-3 w-75" onSubmit={submit} >
                        <input type="text" placeholder='enter the product name'
                            value={name} className='form-control'
                            onChange={(e) => setName(e.target.value)} />
                        <input type="textarea" placeholder='enter the product description'
                            value={description} className='form-control'
                            onChange={(e) => setDescription(e.target.value)} />
                        <input type="number" placeholder='enter the product price'
                            value={price} className='form-control'
                            onChange={(e) => setPrice(e.target.value)} />
                        <input type="number" placeholder='enter the product quantity'
                            value={quantity} className='form-control'
                            onChange={(e) => setQuantity(e.target.value)} />
                        <Select placeholder="enter a category"
                            variant={false}
                            showSearch
                            size='large'
                            className='form-select mb-3' onChange={(value) => setCategory(value)}>
                            {categories.map((category) => (
                                <Option key={category._id} value={category._id}>{category.name}</Option>
                            ))}
                        </Select>
                        <label className='btn btn-primary col-md-12'>
                            {photo ? photo.name : 'upload photo'}
                            <input type="file" name='photo'
                                accept="image/*"

                                onChange={(e) => setPhoto(e.target.files[0])} hidden />
                        </label>
                        <div className="mb-3">
                            {photo && (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} alt="product"
                                        height={'200px'} className='img img-responsive' />
                                </div>
                            )}
                        </div>
                        <Select variant={false}
                            placeholder="select a shipping "
                            showSearch
                            size='large'
                            className='form-select mb-3' onChange={(value) => setShipping(value)}>
                            <Option value='0'>no</Option>
                            <Option value='1'>yes</Option>
                        </Select>
                        <button className='btn btn-primary'>Create Product</button>
                    </form> */}




                    
    //get all products data
    //  const handleCre = async () => {
    //      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`)
    //  }



    
    // const submit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/Products/create-products`, { name, price, description, quantity, category, photo, shipping })
    //         if (res.data?.success) {
    //             alert(res.data.message)
    //         }
    //         else {
    //             alert(res.data.message);
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         alert("error in create product of f")
    //     }

    // }




    
    // get all category
    // const getAllCategory = async () => {
    //     try {
    //         const { data } = await axios.get(
    //             `${process.env.REACT_APP_API}/api/v1/category/get-category`)
    //         if (data?.success) {
    //             setCategories(data?.category);
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         alert('error while getting category in fron');
    //     }
    // }

    // useEffect(() => {
    //     getAllCategory();
    // }, [])

    
    // const [categories, setCategories] = useState([]);
    // const [name, setName] = useState("")
    // const [category, setCategory] = useState("")
    // const [description, setDescription] = useState("")
    // const [quantity, setQuantity] = useState("")
    // const [shipping, setShipping] = useState("");
    // const [photo, setPhoto] = useState("");
    // const [price, setPrice] = useState("")



//     import axios from 'axios';
// import { Select } from 'antd';
// const { Option } = Select

// <h1>Home </h1>
//       <pre>{JSON.stringify(auth, null, 4)}</pre>
//       <button>
//         click me
//       </button>




// <div>
//             <div className="head">
//                 <h1 className='h1'>StyleGalleria</h1>
//                 <main className="main">
//                     <Link to={"/"}>HOME</Link>
//                     <Link to={"/Category"}>CATEGORY</Link>
//                     {
//                         !auth.user ? (
//                             <>
//                                 <Link to={"/Register"}>REGISTER</Link>
//                                 <Link to={"/Login"}>LOGIN</Link>
//                             </>
//                         ) :
//                             (
//                                 <>
//                                     <li className='nav-item dropdown' >
//                                         <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                             {auth?.user?.name}
//                                         </NavLink>
//                                         <ul className="dropdown-menu">
//                                             <li> <Link onClick={logout} to="/Login" className='dropdown-item'>LOGOUT</Link></li>
//                                             <li> <Link to={`/Dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className='dropdown-item'>DASHBOARD</Link></li>
//                                         </ul>
//                                     </li>
//                                 </>
//                             )
//                     }

//                     <NavLink to='/cart' className='man' >CART({cart?.length})</NavLink>

//                 </main>
//             </div>
//         </div>