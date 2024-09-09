import axios from "./customize-axios";

const fetchAllPlayTime = async (start_time, end_time) => {
    try {
        const res = await axios.post("/adminreport/playtimeingame", {
            start_time,
            end_time
        });
        const data = res.data;
        return data;
    } catch (err) {
        console.error(err);
    }
    
}


const fetchTopBrand = async (start_time, end_time, type) => {
    try {
        const res = await axios.post("/adminreport/topBrand", {
            start_time,
            end_time,
            type
        });
        const data = res.data;
        return data;
    } catch (err) {
        console.error(err);
    }
    
}
  
export { fetchAllPlayTime, fetchTopBrand};
