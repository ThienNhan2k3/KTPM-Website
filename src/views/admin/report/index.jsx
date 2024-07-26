import HorizontalCard from "../../../components/horizontal-card"
import tayCamConsole from "../../../assets/images/tay-cam-console.png";
import buildingIcon from "../../../assets/images/building-icon.png";
import { Link } from "react-router-dom";
import "./styles.css";

export default function AdminReports() {

  return (
    <div className="container">
      <div className="row g-5 justify-content-center">
        <div className="col-8 col-sm-6 col-xl-4 ">
          <Link to={"gamereport"}>
            <HorizontalCard number={2} desciption="Tổng số trò chơi" image={tayCamConsole} />
          </Link>
        </div>
        <div className="brand-figures-wrapper col-8 col-sm-6 col-xl-4 justify-content-center">
          <Link to={"brandreport"}>
            <HorizontalCard number={5} desciption="Tổng số thương hiệu" image={buildingIcon} />
          </Link>
        </div>
        <div className="user-figures-wrapper col-8 col-sm-6 col-xl-4 justify-content-center">
          <Link to={"userreport"}>
            <HorizontalCard number={25} desciption="Tổng số người chơi" image={buildingIcon} />
          </Link>
        </div>
      </div>
      
    </div>
  )
}
