import { Route, Routes } from "react-router-dom";
import vouchersIcon from "@assets/images/quan-ly-voucher-icon.png";
import reportsIcon from "@assets/images/thong-ke-icon.png";
import eventsIcon from "@assets/images/quan-ly-su-kien-icon.png";

import VoucherManagement from "./vourcher-management";
import EventManagement from "./event-management";
import BrandReports from "./report";

import Layout from "@views/layout";

const Brand = () => {
  const brandPages = [
    {
      id: 1,
      name: "Quản lý sự kiện",
      image: eventsIcon,
      link: "",
    },
    {
      id: 2,
      name: "Quản lý voucher",
      image: vouchersIcon,
      link: "vouchermanagement",
    },
    { id: 3, name: "Báo cáo thống kê", image: reportsIcon, link: "report" },
  ];

  return (
    <>
      <Routes>
        <Route index element={<EventManagement />} />
        <Route path="vouchermanagement" element={<VoucherManagement />} />
        <Route path="report" element={<BrandReports />} />
      </Routes>
      <Layout linkArray={brandPages} />
    </>
  );
};

export default Brand;
