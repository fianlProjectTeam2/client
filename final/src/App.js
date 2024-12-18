import "./App.css";
import "./static/resources/css/Styles.css";
import React, { useState, Suspense, lazy, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

const HomePage = lazy(() => import("./pages/HomePage"));

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <BrowserRouter>
      <Header />
      <div className={`layout ${isSidebarVisible ? "sidebar-visible" : ""}`}>
        <main className="content">
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        </main>

        <SideBar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
