import React from "react";
import "../static/resources/css/StockCard.css";

const StockCard = ({ title, value, change }) => {
  return (
    <div className="stock-card">
      <h3>{title}</h3>
      <p>{value}</p>
      <span style={{ color: change > 0 ? "red" : "blue" }}>
        {change > 0 ? "▲" : "▼"} {change}%
      </span>
    </div>
  );
};

export default StockCard;
