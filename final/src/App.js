import "./App.css";
import React, { useState, Suspense, lazy, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";

const Main = lazy(() => import("./pages/Main"));

function App() {
  const [currentPage, setCurrentPage] = useState("loading");

  const appStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  };

  const layoutStyle = {
    display: "flex",
    flex: 1,
  };

  const renderContent = () => {
    switch (currentPage) {
      case "main":
        return <Main setCurrentPage={setCurrentPage} />;
      default:
        return <div>Loading...</div>;
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      setCurrentPage("main");
    };
    checkSession();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <HomePage />
      </div>
    </BrowserRouter>
  );
}

export default App;
