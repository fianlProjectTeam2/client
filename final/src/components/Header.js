import React from "react";
import "../static/resources/css/Styles.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">StocKids</div>
      <nav>
        <ul>
          <li>홈</li>
          <li>뉴스</li>
          <li>주식 골라보기</li>
          <li>게시판</li>
        </ul>
      </nav>
      <button className="login-btn"></button>
    </header>
  );
};

export default Header;