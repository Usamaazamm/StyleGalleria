import React from 'react'
import '../styles/Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="foot">
                <main className='footee'>
                    <h2>All rights reserved &copy</h2>
                </main>
                <footer className='foote'>
                    <Link to={"/About"}>About</Link><span> | </span>
                    <Link to={"/Contact"}>Contact</Link><span> | </span>
                    <Link to={"/Policy"}>Privacy Policy</Link>
                </footer>
            </div>
        </div>
    )
}

export default Footer;