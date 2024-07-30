import "./styles.css";
import { useLocation } from "react-router-dom";
import userPlaceholder from "@assets/images/user-placeholder.svg";
import threeLine from "@assets/images/three-line.png";
import { HeaderTitleContext } from "@/services/state/headerTitleContext";
import { useContext } from "react";

export default function Header({ linkArray, showSidePanel }) {
  const { headerTitle, setHeaderTitle } = useContext(HeaderTitleContext);

  // const location = useLocation();
  // let locationName = "";
  // for (let item of linkArray) {
  //   if (
  //     location.pathname.indexOf("/", 1) === -1 ||
  //     location.pathname.slice(location.pathname.indexOf("/", 1) + 1) ===
  //       item.link
  //   ) {
  //     locationName = item.name;
  //     break;
  //   }
  // }

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
        <div className="user-placeholder">
          <img src={userPlaceholder} alt="user placeholder" />
        </div>
      </header>
    </div>
  );
}
