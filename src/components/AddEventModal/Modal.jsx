import React, { useEffect, useState } from "react";
import "./Modal.css";
import PlusIcon from "@assets/images/plus-icon.png";

const convertDateFormat = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const Modal = ({ show, onClose }) => {
  if (!show) return null;

  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  const [prevImage, setPrevImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState(convertDateFormat("01/01/2024")); // Adjust default date
  const [endDate, setEndDate] = useState(convertDateFormat("01/01/2024")); // Adjust default date
  
  const [errors, setErrors] = useState({
    data: "",
    eventName: "",
    startDate: "",
    endDate: "",
    image: "",
  });

  const validateDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    return dateObj.toString() === 'Invalid Date' ? "Ngày không hợp lệ!" : "";
  };

  const validateForm = () => {
    const newErrors = {
      data: data.length === 0 ? "Chưa có voucher cho sự kiện!" : "",
      eventName: eventName.trim() === "" ? "Tên sự kiện không được bỏ trống!" : "",
      startDate: startDate.trim() === "" ? "Ngày bắt đầu không được bỏ trống!" : validateDate(startDate),
      endDate: endDate.trim() === "" ? "Ngày kết thúc không được bỏ trống!" : validateDate(endDate),
      image: !image ? "Ảnh không được để trống!" : "",
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Submit form data
      console.log("Form submitted");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("addevent-modal-overlay")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  const handleChangeImage = (event) => {
    const [file] = event.target.files;
    if (file) {
      setImage(file);
      setPrevImage(URL.createObjectURL(file));
      setImageError(false);
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const itemsPerPage = 4;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="addevent-modal-overlay">
      <div className="addevent-modal-content">
        <button className="addevent-modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="addevent-modal-body">
          <div className="addevent-form-group">
            <label><strong>Tên sự kiện:</strong></label>
            {errors.eventName && 
              <span className="addevent-error-text"
                style={{
                  right: '40px',
                }}
              >
                {errors.eventName}
              </span>
            }
            <input
              type="text"
              className="form-control"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>

          <div className="row addevent-form-group container" style={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}>
            <div className="addevent-Date-created">
              <strong style={{ marginRight: "10px" }}>Ngày bắt đầu:</strong>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ width: "150px", padding: "10px" }}
              />
              {errors.startDate && 
                <span className="addevent-error-text"
                  style={{
                  }}
                >
                  {errors.startDate}
                </span>
              }
            </div>
            <div className="Date-end">
              <label><strong>Ngày kết thúc:</strong></label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ width: "150px", padding: "10px" }}
              />
              {errors.endDate && 
                <span className="addevent-error-text"
                  style={{
                  }}
                >
                  {errors.endDate}
                </span>
              }
            </div>
          </div>

          <div className="addevent-form-group">
            <label><strong>Hình ảnh:</strong></label>
            <div className="row addevent-image-input">
              <label
                style={{
                  width: "fit-content",
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #3FA2F6",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                htmlFor="thumbnail-image"
              >
                {prevImage == null ? (
                  <div className="addevent-add-image-button">Thêm ảnh</div>
                ) : (
                  <img src={prevImage} alt="Preview" style={{ width: "150px" }} />
                )}
              </label>

              <label
                style={{
                  marginLeft: "15px",
                  display: "flex",
                  alignItems: "end",
                  width: "180px",
                  pointerEvents: "none",
                }}
                htmlFor="thumbnail-image"
              >
                {prevImage == null ? (
                  <div>file...name.jpg</div>
                ) : (
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", height: "24px" }}>
                    {prevImage}
                  </span>
                )}
              </label>
              <input
                type="file"
                id="thumbnail-image"
                name="thumbnail-image"
                accept="image/*"
                onChange={handleChangeImage}
                style={{ display: "none" }}
              />
            </div>
            {errors.image && 
              <span className="addevent-error-text"
                style={{
                }}
              >
                {errors.image}
              </span>
            }
          </div>

          <div className="row addevent-voucher addevent-form-group container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ width: "fit-content" }}>VOUCHER</strong>
            {errors.data && 
              <span className="addevent-error-text"
                style={{
                  left: '100px',
                }}
              >
                {errors.data}
              </span>
            }
            <button className="addevent-add-voucher-button">
              <img src={PlusIcon} alt="Add" style={{ marginRight: "5px", display: "inline" }} />
              Thêm voucher
            </button>
          </div>

          <div className="addevent-form-group">
            <table className="table table-bordered my-3" style={{ fontSize: "12px", width: "100%" }}>
              <thead>
                <tr>
                  <th scope="col" style={{ width: "10%" }}>ID</th>
                  <th scope="col" style={{ width: "45%" }}>Quantity</th>
                  <th scope="col" style={{ width: "45%" }}>Sale</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.quantity}</td>
                    <td>{item.sale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="addevent-table-button" onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <button className="addevent-table-button" onClick={handleNextPage} disabled={currentPage === totalPages} style={{ marginLeft: "10px" }}>
                Next
              </button>
            </div>
          </div>

          <div className="row addevent-form-group">
            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ marginRight: "10px" }}><strong>Loại trò chơi:</strong></label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <label style={{ marginRight: "15px" }}>
                  <input type="radio" name="type" value="Quiz" onChange={handleTypeChange} />
                  Quiz
                </label>
                <label>
                  <input type="radio" name="type" value="Lắc xì" onChange={handleTypeChange} />
                  Lắc xì
                </label>
              </div>
              {selectedType === "Quiz" && (
                <div className="addevent-hiddent-box addevent-form-group">
                  <button className="addevent-hidden-button">Câu hỏi</button>
                </div>
              )}
            </div>
          </div>

          <div className="row addevent-form-group" style={{ display: "flex", justifyContent: "center" }}>
            <button className="addevent-save-button" onClick={handleSubmit}>Thêm sự kiện</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
