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

const postCreateLacXiEvents = async () => {
    try {
        const res = await axios.post("/event/getAll", {});
        const data = res.data;
        return data;
    } catch (err) {
        console.error(err);
    }
}

export {fetchAllEvents, postCreateLacXiEvents}
