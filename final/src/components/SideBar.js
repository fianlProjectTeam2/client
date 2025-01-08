import React, { useState, useEffect } from "react";
import "../static/resources/css/SideBar.css";
import AuthAPI from "../api/AuthAPI";
import PointAPI from "../api/PointAPI";

const SideBar = ({ isVisible, toggleSidebar, userPoint, setUserPoint }) => {
  const [session, setSession] = useState();
  const [pointModal, setPointModal] = useState(false);
  const [chargeAmount, setChargeAmount] = useState("");

  const handlePoint = () => {
    setPointModal(true);
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
    if(chargeAmount) {
      try {
        const response = await PointAPI.ChargePointData(chargeAmount);
        alert(`포인트 ${chargeAmount}P가 충전되었습니다!`);
        fetchPointData();
        setChargeAmount("");
        setPointModal(false);
      } catch (error) {
        console.error("Error", error);
      }
    } else{
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
    const loginWindow = window.open(
      "http://localhost:8080/login/react",
      "LoginWindow",
      "width=600,height=300"
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
    fetchSession();
  }, []);

  useEffect(() => {
    fetchPointData();
  }, [session]);

  useEffect(() => {
    fetchPointData();
  }, [userPoint]);

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
            <h2 className="wallet-title">내 지갑</h2>
            <p className="wallet-points">
              보유중인 포인트: <span>{userPoint}</span> P
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
            <ul className="stocks-list">
              <li>삼성전자 - 50주</li>
              <li>SK하이닉스 - 30주</li>
              <li>LG에너지솔루션 - 10주</li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
