import React from "react";
import "./VoucherSelectionModal.css";

const VoucherSelectionModal = ({ vouchers, onClose, onSelectVoucher }) => {
  return (
    <div className="voucher-modal-overlay">
      <div className="voucher-modal-content">
        <button className="voucher-modal-close" onClick={onClose}>
          &times;
        </button>
        <h3>Chọn Voucher</h3>
        <ul className="voucher-list">
          {vouchers.map((voucher) => (
            <li key={voucher.id} className="voucher-item" onClick={() => onSelectVoucher(voucher)}>
              <span>{voucher.value}%</span>
              <span>Tối đa {voucher.max_discount} vnđ</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VoucherSelectionModal;
