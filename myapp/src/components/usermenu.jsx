import React from 'react'
import { NavLink } from 'react-router-dom';

const Usermenu = () => {
    return (
        <>
            <div className="text-center">
                <h3>Dashboard</h3>
                <div className="list-group">
                    <NavLink to="/Dashboard/user/Profile" className="list-group-item list-group-item-action">Profile</NavLink>
                    <NavLink to="/Dashboard/user/Orders" className="list-group-item list-group-item-action">Orders</NavLink>
                </div>
            </div>

        </>
    )
}

export default Usermenu;