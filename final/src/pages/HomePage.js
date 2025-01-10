import React, { useState, useEffect } from "react";
import StockCard from "../components/StockCard";
import NewsCard from "../components/NewsCard";
import MainChart from "../components/MainChart";
import "../static/resources/css/HomePage.css";

const HomePage = () => {
  const stocks = [
    { id: 1, name: "코스피", price: "2,479.24", change: 0.9 },
    { id: 2, name: "코스닥", price: "2,690.72", change: -0.5 },
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

  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setStockData((prevData) => [data, ...prevData].slice(0, 10));
    };
    return () => socket.close();
  }, []);

  return (
    <div className="app">
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
        <MainChart data={stockData} />
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
      </main>
    </div>
  );
};

export default HomePage;
