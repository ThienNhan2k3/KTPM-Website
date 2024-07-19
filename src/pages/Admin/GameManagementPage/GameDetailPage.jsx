import { Outlet } from "react-router-dom";
import cameraIcon from "../../../assets/images/camera-icon.png";
import tayCamConsole from "../../../assets/images/tay-cam-console.png";
import editIcon from "../../../assets/images/edit-icon.png";
import { Link } from "react-router-dom";
import "./GameDetailPage.css";

export default function GameDetailPage() {
    return (
        <div className="d-flex flex-column" style={{padding: "10px 20px"}}>
            <div className="d-flex flex-column align-items-center">
                <div className="game-detail-thumbnail">
                    <img src={tayCamConsole} alt="" className="game-detail-image" />
                    <button className="change-image-button d-flex justify-content-center align-items-center">
                        <img src={cameraIcon} alt="" />
                    </button>
                </div>
                <div className="game-detail-content d-flex justify-content-center">
                    Realtime Quiz 
                    <img src={editIcon} alt="" />
                </div>
            </div>
            
            <nav className="d-flex game-detail-navigation">
                <Link to="" style={{backgroundColor:"#FAFFAF"}} >Giới thiệu</Link>
                <Link to="instruction" style={{backgroundColor:"#96C9F4"}}>Hướng dẫn</Link>
                <Link to="items" style={{backgroundColor:"#3FA2F6"}}>Vật phẩm</Link>
            </nav>
            <div>
                <Outlet />
            </div>
        </div>
    )
}