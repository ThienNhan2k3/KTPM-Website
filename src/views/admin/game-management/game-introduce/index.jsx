import editIcon from "@assets/images/edit-icon.png";
import "./styles.css";
import { useState } from "react";
import EditGameModal from "@components/edit-game-modal";
import TypeInput from "@components/type-input"

export default function GameIntroduce() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="game-introduce-container">
        <p>
          Trò chơi quiz là một trò chơi thú vị và mang tính giáo dục, nơi người
          chơi sẽ trả lời các câu hỏi thuộc nhiều chủ đề khác nhau để kiếm điểm.
          Mục tiêu của trò chơi là trả lời đúng càng nhiều câu hỏi càng tốt.
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
        title="Giới thiệu"
        content="Trò chơi quiz là một trò chơi thú vị và mang tính giáo dục, nơi người chơi sẽ trả lời các câu hỏi thuộc nhiều chủ đề khác nhau để kiếm điểm. Mục tiêu của trò chơi là trả lời đúng càng nhiều câu hỏi càng tốt."
      >
        <div>
          <h4>Thể loại</h4>
          <TypeInput disabled={true} intialTypes={["Đố vui", "Săn quà"]} />
        </div>
        
      </EditGameModal>
    </>
  );
}
