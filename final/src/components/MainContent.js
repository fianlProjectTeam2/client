import React from "react";
import ChartCard from "./ChartCard";
import "../static/resources/css/MainContent.css";

function MainContent() {
  return (
    <main className="main-content">
      {Array.from({ length: 9 }).map((_, index) => (
        <ChartCard key={index} title={`Card ${index + 1}`} />
      ))}
    </main>
  );
}

export default MainContent;