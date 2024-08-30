import React from 'react'
import Usermenu from '../../components/usermenu';
import { useAuth } from '../../context/authContext';

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <>
            <div className="container-flui m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <Usermenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h2 className="text-center" style={{ color: "blueviolet" }}>User Details</h2>
                            <h3>UserName : {auth?.user?.name}</h3>
                            <h3>UserEmail : {auth?.user?.email}</h3>
                            <h3>UserPhone : {auth?.user?.phone}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;