import "./App.css";
import "./static/resources/css/Styles.css";
import React, { useState, Suspense, lazy, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

const HomePage = lazy(() => import("./pages/HomePage"));
const StockListPage = lazy(() => import("./pages/StockListPage"));
const StockChartDetailPage = lazy(() => import("./pages/StockChartDetailPage"));
const News = lazy(() => import("./pages/News"));

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState("loading");
  const [selectedStock, setSelectedStock] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onLogout={() => setCurrentPage("login")} />;
      case "stock":
        return (
          <StockListPage
            setCurrentPage={setCurrentPage}
            setSelectedStock={setSelectedStock}
            onLogout={() => setCurrentPage("login")}
          />
        );
      case "StockChartDetail":
        return (
          <StockChartDetailPage
            stock={selectedStock}
            toggleSidebar={toggleSidebar}
            isSidebarVisible={isSidebarVisible}
            onLogout={() => setCurrentPage("login")}
          />
        );
      case "news":
        return <News />;
      default:
        return <HomePage onLogout={() => setCurrentPage("login")} />;
    }
  };

  return (
    <BrowserRouter>
      <Header setCurrentPage={setCurrentPage} />
      <div className="layout">
        <main className="content">
          <Suspense fallback={<div>Loading...</div>}>
            {renderContent()}
          </Suspense>
        </main>

        <SideBar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
