import React, { useState } from 'react'
import '../styles/Register.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
// import { useAuth } from '../context/authContext';

const Forgotpassword = () => {
    const Navigate = useNavigate();
    const [email, setemail] = useState("");
    const [answer, setanswer] = useState("");
    const [newpassword, setnewpassword] = useState("");
    // const [auth, setauth] = useAuth();
    // const location = useLocation();

    const submit = async (e) => {
        setemail("");
        setnewpassword("");
        setanswer("");
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
                { email, answer, newpassword });
            if (res.data.success) {
                alert(res.data.message);
                Navigate("/Login");
                // setauth({
                //     ...auth,
                //     user: res.data.user,
                //     token: res.data.token,
                // })
                // localStorage.setItem('auth', JSON.stringify(res.data));

            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log('error');
            alert("invalid email or answerr");

        }
    };
    return (
        <>

            <div className="whole">
                <div className="maintt">
                    <h1 style={{ fontSize: '1.6rem' }}>
                        Reset Password
                    </h1>
                    <form className='inpot' onSubmit={submit}>
                        <input type="email" placeholder='enter your email' required
                            value={email} onChange={(e) => setemail(e.target.value)} />

                        <input type="text" placeholder='enter your hobby' required
                            value={answer} onChange={(e) => setanswer(e.target.value)} />


                        <input type="password" placeholder='enter your new password' required
                            value={newpassword} onChange={(e) => setnewpassword(e.target.value)} />
                        <button>Reset</button>
                    </form>

                </div>
            </div></>
    )
}
export default Forgotpassword;