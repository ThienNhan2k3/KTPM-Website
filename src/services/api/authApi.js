
import axios from "./customize-axios";


const postLogin = async (email, password, navigateCb) => {
    try {
        const response = await axios.post("/login", {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const data = response.data;
        console.log(data);
        if (data.code == 200) {
            // window.localStorage.setItem("isLogined", true);
            // window.localStorage.setItem("homePage", data.redirect);
            navigateCb(data.redirect)
        }
        
    } catch (err) {
        console.error(err);
    }
}


const getLogout = async (navigateCb) => {
    try {
        const response = await axios.get("/logout");
        const data = response.data;
        console.log(data);
        return data;
        
    } catch (err) {
        console.error(err);
    }
}


export {postLogin, getLogout}
