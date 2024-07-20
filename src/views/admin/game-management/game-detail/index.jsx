import { Outlet } from "react-router-dom";
import cameraIcon from "@assets/images/camera-icon.png";
import tayCamConsole from "@assets/images/tay-cam-console.png";
import editIcon from "@assets/images/edit-icon.png";
import plusIcon from "@assets/images/plus-icon.png";
import { Link } from "react-router-dom";
import "./styles.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function GameDetail() {
  const [show, setShow] = useState(false);
  const [prevImage, setPrevImage] = useState(null);
  const [image, setImage] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeImage = (event) => {
    const [file] = event.target.files;
    if (file) {
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
            src={image == null ? tayCamConsole : image}
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
          Realtime Quiz
          <img src={editIcon} alt="" />
        </div>
      </div>

      <nav className="d-flex game-detail-navigation">
        <Link to="" style={{ backgroundColor: "#FAFFAF" }}>
          Giới thiệu
        </Link>
        <Link to="instruction" style={{ backgroundColor: "#96C9F4" }}>
          Hướng dẫn
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
        <Outlet />
      </div>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Title className="d-flex justify-content-center mt-4">
          Chọn ảnh
        </Modal.Title>
        <Modal.Body className="d-flex justify-content-center">
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
              setImage(prevImage);
              setShow(false);
            }}
          >
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
