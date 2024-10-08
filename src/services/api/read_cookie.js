const readCookie = (key) => {
  try {
    const str = decodeURIComponent(document.cookie);

    // Tách phần JSON từ chuỗi
    const jsonPart = str.split("j:")[1];

    // Chuyển phần JSON thành đối tượng
    const jsonObject = JSON.parse(jsonPart);

    // Trả về giá trị dựa trên key
    console.log(jsonObject[key]);
    return jsonObject[key];
  } catch (err) {
    console.log(err);
    return "";
  }
};

export default readCookie;
