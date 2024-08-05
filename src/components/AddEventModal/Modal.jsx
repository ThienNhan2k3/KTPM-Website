import React, { useEffect, useState } from "react";
import "./Modal.css";
import PlusIcon from "@assets/images/plus-icon.png";

const convertDateFormat = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const Modal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  const data = [
    // Add more items if needed
  ];
  
  const [, setImage] = React.useState(null);
  const [prevImage, setPrevImage] = React.useState(null);
  const [imageError, setImageError] = React.useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const [selectedType, setSelectedType] = useState(""); // State to track selected type

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleChangeImage = (event) => {
    const [file] = event.target.files;
    if (file) {
      setImage(file);
      setPrevImage(URL.createObjectURL(file));
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

  return (
    <div className="addevent-modal-overlay">
      <div className="addevent-modal-content">
        <button className="addevent-modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="addevent-modal-body">
          <div>
            <div className="addevent-form-group">
              <label>
                <strong>Tên sự kiện:</strong>
              </label>
              <input type="text" className="form-control" />
            </div>

            <div
              className="row addevent-form-group container"
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
              }}
            >
              <div className="addevent-Date-created">
                <strong style={{ marginRight: "10px" }}>Ngày bắt đầu:</strong>
                <input
                  type="date"
                  className="form-control"
                  defaultValue={convertDateFormat("25/7/2024")}
                  style={{
                    width: "150px",
                    padding: "10px",
                  }}
                />
              </div>
              <div className="Date-end">
                <label>
                  <strong>Ngày kết thúc:</strong>
                </label>
                <input
                  type="date"
                  className="form-control"
                  defaultValue={convertDateFormat("25/7/2024")}
                  style={{
                    width: "150px",
                    padding: "10px",
                  }}
                />
              </div>
            </div>

            <div className="addevent-form-group">
              <label>
                <strong>Hình ảnh:</strong>
              </label>
              <div className="row addevent-image-input">
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #3FA2F6",
                    padding: "5px 15px",
                    width: "fit-content",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  htmlFor="thumbnail-image"
                >
                  {prevImage == null ? (
                    <>
                      <div className="addevent-add-image-button">
                        Thêm ảnh
                      </div>
                    </>
                  ) : (
                      <img
                        src={prevImage}
                        alt=""
                        style={{ width: "150px" }}
                      />
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
                    <>
                      <div>file...name.jpg</div>
                    </>
                  ) : (
                    <span
                      style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      height: "24px",
                      }}
                    >
                      {prevImage}
                    </span>
                  )}
                </label>
                <input
                  type="file"
                  id="thumbnail-image"
                  name="thumbnail-image"
                  accept="image/*"
                  onChange={(event) => handleChangeImage(event)}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div
              className="row addevent-voucher addevent-form-group container"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong style={{ width: "fit-content" }}>VOUCHER</strong>
              <button className="addevent-add-voucher-button">
                <img
                  src={PlusIcon}
                  alt="Add"
                  style={{ 
                    marginRight: "5px",
                    display: "inline",

                  }}
                />
                Thêm voucher
              </button>
            </div>

            <div className="addevent-form-group">
              <table
                className="table table-bordered my-3"
                style={{ fontSize: "12px", width: "100%" }}
              >
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "10%" }}>
                      ID
                    </th>
                    <th scope="col" style={{ width: "45%" }}>
                      Quantity
                    </th>
                    <th scope="col" style={{ width: "45%" }}>
                      Sale
                    </th>
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
              <div
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  className="addevent-table-button"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="addevent-table-button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  style={{ marginLeft: "10px" }}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="row addevent-form-group">
              <div style={{ display: "flex", alignItems: "center" }}>
                <label style={{ marginRight: "10px" }}>
                  <strong>Loại trò chơi:</strong>
                </label>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <label style={{ marginRight: "15px" }}>
                    <input
                      type="radio"
                      name="type"
                      value="Quiz"
                      onChange={handleTypeChange}
                    />
                    Quiz
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="Lắc xì"
                      onChange={handleTypeChange}
                    />
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


            <div
              className="addevent-save addevent-form-group"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button className="addevent-save-button">Thêm sự kiện</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
