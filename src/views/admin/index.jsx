import { Route, Routes } from "react-router-dom";
import usersIcon from "@assets/images/quan-ly-nguoi-dung-icon.png";
import gamesIcon from "@assets/images/quan-ly-tro-choi-icon.png";
import reportsIcon from "@assets/images/thong-ke-icon.png";

import GameManagement from "./game-management";
import AdminReports from "./report";
import UserManagement from "./user-management";

import Layout from "@views/layout";

const Admin = () => {
  const adminPages = [
    {
      id: 1,
      name: "Quản lý người dùng",
      image: usersIcon,
      link: "",
    },
    {
      id: 2,
      name: "Quản lý trò chơi",
      image: gamesIcon,
      link: "gamemanagement",
    },
    { id: 3, name: "Báo cáo thống kê", image: reportsIcon, link: "report" },
  ];

  return (
    <>
      <Routes>
        <Route index element={<UserManagement />} />
        <Route path="gamemanagement" element={<GameManagement />} />
        <Route path="report" element={<AdminReports />} />
      </Routes>
      <Layout linkArray={adminPages} />
    </>
  );
};

export default Admin;
