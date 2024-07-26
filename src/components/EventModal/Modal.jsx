import React, { useEffect, useState } from "react";
import "./Modal.css";
import PlusIcon from "@assets/images/plus-icon.png";

const convertDateFormat = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const Modal = ({ show, onClose, itemData }) => {
  if (!show) {
    return null;
  }

  const data = [
    { id: 1, name: "Voucher1", quantity: 200, sale: "40%", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
    { id: 2, name: "Voucher2", quantity: 200, sale: "40%", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
    { id: 3, name: "Voucher3", quantity: 200, sale: "40%", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
    { id: 4, name: "Voucher4", quantity: 200, sale: "40%", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
    { id: 5, name: "Voucher5", quantity: 200, sale: "40%", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
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
      if (event.target.classList.contains("editevent-modal-overlay")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="editevent-modal-overlay">
      <div className="editevent-modal-content">
        <button className="editevent-modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="editevent-modal-body">
          {itemData && (
            <div>
              <div className="editevent-form-group">
                <label><strong>Tên sự kiện:</strong></label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={itemData.name}
                />
              </div>

              <div className="row editevent-form-group container" style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                <div className="editevent-Date-created">
                  <strong style={{ marginRight: '10px' }}>Ngày bắt đầu:</strong>
                  <input
                    type="date"
                    className="form-control"
                    defaultValue={convertDateFormat(itemData.dateCreate)}
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
                    defaultValue={convertDateFormat(itemData.dateEnd)}
                    style={{
                      width: "150px",
                      padding: "10px",
                    }}
                  />
                </div>
              </div>

              <div className="editevent-form-group">
                <label><strong>Hình ảnh:</strong></label>
                <div className="editevent-image-input">
                  <button className="editevent-add-image-button">
                    Thêm ảnh
                  </button>
                  <span style={{ display: 'inline' }}> file...name.jpg</span>
                </div>
              </div>

              <div className="row editevent-voucher editevent-form-group container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ width: "fit-content" }}>
                  VOUCHER
                </strong>
                <button className="editevent-add-voucher-button">
                  <img src={PlusIcon} alt="Add" style={{ marginRight: '5px' }} />
                  Thêm voucher
                </button>
              </div>

              <div className="editevent-form-group">
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
                  <button className="editevent-table-button" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                  </button>
                  <button className= "editevent-table-button" onClick={handleNextPage} disabled={currentPage === totalPages} style={{ marginLeft: '10px' }}>
                    Next
                  </button>
                </div>
              </div>

              <div className="row editevent-form-group">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={{ marginRight: '10px' }}>
                    <strong>Loại trò chơi:</strong>
                  </label>
                  <span>{itemData.type}</span>
                  {itemData.type === "Quiz" && (
                    <div className="editevent-hiddent-box editevent-form-group">
                      <button className="editevent-hidden-button">Câu hỏi</button>
                    </div>
                  )}
                </div>
              </div>



              <div className="editevent-save editevent-form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="editevent-save-button">
                  Cập nhật sự kiện
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
