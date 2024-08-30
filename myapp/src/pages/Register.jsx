import React, { useState } from 'react'
import '../styles/Register.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Register = () => {
    const Navigate = useNavigate();

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");
    const [answer, setanswer] = useState("");
    const submit = async (e) => {
        setname("");
        setemail("");
        setpassword("");
        setphone("");
        setaddress("");
        setanswer("");
        // alert("register successfully");
        // Navigate("/Login");
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/register`,
                { name, email, password, phone, address, answer });
            if (res.data.success) {
                alert(res.data.message);
                Navigate("/Login");
            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log('error');
            alert("something wrong in register api ");

        }
    };
    return (
        <>
            <div className="whole">
                <div className="maint">
                    <h1 style={{ fontSize: '1.6rem' }}>
                        Register Now
                    </h1>
                    <form className='inpot' onSubmit={submit}>
                        <input type="text" placeholder='enter your name' required
                            value={name} onChange={(e) => setname(e.target.value)} />

                        <input type="email" placeholder='enter your email' required
                            value={email} onChange={(e) => setemail(e.target.value)} />

                        <input type="password" placeholder='enter your password' required
                            value={password} onChange={(e) => setpassword(e.target.value)} />

                        <input type="text" placeholder='enter your phone' required
                            value={phone} onChange={(e) => setphone(e.target.value)} />

                        <input type="text" placeholder='enter your address' required
                            value={address} onChange={(e) => setaddress(e.target.value)} />
                        <input type="text" placeholder='enter your Hobby' required
                            value={answer} onChange={(e) => setanswer(e.target.value)} />
                        <button>signup</button>
                    </form>

                </div>
            </div>



        </>
    )
}

export default Register;