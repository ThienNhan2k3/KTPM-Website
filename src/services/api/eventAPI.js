import axios from "./customize-axios";

const fetchAllEvents = async () => {
    try {
        const res = await axios.get("/event/getAll");
        const data = res.data;
        return data;
    } catch (err) {
        console.error(err);
    }
    
}


export {fetchAllEvents}
