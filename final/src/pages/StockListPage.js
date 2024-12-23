import React, { useState, useEffect } from "react";
import "../static/resources/css/StockListPage.css";
import ChartAPI from "../api/ChartAPI";

const StockListPage = ({ setCurrentPage }) => {
  const [numOfRows, setNumOfRows] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await ChartAPI.fetchChartData(numOfRows);
      console.log(response.data);
      const responses = response?.data || [];
      const items = responses.flatMap((res) => res?.response?.body?.items?.item || []);

      const transformedData = items.map((item) => ({
        symbol: item.srtnCd, // 종목 코드
        name: item.itmsNm, // 종목 이름
        currentPrice: parseFloat(item.clpr), // 현재가
        changeRate: parseFloat(item.fltRt), // 등락률
        marketCap: parseFloat(item.mrktTotAmt) / 1e8, // 시가총액 (단위: 억 원)
        volume: parseInt(item.trqu, 10), // 거래량
        analysis: "-", // 분석 데이터는 없으므로 기본값
        priceChangeRate: parseFloat(item.vs), // 가격 변화량
      }));
      setChartData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stocks = [
    ...chartData,
  ];

  return (
    <div className="pageContainer">
      <div className="titleSection">
        <h2 className="title">주식목록</h2>
      </div>

      <div className="filterSection">
        <select className="selectBox">
          <option>주가 등락률 - 1주일 전 보다 0% 이상</option>
          <option>주가 등락률 - 1주일 전 보다 10% 이상</option>
        </select>
        <select className="selectBox">
          <option>주가 연속 상승 - 5일 이상 연속</option>
          <option>주가 연속 상승 - 3일 이상 연속</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>종목명</th>
            <th>현재가</th>
            <th>등락률</th>
            <th>시가총액</th>
            <th>거래량</th>
            <th>AI 분석점수</th>
            <th>전일 대비 시세</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr
              key={stock.symbol}
              style={{
                height: "60px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                backgroundColor: index % 2 === 0 ? "#f8f8f8" : "#ffffff",
              }}
              onClick={() => setCurrentPage("StockChartDetail")}
            >
              <td>{index + 1}</td>
              <td>{stock.name}</td>
              <td>{stock.currentPrice.toLocaleString()}원</td>
              <td style={{ color: stock.changeRate > 0 ? "red" : "blue" }}>
                {stock.changeRate > 0 ? "+" : ""}
                {stock.changeRate}%
              </td>
              <td>{stock.marketCap.toLocaleString()}억원</td>
              <td>{stock.volume.toLocaleString()}주</td>
              <td>{stock.analysis || "-"}</td>
              <td
                style={{ color: stock.priceChangeRate > 0 ? "red" : "blue" }}
              >
                {stock.priceChangeRate > 0 ? "+" : ""}
                {stock.priceChangeRate}원
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default StockListPage;
