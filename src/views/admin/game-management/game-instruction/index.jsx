import editIcon from "@assets/images/edit-icon.png";
import "./styles.css";
import { useState } from "react";
import EditGameModal from "@components/edit-game-modal";

export default function GameInstruction() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="game-instruction-container">
        <p>
          Hiển thị câu hỏi: Câu hỏi sẽ xuất hiện trên màn hình cùng với các tùy
          chọn trả lời (thường là 4 lựa chọn). Trả lời câu hỏi: Người chơi chọn
          một câu trả lời bằng cách nhấp hoặc chạm vào lựa chọn họ cho là đúng.
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
        title="Hướng dẫn"
        content="Hiển thị câu hỏi: Câu hỏi sẽ xuất hiện trên màn hình cùng với các tùy chọn trả lời (thường là 4 lựa chọn).
            Trả lời câu hỏi: Người chơi chọn một câu trả lời bằng cách nhấp hoặc chạm vào lựa chọn họ cho là đúng."
      />
    </>
  );
}
