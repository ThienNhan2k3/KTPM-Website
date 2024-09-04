import editIcon from "@assets/images/edit-icon.png";
import "./styles.css";
import EditGameModal from "@components/edit-game-modal";
import { useState } from "react";

import { useOutletContext, useParams } from "react-router-dom";
import { postUpdateAwardGame } from "@/services/api/gameApi";

export default function GameItems() {
  const {id} = useParams();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [type, setType, introduce, setIntroduce, award, setAward] = useOutletContext();

  return (
    <>
      <div className="game-items-container">
        <p>{award}</p>
        <div className="container" style={{ marginBottom: "30px" }}></div>

        <button className="btn btn-success" onClick={handleShow}>
          <img src={editIcon} alt="" />
          Chỉnh sửa
        </button>
      </div>
      <EditGameModal
        show={show}
        submitForm={async () => {
          try {
            const data = postUpdateAwardGame(id, award);
            if (data.code === 200) {
              // setGame(data.metadata);
              setAward(data.metadata.award);
              setShow(false);
            }
          } catch(err) {
            console.error(err);
          }
        }}
        title="Vật phẩm"
        content={award}
        setContent={setAward}
        handleClose={handleClose}
      ></EditGameModal>
    </>
  );
}
