import editIcon from "../../../assets/images/edit-icon.png";
import "./GameIntroduce.css";
import { useState } from 'react';
import EditGameInforModalWithoutGenre from "../../../components/EditModal/EditGameInforModalWithoutGenre";

export default function GameIntroduce() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
        <div className="game-introduce-container">
            <p>Trò chơi quiz là một trò chơi thú vị và mang tính giáo dục, nơi người chơi sẽ trả lời các câu hỏi thuộc nhiều chủ đề khác nhau để kiếm điểm. Mục tiêu của trò chơi là trả lời đúng càng nhiều câu hỏi càng tốt.</p>
            <div className="container" style={{marginBottom: "30px"}}></div>

            <button className="btn btn-success" onClick={handleShow}>
                <img src={editIcon} alt="" />
                Chỉnh sửa
            </button>
        </div>
        <EditGameInforModalWithoutGenre show={show} handleClose={handleClose} title="Giới thiệu" content="Trò chơi quiz là một trò chơi thú vị và mang tính giáo dục, nơi người chơi sẽ trả lời các câu hỏi thuộc nhiều chủ đề khác nhau để kiếm điểm. Mục tiêu của trò chơi là trả lời đúng càng nhiều câu hỏi càng tốt." />
        </>
    )
}