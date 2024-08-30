import React from 'react'
import { NavLink } from 'react-router-dom';

const Adminmenu = () => {
    return (
        <>
            <div className="text-center">
                <h3>Admin Panel</h3>
                <div className="list-group">
                    <NavLink to="/Dashboard/admin/Create-Category" className="list-group-item list-group-item-action">Create Category</NavLink>
                    <NavLink to="/Dashboard/admin/Create-Product" className="list-group-item list-group-item-action">Create Product</NavLink>
                    <NavLink to="/Dashboard/admin/Product" className="list-group-item list-group-item-action">Products</NavLink>
                    <NavLink to="/Dashboard/admin/orders" className="list-group-item list-group-item-action">Orders</NavLink>
                    <NavLink to="/Dashboard/admin/User" className="list-group-item list-group-item-action">User</NavLink>
                </div>
            </div>

        </>
    )
}

export default Adminmenu;