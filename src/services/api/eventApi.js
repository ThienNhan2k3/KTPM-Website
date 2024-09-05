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


const fetchCreateEvent = async (new_event) => {
  try {
      const res = await axios.post("/event/create", new_event, {
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


const fetchUpdateEvent = async (id, update_event) => {
  try {
    const res = await axios.put(`/event/update/${id}`, update_event, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Event updated successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error updating event:", err);
    return null; // Return null or handle the error appropriately
  }
};

const fetchCreateVoucherInEvent = async (new_voucher_in_event) => {
  try {
      const res = await axios.post("/voucher_in_event/create", new_voucher_in_event, {
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
  
export { fetchAllEvents, fetchCreateEvent, fetchUpdateEvent , fetchCreateVoucherInEvent};
