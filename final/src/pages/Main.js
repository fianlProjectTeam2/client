import React from "react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/SideBar";
import MainContent from "../components/MainContent";

function Main() {
  const appStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  };

  const layoutStyle = {
    display: "flex",
    flex: 1,
  };

  return (
    <div style={appStyle}>
      <TopBar />
      <div style={layoutStyle}>
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

export default Main;
