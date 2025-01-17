import React, { useState, useEffect } from "react";
import "../static/resources/css/SideBar.css";
import AuthAPI from "../api/AuthAPI";
import PointAPI from "../api/PointAPI";
import StockAPI from "../api/StockAPI";
import AlertAPI from "../api/AlertAPI";

const SideBar = ({
  isVisible,
  toggleSidebar,
  userPoint,
  setUserPoint,
  setSelectedStock,
  setCurrentPage,
  myStock,
  setMyStock,
}) => {
  const [session, setSession] = useState(null);
  const [pointModal, setPointModal] = useState(false);
  const [chargeAmount, setChargeAmount] = useState("");
  const [myFinances, setMyFinances] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [isAdmin, setAdmin] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const handleConfirmAlert = async (alertNum) => {
    try {
      await checkAlert(alertNum);
      setAlerts((prevAlerts) =>
        prevAlerts.filter((alert) => alert.alertNum !== alertNum)
      );
    } catch (error) {
      console.error("Error confirming alert", error);
    }
  };

  const checkAlert = async(alertNum) =>{
    try{
      const response = await AlertAPI.checkAlert(alertNum);
      console.log(alertNum);
    }catch(error){
      console.error(error);
      console.log(alertNum);
    }
  }

  const fetchSessinIsAdmin = async () => {
    try {
      const response = await AuthAPI.sessionCheckIsAdmin();
      setAdmin(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAlertData = async () => {
    try {
      const response = await AlertAPI.fetchAlertList();
      setAlerts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePoint = () => {
    setPointModal(true);
  };

  const handleDetail = (data) => {
    const stock = {
      itmsNm: data.stockDTO.stockName,
      isinCd: data.stockDTO.stockCode,
    };
    setSelectedStock(stock);
    setCurrentPage("reload");
  };

  const fetchMyStock = async () => {
    try {
      const response = await StockAPI.fetchMyStock();
      setMyStock(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMyFinances = async () => {
    try {
      const response = await StockAPI.fetchMyFinances();
      setMyFinances(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPointData = async () => {
    fetchSession();
    try {
      const response = await PointAPI.fetchPointData();
      setUserPoint(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleChargePoints = async () => {
    fetchSession();
    if (chargeAmount) {
      try {
        const response = await PointAPI.ChargePointData(chargeAmount);
        alert(`포인트 ${chargeAmount}P가 충전되었습니다!`);
        fetchPointData();
        setChargeAmount("");
        setPointModal(false);
      } catch (error) {
        console.error("Error", error);
      }
    } else {
      alert("충전 금액을 입력해주세요!");
    }
  };

  const fetchSession = async () => {
    try {
      const response = await AuthAPI.sessionCheck();
      setSession(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleLoginClick = () => {
    const width = 600;
    const height = 500;

    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const left = (screenWidth - width) / 2;
    const top = (screenHeight - height) / 2;

    const loginWindow = window.open(
      "http://localhost:8080/login/react",
      "LoginWindow",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    const timer = setInterval(() => {
      if (loginWindow.closed) {
        clearInterval(timer);
        fetchSession();
      }
    }, 500);
  };

  const handleLogout = async () => {
    try {
      const response = await AuthAPI.logout();
      window.location.reload();
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      window.location.href = "http://localhost:8080/user1/home";
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchSession();
    fetchMyStock();
    fetchMyFinances();
    fetchAlertData();
    fetchSessinIsAdmin();
  }, []);

  useEffect(() => {
    fetchAlertData();
  },[alerts])

  useEffect(() => {
    fetchPointData();
    fetchSessinIsAdmin();
  }, [session]);

  useEffect(() => {
    fetchPointData();
    fetchMyStock();
    fetchMyFinances();
  }, [userPoint]);

  // 검색 필터링
  const filteredStocks = myStock
    .filter((data) => data.cumulativeStockDTO.countStock > 0) // 보유 주식 수 0 제외
    .filter((data) =>
      data.stockDTO.stockName.toLowerCase().includes(searchQuery.toLowerCase())
    ); // 검색어 적용

  return (
    <>
      {session ? (
        <>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isVisible ? "X" : "MY"}
          </button>
          <button className="toggle-btn-2" onClick={handleLogout}>
            로그아웃
          </button>
        </>
      ) : (
        <button className="toggle-btn" onClick={handleLoginClick}>
          로그인
        </button>
      )}
      <aside className={`sidebar ${isVisible ? "visible" : ""}`}>
        <div className="wallet-container">
          <div className="wallet-card">
            <h2 className="wallet-title">🔔알림</h2>
            {alerts.length > 0 ? (
              <ul>
                {alerts.map((alert, index) => (
                  <li key={index} className="alert-item">
                    <p>{alert.alertContents || "내용 없음"}</p>
                    <button
                      className="confirm-btn"
                      onClick={() => handleConfirmAlert(alert.alertNum)}
                    >
                      확인
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>새 알림이 없습니다.</p>
            )}
          </div>
          <div className="wallet-card">
            <h2 className="wallet-title">내 지갑</h2>
            <p className="wallet-points">
              보유중인 포인트: <span>{userPoint.toLocaleString()}</span> 원
            </p>
            {pointModal ? (
              <div className="charge-container">
                <input
                  type="number"
                  placeholder="충전할 금액 입력"
                  value={chargeAmount}
                  onChange={(e) => setChargeAmount(e.target.value)}
                  className="charge-input"
                />
                <div className="charge-actions">
                  <button onClick={handleChargePoints} className="charge-btn">
                    충전
                  </button>
                  <button
                    onClick={() => setPointModal(false)}
                    className="cancel-btn"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <button className="wallet-button" onClick={handlePoint}>
                포인트 충전
              </button>
            )}
          </div>
          <div className="stocks-card">
            <h2 className="stocks-title">소유중인 주식</h2>
            <h3 className="stocks-title">
              보유 재산 : {myFinances.toLocaleString()} 원
            </h3>
            <input
              type="text"
              placeholder="주식명을 검색하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <ul className="stocks-list">
              {filteredStocks.length > 0 ? (
                filteredStocks.map((data, index) => (
                  <li key={index} onClick={() => handleDetail(data)}>
                    {data.stockDTO.stockName} - 보유 주식 수:{" "}
                    {data.cumulativeStockDTO.countStock}
                  </li>
                ))
              ) : (
                <li>검색 결과가 없습니다.</li>
              )}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
