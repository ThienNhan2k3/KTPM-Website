import logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import "./SidePanel.css";
import leftArrow from "../../assets/images/left-arrow.png";

export default function SidePanel({linkArray, showSidePanel, handleShowSidePanel}) {
    return (
        <div className={`side-panel-container ${!showSidePanel ? "hide" : ""}`} >
            <div className="side-panel-header">
                <Link to="./">
                    <img src={logo} alt="" />
                </Link>
            </div>

            <div className="side-panel-body">
                <ul className="main-menu">
                    {linkArray.map(item => {
                        if (item.link === "") {
                            return (
                                <li key={item.id}>
                                    <NavLink to="" end className={({isActive}) => isActive ? "active" : ""}>
                                        <img src={item.image} alt="" />
                                        <span>{item.name}</span>
                                    </NavLink>
                                </li>
                            )
                        } else {
                            return (
                                <li key={item.id}>
                                    <NavLink to={item.link} className={({isActive}) => isActive ? "active" : ""}>
                                        <img src={item.image} alt="" />
                                        <span>{item.name}</span>
                                    </NavLink>
                                </li>
                            )
                        }
                        
                    })}
                    
                </ul>
                
            </div>
            <button onClick={handleShowSidePanel} className="close-button">
                <img src={leftArrow} alt="" />
            </button>
        </div>
    )
}