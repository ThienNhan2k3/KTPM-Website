import React from "react";
import "./Modal.css";

const Modal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <h2>Search Box</h2>
          <p>This is a placeholder for your search box content.</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
