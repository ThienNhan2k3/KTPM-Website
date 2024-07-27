import editIcon from "@assets/images/edit-icon.png";
import "./styles.css";
import EditGameModal from "@components/edit-game-modal";
import { useState } from "react";

export default function GameItems() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="game-items-container">
        <p>
          Điểm số: Người chơi nhận được điểm dựa trên độ chính xác và thời gian
          trả lời. Câu trả lời nhanh và chính xác hơn sẽ nhận được nhiều điểm
          hơn.
        </p>
        <div className="container" style={{ marginBottom: "30px" }}></div>

        <button className="btn btn-success" onClick={handleShow}>
          <img src={editIcon} alt="" />
          Chỉnh sửa
        </button>
      </div>
      <EditGameModal
        show={show}
        handleClose={handleClose}
        title="Vật phẩm"
        content="Điểm số: Người chơi nhận được điểm dựa trên độ chính xác và thời gian trả lời. Câu trả lời nhanh và chính xác hơn sẽ nhận được nhiều điểm hơn."
      />
    </>
  );
}
