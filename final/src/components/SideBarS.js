import React, { useState, useEffect } from "react";
import "../static/resources/css/SideBarS.css";
import AuthAPI from "../api/AuthAPI";
import PointAPI from "../api/PointAPI";
import StockAPI from "../api/StockAPI";
import AlertAPI from "../api/AlertAPI";

const SideBarS = ({
  userPoint,
  setUserPoint,
  setSelectedStock,
  setCurrentPage,
  myStock,
  setMyStock,
}) => {
  const [session, setSession] = useState(null);
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

  const checkAlert = async (alertNum) => {
    try {
      const response = await AlertAPI.checkAlert(alertNum);
      console.log(alertNum);
    } catch (error) {
      console.error(error);
      console.log(alertNum);
    }
  };

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

  const fetchMyStock = async () => {
    try {
      const response = await StockAPI.fetchMyStock();
      setMyStock(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPointData = async () => {
    try {
      const response = await PointAPI.fetchPointData();
      setUserPoint(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchPointData();
    fetchMyStock();
    fetchSessinIsAdmin();
  }, []);

  // 검색 필터링
  const filteredStocks = myStock
    .filter((data) => data.cumulativeStockDTO.countStock > 0) // 보유 주식 수 0 제외
    .filter((data) =>
      data.stockDTO.stockName.toLowerCase().includes(searchQuery.toLowerCase())
    ); // 검색어 적용

  return (
    <div className="table-container">
      <h2>내 정보</h2>

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

      <table className="info-table">
        <tbody>
          <tr>
            <th>보유 포인트</th>
            <td>{userPoint.toLocaleString()} 원</td>
          </tr>
          <tr>
            <th>총 자산</th>
            <td>{myFinances.toLocaleString()} 원</td>
          </tr>
        </tbody>
      </table>

      <h2>보유 주식</h2>
      <input
        type="text"
        placeholder="주식명을 검색하세요"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <table className="stocks-table">
        <thead>
          <tr>
            <th>주식명</th>
            <th>보유 수량</th>
          </tr>
        </thead>
        <tbody>
          {filteredStocks.length > 0 ? (
            filteredStocks.map((data, index) => (
              <tr key={index} onClick={() => setSelectedStock(data)}>
                <td>{data.stockDTO.stockName}</td>
                <td>{data.cumulativeStockDTO.countStock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">검색 결과가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SideBarS;
