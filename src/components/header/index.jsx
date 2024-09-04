import "./styles.css";
import { Link } from "react-router-dom";
import userPlaceholder from "@assets/images/user-placeholder.svg";
import threeLine from "@assets/images/three-line.png";
import { HeaderTitleContext } from "@/services/state/headerTitleContext";
import { useContext } from "react";

import Dropdown from 'react-bootstrap/Dropdown';
import { getLogout } from "@/services/api/authApi";

import { useNavigate } from "react-router-dom";

export default function Header({ linkArray, showSidePanel }) {
  const { headerTitle, setHeaderTitle } = useContext(HeaderTitleContext);
  const navigate = useNavigate();

  return (
    <div className="header-bar">
      <header
        className={`seller-header-container ${!showSidePanel ? "wide" : ""}`}
      >
        <div className="seller-header-title">
          <div className="three-line">
            <img src={threeLine} alt="" />
          </div>
          <h3>{headerTitle}</h3>
        </div>
        {/* <div class="dropdown">
          <img 
            width="50px" 
            height="50px" 
            src={userPlaceholder} 
            alt="user placeholder"
            role="button"
            style={{cursor: "pointer"}} 
            id="dropdownMenuButton" 
            data-toggle="dropdown" 
            aria-haspopup="true" 
            aria-expanded="false" />
         
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link class="dropdown-item" to="/logout">Đăng xuất</Link>
            <Link class="dropdown-item" to="#">Thông tin cá nhân</Link>
            
          </div>
        </div> */}
      <Dropdown>
      <Dropdown.Toggle  
        id="dropdown-basic" 
        style={{
          backgroundColor: "transparent", 
          border: "none", 
          padding: "0px",
          height: "40px",
          width: "40px",
        }}
      >
        <img 
          src={userPlaceholder} 
          alt="user placeholder"
          />
      </Dropdown.Toggle>
      
      

      <Dropdown.Menu>
        <div class="dropdown-item" onClick={async () => {
          const data = await getLogout();
          if (data.code == 200) {
            navigate("/");
          }
        }}>Đăng xuất</div>
        <Link class="dropdown-item" to="#">Thông tin cá nhân</Link>
      </Dropdown.Menu>
    </Dropdown>
        
      
      </header>
    </div>
  );
}
