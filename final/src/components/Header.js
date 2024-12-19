import React from "react";
import "../static/resources/css/Header.css";

const Header = ({ setCurrentPage }) => {
  return (
    <header className="header">
      <div className="logo">StocKids</div>
      <nav>
        <ul>
          <li><a onClick={() => setCurrentPage("home")}>홈</a></li>
          <li>뉴스</li>
          <li><a onClick={() => setCurrentPage("stock")}>주식 골라보기</a></li>
          <li>게시판</li>
        </ul>
      </nav>
      <button className="login-btn"></button>
    </header>
  );
};

export default Header;