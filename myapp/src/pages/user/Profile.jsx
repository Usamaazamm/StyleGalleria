import React, { useEffect, useState } from 'react'
import Usermenu from '../../components/usermenu';
import '../../styles/Register.css'
import axios from 'axios'
import { useAuth } from '../../context/authContext';


const Profile = () => {
    const [auth, setauth] = useAuth();
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");

    useEffect(() => {
        const { name, email, phone, address } = auth?.user;
        setname(name);
        setemail(email);
        setphone(phone);
        setaddress(address);
    }, [auth?.user])
    const submit = async (e) => {
        setname("");
        setemail("");
        setpassword("");
        setphone("");
        setaddress("");
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/auth/profile`,
                { name, email, password, phone, address });
            if (data?.errro) {
                alert(data?.error);
            } else {
                setauth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                alert("Profile Updated Successfully");
            }
        } catch (error) {
            console.log('error');
            alert("something wrong in update profile ");

        }
    };
    return (
        <>
            <div className="container-flui m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <Usermenu />
                    </div>

                    <div className="col-md-9 m-12">
                        <h4 style={{ color: "red" }}>
                            please enter your correct
                            address and name to collect
                            your order you can also
                            update and manage your
                            account here.Thanks for
                            your support...
                        </h4>
                        <div className="whole">
                            <div className="maint">
                                <h1>
                                    Profile
                                </h1>
                                <form className='inpot' onSubmit={submit}>
                                    <input type="text" placeholder='enter your name'
                                        value={name} onChange={(e) => setname(e.target.value)} />

                                    <input type="email" placeholder='enter your email'
                                        value={email} onChange={(e) => setemail(e.target.value)} disabled />

                                    <input type="password" placeholder='enter your password'
                                        value={password} onChange={(e) => setpassword(e.target.value)} />

                                    <input type="text" placeholder='enter your phone'
                                        value={phone} onChange={(e) => setphone(e.target.value)} />

                                    <input type="text" placeholder='enter your address'
                                        value={address} onChange={(e) => setaddress(e.target.value)} />
                                    <button>Update</button>
                                </form>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;