import React, { useEffect, useState } from "react";
import "./Modal.css";
import PlusIcon from "@assets/images/plus-icon.png";

const convertDateFormat = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const Modal = ({ show, onClose}) => {
  if (!show) {
    return null;
  }

  const data = [
    // Add more items if needed
  ];

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
        <div>
              <div className="form-group">
                <label><strong>Tên sự kiện:</strong></label>
                <input
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="row form-group container" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="Date-created">
                  <strong style={{ marginRight: '10px' }}>Ngày bắt đầu:</strong>
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

              <div className="form-group">
                <label><strong>Hình ảnh:</strong></label>
                <div className="image-input">
                  <button className="add-image-button">
                    Thêm ảnh
                  </button>
                  <span style={{ display: 'inline' }}> file...name.jpg</span>
                </div>
              </div>

              <div className="row voucher form-group container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ width: "fit-content" }}>
                  VOUCHER
                </strong>
                <button className="add-voucher-button">
                  <img src={PlusIcon} alt="Add" style={{ marginRight: '5px' }} />
                  Thêm voucher
                </button>
              </div>

              <div className="form-group">
                <table className="table table-bordered my-3" style={{ fontSize: '12px', width: '100%' }}>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '10%' }}>ID</th>
                      <th scope="col" style={{ width: '45%' }}>Quantity</th>
                      <th scope="col" style={{ width: '45%' }}>Sale</th>
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
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="table-button" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                  </button>
                  <button className= "table-button" onClick={handleNextPage} disabled={currentPage === totalPages} style={{ marginLeft: '10px' }}>
                    Next
                  </button>
                </div>
              </div>

              <div className="row form-group">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={{ marginRight: '10px' }}>
                    <strong>Loại trò chơi:</strong>
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label style={{ marginRight: "15px" }}>
                      <input
                        type="radio"
                        name="type"
                        value="Quiz"
                      />
                      Quiz
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="type"s
                        value="Lắc xì"
                      />
                      Lắc xì
                    </label>
                  </div>
                </div>
              </div>

              <div className="save form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="save-button">
                  Thêm sự kiện
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
