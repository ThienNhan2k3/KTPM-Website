import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Editor from "@/components/editor";
import "./styles.css";

export default function EditGameModal({
  show,
  submitForm,
  title,
  content,
  setContent,
  handleClose,
  children
}) {
  return (
    <Modal className="edit-game-infor-modal-without-genre-container" centered show={show} onHide={handleClose}>
      <Modal.Title className="d-flex justify-content-center mt-4">
        {title}
      </Modal.Title>
      <Modal.Body className="d-flex flex-column justify-content-start gap-3">
        {/* <Editor content={content} /> */}
        <div class="d-flex flex-column">
          <label>Giới thiệu</label>
          <textarea style={{border: "1px solid black", borderRadius: "6px", padding: "10px"}} rows="5" cols="33"
            onChange={(event) => {
              setContent(event.target.value)
            }}>
            {content}
          </textarea>
        </div>
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
          onClick={submitForm}
        >
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
