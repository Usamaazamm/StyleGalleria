import React, { useState } from 'react'
import '../styles/Register.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../context/authContext';


const Login = () => {
    const Navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [auth, setauth] = useAuth();
    const location = useLocation();

    const submit = async (e) => {
        setemail("");
        setpassword("");
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/login`,
                { email, password });
            if (res.data.success) {
                alert(res.data.message);
                Navigate(location.state || "/");
                setauth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data));

            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log('error');
            alert("invalid email or password");

        }
    };

    const forgetpassword = () => {
        Navigate("/forgot-password");
    }
    return (
        <>

            <div className="whole">
                <div className="maintt">
                    <h1 style={{ fontSize: '1.6rem' }}>
                        Login Now
                    </h1>
                    <form className='inpot' onSubmit={submit}>
                        <input type="email" placeholder='enter your email' required
                            value={email} onChange={(e) => setemail(e.target.value)} />

                        <input type="password" placeholder='enter your password' required
                            value={password} onChange={(e) => setpassword(e.target.value)} />
                        <button>Login</button>
                    </form>
                    <button style={{ color: 'red' }} onClick={forgetpassword}>RESET PASSWORD</button>

                </div>
            </div></>
    )
}

export default Login;