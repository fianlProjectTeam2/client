import React, { useState } from "react";
import StockCard from "../components/StockCard";
import NewsCard from "../components/NewsCard";
import MainChart from "../components/MainChart";

const HomePage = (setCurrentPage) => {
  const stocks = [
    { id: 1, name: "코스피", price: "2,479.24", change: 0.9 },
    { id: 2, name: "코스닥", price: "690.72", change: -0.5 },
  ];

  const news = [
    {
      id: 1,
      title: "코스피 상승 출발...",
      time: "2시간",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "AI 제품 판매로 고용 확대...",
      time: "1시간",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="app">
      {/* 메인 콘텐츠 */}
      <main className="content">
        <div className="stocks">
          {stocks.map((stock) => (
            <StockCard
              key={stock.id}
              title={stock.name}
              value={stock.price}
              change={stock.change}
            />
          ))}
        </div>
        <div className="news">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              time={item.time}
              image={item.image}
            />
          ))}
        </div>
        <MainChart />
      </main>
    </div>
  );
};

export default HomePage;
