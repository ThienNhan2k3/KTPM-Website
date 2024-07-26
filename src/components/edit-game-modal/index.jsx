import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Editor from "../Editor/Editor";
import "./styles.css";

export default function EditGameModal({
  show,
  handleClose,
  title,
  content,
  children
}) {
  return (
    <Modal className="edit-game-infor-modal-without-genre-container" centered show={show} onHide={handleClose}>
      <Modal.Title className="d-flex justify-content-center mt-4">
        {title}
      </Modal.Title>
      <Modal.Body className="d-flex flex-column justify-content-start gap-3">
        <Editor content={content} />
        {children}
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
          onClick={handleClose}
        >
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
