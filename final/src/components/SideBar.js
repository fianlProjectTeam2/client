import React, { useState } from "react";
import "../static/resources/css/SideBar.css";

const SideBar = ({ isVisible, toggleSidebar }) => {
  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isVisible ? "마이페이지 닫기" : "마이페이지 열기"}
      </button>
      <aside className={`sidebar ${isVisible ? "visible" : ""}`}>
        <h3>관심 종목 TOP 10</h3>
        <ul>
          <li>코스피</li>
          <li>코스닥</li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
