import React from 'react';
import Login from './pages/login screen/Login';
import { Stack, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import userManagementIcon from "./assets/images/quan-ly-nguoi-dung-icon.png"
import gameManagementIcon from "./assets/images/quan-ly-tro-choi-icon.png"
import reportsIcon from "./assets/images/thong-ke-icon.png"
import voucherManagementIcon from "./assets/images/quan-ly-voucher-icon.png"
import GameManagementPage from './pages/Admin/GameManagementPage';
import UserManagementPage from './pages/Admin/UserManagementPage';
import AdminReportsPage from './pages/Admin/AdminReportsPage';
import VoucherManagementPage from './pages/Brand/VoucherManagementPage';
import BrandReportsPage from './pages/Brand/BrandReportsPage';
import EventManagementPage from './pages/Brand/EventManagementPage';


function App() {
  const adminPages = [
    {id: 1, name: "Quản lý người dùng", image: userManagementIcon, link: ""},
    {id: 2, name: "Quản lý trò chơi", image: gameManagementIcon, link: "gamemanagement"},
    {id: 3, name: "Báo cáo thống kê", image: reportsIcon, link: "report"},
  ]

  const brandPages = [
    {id: 1, name: "Quản lý sự kiện", image: voucherManagementIcon, link: ""},
    {id: 2, name: "Quản lý voucher", image: voucherManagementIcon, link: "vouchermanagement"},
    {id: 3, name: "Báo cáo thống kê", image: reportsIcon, link: "report"},
  ]

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path="/admin" element={<Layout linkArray={adminPages} />}>
            <Route index element={<UserManagementPage />} />
            <Route path="gamemanagement" element={<GameManagementPage />} />
            <Route path="report" element={<AdminReportsPage />} />
        </Route>
        <Route path="/brand" element={<Layout linkArray={brandPages} />}>
            <Route index element={<EventManagementPage />} />
            <Route path="vouchermanagement" element={<VoucherManagementPage />} />
            <Route path="report" element={<BrandReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
