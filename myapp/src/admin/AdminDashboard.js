import React from 'react'
import Adminmenu from '../components/adminmenu';
import { useAuth } from '../context/authContext';

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <>
            <div className='container-flui m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Adminmenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card m-75 p-3'>
                            <h3>
                                name : {auth?.user?.name}
                            </h3>
                            <h3>
                                emai : {auth?.user?.email}
                            </h3>
                            <h3>
                                phone : {auth?.user?.phone}
                            </h3>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default AdminDashboard;