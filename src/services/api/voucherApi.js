import axios from "./customize-axios";

const fetchAllActiveVouchers = async () => {
    try {
        const res = await axios.get("/voucher/getAll_active");
        const data = res.data;
        return data;
    } catch (err) {
        console.error(err);
    }
    
}

const fetchCountAllActiveVouchers = async () => {
    try {
        const res = await axios.get("/voucher/countAll_active");
        const data = res.data;
        return data;
    } catch (err) {
        console.error(err);
    }
    
}

const fetchCountAllInactiveVouchers = async () => {
    try {
        const res = await axios.get("/voucher/countAll_inactive");
        const data = res.data;
        return data;
    } catch (err) {
        console.error(err);
    }
    
}


export {fetchAllActiveVouchers, fetchCountAllActiveVouchers, fetchCountAllInactiveVouchers}
