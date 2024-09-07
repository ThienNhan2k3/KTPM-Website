import axios from "./customize-axios";

const fetchGetItemsInEvent = async (id_event) => {
    try {
        const res = await axios.get(`/item/getByIdEvent/${id_event}`);
        const data = res.data;
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
    
  }
  
  const fetchCreateItem = async (new_item) => {
    try {
        const res = await axios.post("/item/create", new_item, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = res.data;
        console.log("Success:", data);
        return data;
    } catch (err) {
        console.error(err);
    }
  }

  const fetchDeleteItem = async (id) => {
    try {
      const res = await axios.delete(`/item/delete/${id}`);
      return res.data;
    } catch (err) {
      console.error("Error deleting item:", err);
      return null; // Return null or handle the error appropriately
    }
  };

  export { fetchGetItemsInEvent, fetchCreateItem, fetchDeleteItem };