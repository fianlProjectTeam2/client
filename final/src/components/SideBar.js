import React, { useState, useEffect } from "react";
import "../static/resources/css/SideBar.css";
import AuthAPI from "../api/AuthAPI";

const SideBar = ({ isVisible, toggleSidebar }) => {
  const [session, setSession] = useState();

  const fetchSession = async () => {
    try {
      const response = await AuthAPI.sessionCheck();
      setSession(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleLoginClick = () => {
    window.open("http://localhost:8080/login", "LoginWindow", "width=600,height=300");
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <>
      {session ? (
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isVisible ? "X" : "마이페이지 열기"}
        </button>
      ) : (
        <button className="toggle-btn" onClick={handleLoginClick}>
          로그인
        </button>
      )}
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
