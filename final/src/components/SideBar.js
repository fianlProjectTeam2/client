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
    const loginWindow = window.open(
      "http://localhost:8080/login/react",
      "LoginWindow",
      "width=600,height=300"
    );
  
    const timer = setInterval(() => {
      if (loginWindow.closed) {
        clearInterval(timer);
        fetchSession();
      }
    }, 500);
  };

  const handleLogout = async () => {
    try {
      const response = await AuthAPI.logout();
      window.location.reload();
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <>
      {session ? (
        <>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isVisible ? "X" : "MY"}
          </button>
          <button className="toggle-btn-2" onClick={handleLogout}>
            로그아웃
          </button>
        </>
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
