import editIcon from "../../../assets/images/edit-icon.png";
import "./GameIntroduce.css";
export default function GameIntroduce() {
    return (
        <div className="game-introduce-container">
            <p>Trò chơi quiz là một trò chơi thú vị và mang tính giáo dục, nơi người chơi sẽ trả lời các câu hỏi thuộc nhiều chủ đề khác nhau để kiếm điểm. Mục tiêu của trò chơi là trả lời đúng càng nhiều câu hỏi càng tốt.</p>
            <div className="container" style={{marginBottom: "30px"}}></div>

            <button className="btn btn-success">
                <img src={editIcon} alt="" />
                Chỉnh sửa
            </button>
        </div>
    )
}