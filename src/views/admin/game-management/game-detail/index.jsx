import { Outlet } from "react-router-dom";
import cameraIcon from "@assets/images/camera-icon.png";
import tayCamConsole from "@assets/images/tay-cam-console.png";
import editIcon from "@assets/images/edit-icon.png";
import plusIcon from "@assets/images/plus-icon.png";
import { Link, useLocation, useParams } from "react-router-dom";
import "./styles.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useEffect, useState } from "react";
import { fetchDetailGame } from "@/services/api/gameApi";


export default function GameDetail() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [prevImage, setPrevImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [type, setType] = useState("");
  const [award, setAward] = useState("");

  const {id} = useParams();
  useEffect(() => {
    async function getDetailGame() {
      try {
        const data = await fetchDetailGame(id);
        console.log(data);
        if (data.code === 200) {
          setName(data.metadata.name);
          setImage(data.metadata.image);
          setAward(data.metadata.award);
          setIntroduce(data.metadata.introduce);
          setType(JSON.parse(data.metadata.type))
        }
      } catch(err) {
        console.error(err);
      }
    }

    getDetailGame();
  }, []);


  const handleChangeImage = (event) => {
    const [file] = event.target.files;
    if (file) {
      setNewImage(file);
      setPrevImage(URL.createObjectURL(file));
    }
  };
  return (
    <div
      className="d-flex flex-column "
      style={{ padding: "10px 20px", width: "100%", height: "100%" }}
    >
      <div className="d-flex flex-column align-items-center">
        <div className="game-detail-thumbnail">
          <img
            src={image == "" ? tayCamConsole : `http://localhost:5000/${image}`}
            alt=""
            className="game-detail-image"
          />
          <button
            className="change-image-button d-flex justify-content-center align-items-center"
            onClick={handleShow}
          >
            <img src={cameraIcon} alt="" />
          </button>
        </div>
        <div className="game-detail-content d-flex justify-content-center">
          {name}
          <img src={editIcon} alt="" />
        </div>
      </div>

      <nav className="d-flex game-detail-navigation">
        <Link to="" style={{ backgroundColor: "#FAFFAF" }}>
          Giới thiệu
        </Link>
        <Link to="items" style={{ backgroundColor: "#3FA2F6" }}>
          Vật phẩm
        </Link>
      </nav>
      <div
        style={{
          flex: 1,
        }}
      >
        <Outlet context={[type, setType, introduce, setIntroduce, award, setAward]}/>
      </div>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Title className="d-flex justify-content-center mt-4">
          Chọn ảnh
        </Modal.Title>
        <Modal.Body className="d-flex justify-content-center">
        <form>
          <label
            className="btn d-flex flex-row align-items-center"
            style={{
              backgroundColor: "#D9D9D9",
              cursor: "pointer",
              color: "black",
              border: "none",
            }}
            htmlFor="thumbnail-image"
          >
            {prevImage == null ? (
              <>
                <img
                  src={plusIcon}
                  alt=""
                  style={{ width: "22px", marginRight: "8px" }}
                />
                Tải ảnh lên
              </>
            ) : (
              <img src={prevImage} alt="" style={{ width: "260px" }} />
            )}
          </label>
          <input
            type="file"
            id="thumbnail-image"
            name="thumbnail-image"
            accept="image/*"
            onChange={(event) => handleChangeImage(event)}
          />
        </form>

        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <Button
            variant="secondary"
            style={{ backgroundColor: "#FF5526" }}
            onClick={handleClose}
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: "#1FAB89" }}
            onClick={() => {

              const body = new FormData()
              body.append('image', newImage)

              fetch(`http://localhost:5000/game/${id}/image`, {
                body,
                method: 'POST',
                // headers: {
                //   'Content-Type': 'multipart/form-data',
                // },
              }).then(res => res.json())
              .then(data => {
                console.log(data);
                if (data.code === 200) {
                  setImage(data.metadata.image);
                  setPrevImage(null);
                  setNewImage(null);
                }
                setShow(false);
              })
              .catch(err => console.log(err));


            }}
          >
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
