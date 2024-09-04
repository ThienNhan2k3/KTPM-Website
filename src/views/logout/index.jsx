import { useEffect } from "react";
import { Navigate } from "react-router-dom";


export default function Logout() {
    window.localStorage.setItem("isLogined", false);
    window.localStorage.setItem("homgePage", "");

    useEffect(() => {
        fetch(`http://localhost:5000/logout`, {
            method: 'GET',
            credentials: 'include'
          }).then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.log(err));
    }, []);
    return <Navigate to="/" />
}