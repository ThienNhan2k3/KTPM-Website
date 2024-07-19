import editIcon from "../../../assets/images/edit-icon.png";
import "./GameInstruction.css";

export default function GameInstruction() {
    return (
        <div className="game-instruction-container">
            <p>Hiển thị câu hỏi: Câu hỏi sẽ xuất hiện trên màn hình cùng với các tùy chọn trả lời (thường là 4 lựa chọn).
            Trả lời câu hỏi: Người chơi chọn một câu trả lời bằng cách nhấp hoặc chạm vào lựa chọn họ cho là đúng.</p>
            <div className="container" style={{marginBottom: "30px"}}></div>

            <button className="btn btn-success">
                <img src={editIcon} alt="" />
                Chỉnh sửa
            </button>
        </div>
    )
}