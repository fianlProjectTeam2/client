import React, { useState } from "react";
import "../static/resources/css/Styles.css";

const SideBar = ({ isVisible, toggleSidebar, stocks }) => {
  return (
    <>
      {/* 사이드바 */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isVisible ? "마이페이지 닫기" : "마이페이지 열기"}
      </button>
      <aside className={`sidebar ${isVisible ? "visible" : ""}`}>
        <h3>관심 종목 TOP 10</h3>
        <ul>
          {stocks.map((stock) => (
            <li key={stock.id}>
              {stock.name} - {stock.price}원
              <span
                style={{
                  color: stock.change > 0 ? "green" : "red",
                }}
              >
                ({stock.change > 0 ? "+" : ""}
                {stock.change}%)
              </span>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default SideBar;