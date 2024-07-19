
import editIcon from "../../../assets/images/edit-icon.png";
import "./GameItems.css";

export default function GameItems() {
    return (
        <div className="game-items-container">
            <p>Điểm số: Người chơi nhận được điểm dựa trên độ chính xác và thời gian trả lời. Câu trả lời nhanh và chính xác hơn sẽ nhận được nhiều điểm hơn.</p>
            <div className="container" style={{marginBottom: "30px"}}></div>

            <button className="btn btn-success">
                <img src={editIcon} alt="" />
                Chỉnh sửa
            </button>
        </div>
    )
}