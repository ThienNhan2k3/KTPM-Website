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

const get = async (url) => {
  try {
    const rawResult = await fetch(url, {
      method: "GET",
    });
    return await rawResult.json();
  } catch (e) {
    console.error(e);
  }
};

const post = async (url, payload) => {
  try {
    const rawResult = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
    return await rawResult.json();
  } catch (e) {
    console.error(e);
  }
};

const put = async (url, payload) => {
  try {
    const rawResult = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return await rawResult.json();
  } catch (e) {
    console.error(e);
  }
};

const del = async (url) => {
  try {
    const rawResult = await fetch(url, {
      method: "DELETE",
    });
    return await rawResult.json();
  } catch (e) {
    console.error(e);
  }
};

export const baseAPI = { get, post, put, del };
