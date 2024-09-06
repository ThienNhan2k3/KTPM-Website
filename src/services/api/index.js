// React.useEffect(() => {
//   const initData = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/account/getAll/${"brand"}`,
//         {
//           method: "GET",
//         },
//       );
//       const accounts = await res.json();
//       setData(accounts);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return () => initData();
// }, []);
import axios from "@/services/api/customize-axios";

const get = async (url) => {
  try {
    const rawResult = await axios.get(url);
    return await rawResult.data;
  } catch (e) {
    console.error(e);
  }
};

const post = async (url, payload) => {
  try {
    const rawResult = await axios.post(url, payload);
    return await rawResult.data;
  } catch (e) {
    console.error(e);
  }
};

const postForm = async (url, data, file) => {
  try {
    const form = new FormData();
    form.append("my_data", JSON.stringify(data));
    form.append("my_image", file);

    const rawResult = await axios.post(url, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return await rawResult.data;
  } catch (e) {
    console.error(e);
  }
};

const put = async (url, payload) => {
  try {
    const rawResult = await axios.put(url, payload);
    return await rawResult.data;
  } catch (e) {
    console.error(e);
  }
};

const del = async (url) => {
  try {
    const rawResult = await axios.delete(url);
    return await rawResult.data;
  } catch (e) {
    console.error(e);
  }
};

export const baseAPI = { get, post, put, del, postForm };
