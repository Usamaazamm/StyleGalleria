import React from 'react'
import Adminmenu from '../components/adminmenu';

const User = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <Adminmenu />

                </div>
                <div className="col-md-9">
                    <h1>
                        all users
                    </h1>
                </div>
            </div>
        </>
    )
}

export default User;