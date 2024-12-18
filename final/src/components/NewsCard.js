import React from "react";
import "../static/resources/css/Styles.css";

const NewsCard = ({ title, time, image }) => {
  return (
    <div className="news-card">
      <div className="news-content">
        <h4>{title}</h4>
        <p>{time} 전</p>
      </div>
    </div>
  );
};

export default NewsCard;
