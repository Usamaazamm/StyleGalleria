import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import '../styles/Header.css'
import { useAuth } from '../context/authContext';
import { useCart } from '../context/cart';

const Header = () => {
    const [auth, setauth] = useAuth();
    const [cart] = useCart();
    const logout = () => {
        setauth({
            ...auth,
            user: null,
            token: "",
        })
        localStorage.removeItem('auth');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <h1 className="navbar-brand">StyleGalleria</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
                            {/* style={{- bsScrollHeight: 100}} */}

                        </ul>
                        <li className="nav-item mx-2">
                            <Link to={"/"} className="nav-link active" aria-current="page">HOME</Link>
                        </li>





                        {!auth.user ? (
                            <>

                                <li className="nav-item mx-2"> <Link to={"/Register"} className="nav-link  ">REGISTER</Link></li>
                                <li className="nav-item mx-2"> <Link to={"/Login"} className="nav-link  ">LOGIN</Link></li>

                            </>
                        ) :
                            (
                                <>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>


                                        <ul className="dropdown-menu">
                                            <li> <Link onClick={logout} to="/Login" className='dropdown-item'>LOGOUT</Link></li>
                                            <li> <Link to={`/Dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className='dropdown-item'>DASHBOARD</Link></li>
                                        </ul>
                                    </li>


                                </>
                            )
                        }






                        <li className="nav-item mx-2">
                            <NavLink to='/cart' className='nav-link' >CART({cart?.length})</NavLink>
                        </li>

                    </div>
                </div>
            </nav >
        </>
    )
}





export default Header;