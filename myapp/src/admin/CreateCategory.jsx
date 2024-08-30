import React, { useEffect, useState } from 'react'
import Adminmenu from '../components/adminmenu';
import axios from 'axios';
import FormCategory from '../components/formCategory';
import { Modal } from 'antd';

const CreateCategory = () => {
    const [category, setCategory] = useState([]);
    const [name, setname] = useState();
    const [visible, setVisible] = useState();
    const [updatedName, setUpdatedName] = useState("");
    const [selected, setSelected] = useState(null);

    // get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            if (data?.success) {
                setCategory(data?.category);
            }
        } catch (error) {
            console.log(error)
            alert('error while getting category in fron');
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])
    // create category
    const submit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name })
            if (data?.success) {
                alert(`${name} is created`);
                setname("");
                getAllCategory();
            }
        } catch (error) {
            console.log(error)
            alert("error in post category");

        }
    }

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data?.success) {
                alert(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }
        } catch (error) {
            console.log(error);
            alert('something wrong in update category')

        }
    }
    // delete category
    const handleDelete = async (pid) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`)
            if (data?.success) {
                alert(`category is deleted`);
                getAllCategory();
            }
        } catch (error) {
            console.log(error);
            alert('something wrong in update category')

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
                        Manage category
                    </h1>
                    <div className="p-3">
                        <FormCategory handleSubmit={submit} value={name} setvalue={setname} />
                    </div>
                    <div className='w-75'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope="col"> name</th>
                                    <th scope="col">action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category?.map((category) => (
                                    <>
                                        <tr>
                                            <td key={category._id}>{category.name}</td>
                                            <td className='btn btn-primary ms-2 my-2' onClick={() => {
                                                setVisible(true);
                                                setUpdatedName(category.name);
                                                setSelected(category)
                                            }}>Edit</td>
                                            <td className='btn btn-danger ms-2' onClick={() => handleDelete(category._id)}>Delete</td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>
                < Modal open={visible}

                    onCancel={() => setVisible(false)}

                >
                    <FormCategory handleSubmit={handleUpdate} value={updatedName} setvalue={setUpdatedName} />
                </Modal>
            </div>
        </>
    )
}

export default CreateCategory;