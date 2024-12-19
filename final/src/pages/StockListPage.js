import React from "react";
import "../static/resources/css/StockListPage.css";

const StockListPage = ({ setCurrentPage }) => {
  const stocks = [
    {
      symbol: "AAPL",
      name: "그린케미칼",
      currentPrice: 6610,
      changeRate: -0.6,
      marketCap: 1596,
      volume: 10074683,
      analysis: "-",
      priceChangeRate: 40.2,
    },
    {
      symbol: "GOOGL",
      name: "퀄리티반도체",
      currentPrice: 10100,
      changeRate: 4.8,
      marketCap: 1340.8,
      volume: 2043396,
      analysis: "-",
      priceChangeRate: 37.7,
    },
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
            <th>주가 등락률</th>
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
              <td>{stock.currentPrice}원</td>
              <td style={{ color: stock.changeRate > 0 ? "red" : "blue" }}>
                {stock.changeRate > 0 ? "+" : ""}
                {stock.changeRate}%
              </td>
              <td>{stock.marketCap}억원</td>
              <td>{stock.volume.toLocaleString()}주</td>
              <td>{stock.analysis || "-"}</td>
              <td style={{ color: stock.priceChangeRate > 0 ? "red" : "blue" }}>
                {stock.priceChangeRate > 0 ? "+" : ""}
                {stock.priceChangeRate}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockListPage;
