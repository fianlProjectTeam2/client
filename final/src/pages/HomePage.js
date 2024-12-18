import React, { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import StockCard from "../components/StockCard";
import NewsCard from "../components/NewsCard";

const HomePage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

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
      <Header />
      <div className={`layout ${isSidebarVisible ? "sidebar-visible" : ""}`}>
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
        </main>

        {/* 사이드바 */}
        <SideBar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} stocks={stocks} />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;