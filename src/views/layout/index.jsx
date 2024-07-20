import { Outlet } from "react-router-dom";
import { useState, Suspense } from "react";
import Header from "@/components/header";
import SidePanel from "@/components/side-panel";
import "./styles.css";

export default function Layout({ linkArray }) {
  const [showSidePanel, setShowSidePanel] = useState(true);
  function handleShowSidePanel() {
    setShowSidePanel(!showSidePanel);
  }

  return (
    <>
      <div className="seller-layout-navigation">
        <Header
          linkArray={linkArray}
          handleShowSidePanel={handleShowSidePanel}
          showSidePanel={showSidePanel}
        />
        <SidePanel
          linkArray={linkArray}
          handleShowSidePanel={handleShowSidePanel}
          showSidePanel={showSidePanel}
        />
      </div>
      <div className={`seller-layout-container ${showSidePanel ? "wide" : ""}`}>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
