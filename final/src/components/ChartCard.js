import React from "react";
import "../static/resources/css/ChartCard.css";

function ChartCard({ title }) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div className="chart-placeholder">[Chart Here]</div>
    </div>
  );
}

export default ChartCard;
