import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./views/login-screen";
import SignUp from "./views/signup-screen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import playerManagementIcon from "@assets/images/quan-ly-nguoi-choi-icon.png";
import brandManagementIcon from "@assets/images/quan-ly-thuong-hieu-icon.png";
import gameManagementIcon from "@assets/images/quan-ly-tro-choi-icon.png";
import reportsIcon from "@assets/images/thong-ke-icon.png";
import voucherManagementIcon from "@assets/images/quan-ly-voucher-icon.png";

import GameManagement from "@views/admin/game-management";
import GameDetail from "@views/admin/game-management/game-detail";
import GameIntroduce from "@views/admin/game-management/game-introduce";
import AdminReports from "@views/admin/report";
import VoucherManagement from "@views/brand/voucher-management";
import BrandReports from "@views/brand/report";
import EventManagement from "@views/brand/event-management";
import GameItems from "@views/admin/game-management/game-items";

import BrandManagement from "@views/admin/brand-management";
import PlayerManagement from "@views/admin/player-management";
import AdminUserReports from "@views/admin/report/user-report";
import AdminGameReports from "@views/admin/report/game-report";
import AdminBrandReports from "@views/admin/report/brand-report";
import Layout from "@views/layout";
import HeaderTitleProvider from "./services/providers/HeaderTitleProvider";

function App() {
  const adminPages = [
    {
      id: 1,
      name: "Quản lý thương hiệu",
      image: brandManagementIcon,
      link: "",
    },
    {
      id: 2,
      name: "Quản lý người dùng",
      image: playerManagementIcon,
      link: "playermanagement",
    },
    {
      id: 3,
      name: "Quản lý trò chơi",
      image: gameManagementIcon,
      link: "gamemanagement",
    },
    { id: 4, name: "Báo cáo thống kê", image: reportsIcon, link: "report" },
  ];

  const brandPages = [
    { id: 1, name: "Quản lý sự kiện", image: voucherManagementIcon, link: "" },
    {
      id: 2,
      name: "Quản lý mã khuyến mãi",
      image: voucherManagementIcon,
      link: "vouchermanagement",
    },
    { id: 3, name: "Báo cáo thống kê", image: reportsIcon, link: "report" },
  ];

  return (
    <HeaderTitleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Layout linkArray={adminPages} />}>
            <Route index element={<BrandManagement />} />
            <Route path="playermanagement" element={<PlayerManagement />} />
            <Route path="gamemanagement" element={<GameManagement />} />
            <Route
              path="gamemanagement/gamedetail/:id"
              element={<GameDetail />}
            >
              <Route index element={<GameIntroduce />} />
              <Route path="items" element={<GameItems />} />
            </Route>
            <Route path="report" element={<AdminReports />} />
            <Route path="report/userreport" element={<AdminUserReports />} />
            <Route path="report/gamereport" element={<AdminGameReports />} />
            <Route path="report/brandreport" element={<AdminBrandReports />} />
          </Route>
          <Route path="/brand" element={<Layout linkArray={brandPages} />}>
            <Route index element={<EventManagement />} />
            <Route path="vouchermanagement" element={<VoucherManagement />} />
            <Route path="report" element={<BrandReports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HeaderTitleProvider>
  );
}

export default App;
