import React from "react";
import "../static/resources/css/TopBar.css";

function TopBar() {
  return (
    <nav className="top-bar">
      <h1>Dashboard</h1>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default TopBar;