import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Adminroute = () => {
    const [ok, setok] = useState(false);
    // eslint-disable-next-line
    const [auth, setauth] = useAuth();
    useEffect(() => {
        const authcheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
            if (res.data.ok) {
                setok(true);
            } else {
                setok(false);
            }
        }
        if (auth?.token) authcheck();

    }, [auth?.token]);
    return ok ? <Outlet /> : "please login to access the dashboard";

}

export default Adminroute;