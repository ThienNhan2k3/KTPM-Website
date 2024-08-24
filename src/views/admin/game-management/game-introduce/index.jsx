import editIcon from "@assets/images/edit-icon.png";
import "./styles.css";
import { useState } from "react";
import EditGameModal from "@components/edit-game-modal";
import TypeInput from "@components/type-input"

import { useOutletContext, useParams } from "react-router-dom";


export default function GameIntroduce() {
  const {id} = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [type, setType, introduce, setIntroduce, award, setAward] = useOutletContext();
  
  return (
    <>
      <div className="game-introduce-container">
        <p>{introduce}</p>
        <div className="container" style={{ marginBottom: "30px" }}></div>

        <button className="btn btn-success" onClick={handleShow}>
          <img src={editIcon} alt="" />
          Chỉnh sửa
        </button>
      </div>
      <EditGameModal
        show={show}
        submitForm={() => {
          
          fetch(`http://localhost:5000/game/${id}`, {
            body: JSON.stringify({
              introduce,
              type: JSON.stringify(type)
            }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          }).then(res => res.json())
          .then(data => {
            console.log("introduce:::", data);
            if (data.code === 200) {
              // setGame(data.metadata);
              setIntroduce(data.metadata.introduce);
              setType(JSON.parse(data.metadata.type));
              setShow(false);
            }
          })
          .catch(err => console.log(err));

        }}
        title="Giới thiệu"
        content={introduce}
        setContent={setIntroduce}
        handleClose={handleClose}
      >
        <div>
          <h4>Thể loại</h4>
          <TypeInput disabled={false} types={type} setTypes={setType} />
        </div>
        
      </EditGameModal>
    </>
  );
}
