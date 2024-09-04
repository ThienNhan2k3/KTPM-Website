import { Outlet, Navigate, useLoaderData } from "react-router-dom";
import PageNotFound from "./404";

export const loader = async () => {
    try {
        const data = await (fetch(`http://localhost:5000/routes`, {
            body: JSON.stringify({
                path: window.location.pathname
            }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          }).then(res => res.json()));
        console.log(data);
        if (!data.metadata) {
            throw new Error("You don't have a permission");
        }
        return data.metadata;
    } catch(err) {
        console.log(err);
    }
   
}


const PrivateRoutes = () => {
    const metadata = useLoaderData();
    if (!metadata.login) {
        if (window.location.pathname === "/" || window.location.pathname === "/signup") {
            return <Outlet />;
        }
        return  <Navigate to="/" />;
    }

    if (!metadata.permission) {
        if (window.location.pathname === "/" || window.location.pathname === "/signup") {
            return  <Navigate to={metadata.homePage} />;
        }
        return <PageNotFound homeLink={metadata.homePage}/>
    } 
    
    return <Outlet />;
};
export default PrivateRoutes;