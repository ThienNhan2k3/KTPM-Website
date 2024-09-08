import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./views/login-screen";
import SignUp from "./views/signup-screen";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import playerManagementIcon from "@assets/images/quan-ly-nguoi-choi-icon.png";
import brandManagementIcon from "@assets/images/quan-ly-thuong-hieu-icon.png";
import gameManagementIcon from "@assets/images/quan-ly-tro-choi-icon.png";
import reportsIcon from "@assets/images/thong-ke-icon.png";
import voucherManagementIcon from "@assets/images/quan-ly-voucher-icon.png";
import EventManagementIcon from "@assets/images/quan-ly-su-kien-icon.png";

import VoucherManagement from "@views/brand/voucher-management";
import BrandReports from "@views/brand/report";
import EventManagement from "@views/brand/event-management";
import ProfileBrand from "@views/brand/profile-brand";

import GameManagement from "@views/admin/game-management";
import GameDetail from "@views/admin/game-management/game-detail";
import GameIntroduce from "@views/admin/game-management/game-introduce";
import AdminReports from "@views/admin/report";
import GameItems from "@views/admin/game-management/game-items";
import ProfileAdmin from "@views/admin/profile-admin";
import BrandManagement from "@views/admin/brand-management";
import PlayerManagement from "@views/admin/player-management";
import AdminUserReports from "@views/admin/report/user-report";
import AdminGameReports from "@views/admin/report/game-report";
import AdminBrandReports from "@views/admin/report/brand-report";

import Layout from "@views/layout";
import PageNotFound from "./views/404";
import ChangePassword from "./views/chang-password";

import HeaderTitleProvider from "./services/providers/HeaderTitleProvider";
import PrivateRoutes, {
  loader as privateRoutesLoader,
} from "./views/PrivateRoutes";

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
    { id: 1, name: "Quản lý sự kiện", image: EventManagementIcon, link: "" },
    {
      id: 2,
      name: "Quản lý mã khuyến mãi",
      image: voucherManagementIcon,
      link: "vouchermanagement",
    },
    { id: 3, name: "Báo cáo thống kê", image: reportsIcon, link: "report" },
  ];

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          element={<PrivateRoutes />}
          loader={privateRoutesLoader}
          errorElement={<h3>You don&apos;t have a permision</h3>}
        >
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
            <Route path="profile" element={<ProfileAdmin />} />
            <Route path="changepassword" element={<ChangePassword />} />
          </Route>

          <Route path="/brand" element={<Layout linkArray={brandPages} />}>
            <Route index element={<EventManagement />} />
            <Route path="vouchermanagement" element={<VoucherManagement />} />
            <Route path="report" element={<BrandReports />} />
            <Route path="profile" element={<ProfileBrand />} />
            <Route path="changepassword" element={<ChangePassword />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </>,
    ),
  );

  return (
    <HeaderTitleProvider>
      <RouterProvider router={router} />
    </HeaderTitleProvider>
  );
}

export default App;
