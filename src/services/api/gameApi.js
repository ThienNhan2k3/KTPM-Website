
import axios from "./customize-axios";

const fetchAllGame = async () => {
    try {
        const res = await axios.get("/game");
        const data = res.data;;
        return data;
    } catch (err) {
        console.error(err);
    }
    
}



const postUpdateAwardGame = async (id, award) => {
    try {
        const res = await axios.post(`/game/${id}`, {
            award
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = res.data;;
        return data;
    } catch (err) {
        console.error(err);
    } 
}

const fetchDetailGame = async (id) => {
    try {
        const res = await axios.get(`/game/${id}`);
        const data = res.data;;
        return data;
    } catch (err) {
        console.error(err);
    }
    
}

export {fetchAllGame, fetchDetailGame, postUpdateAwardGame}
