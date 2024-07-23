import React, { useEffect } from "react";
import "./Modal.css";

const convertDateFormat = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const Modal = ({ show, onClose, itemData }) => {
  if (!show) {
    return null;
  }

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
          <h2>EDIT EVENT</h2>
          {itemData && (
            <div>
              <div className="form-group">
                <label>
                  <strong>ID:</strong> <span style={{ display: 'inline' }}>{itemData.id}</span>
                </label>
              </div>
              <div className="form-group">
                <label><strong>Name:</strong></label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={itemData.name}
                />
              </div>
              <div className="form-group">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={{ marginRight: '10px' }}>
                    <strong>Type:</strong>
                  </label>
                  <select className="form-control" defaultValue={itemData.type}>
                    <option value="Quiz">Quiz</option>
                    <option value="Lắc xì">Lắc xì</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>
                  <strong style={{ marginRight: '10px' }}>Date Created:</strong>
                  <span style={{ display: 'inline' }}>{itemData.dateCreate}</span>
                </label>
                
              </div>
              <div className="form-group">
                <label><strong >Date End:</strong></label>
                <input
                  type="date"
                  className="form-control"
                  defaultValue={convertDateFormat(itemData.dateEnd)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
