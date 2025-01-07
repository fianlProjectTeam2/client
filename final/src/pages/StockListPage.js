import React, { useState, useEffect } from "react";
import "../static/resources/css/StockListPage.css";
import ChartAPI from "../api/ChartAPI";

const StockListPage = ({ setCurrentPage, setSelectedStock }) => {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await ChartAPI.fetchStockData();
      console.log(response.data);
      const responses = response?.data || [];
      const items = responses.flatMap((res) => res?.response?.body?.items?.item || []);

      const transformedData = items.map((item) => ({
        symbol: item.isinCd, // 종목 코드
        basDt: item.basDt, // 기준일자
        clpr: parseFloat(item.clpr), // 하루 최종가격
        fltRt: parseFloat(item.fltRt), // 등락률 
        hipr: item.hipr, // 고가
        isinCd: item.isinCd, // 종목코드
        itmsNm: item.itmsNm, // 종목 이름
        lopr: item.lopr, // 저가
        lstgStCnt: item.lstgStCnt, // 종목 상장주식수
        mkp: item.mkp, // 시가
        mrktCtg: item.mrktCtg, // 시장구분
        mrktTotAmt: parseFloat(item.mrktTotAmt) / 1e8, // 시가총액
        srtnCd: item.srtnCd, // 단축코드
        trPrc: item.trPrc, // 거래대금 총 체결 금액
        trqu: parseInt(item.trqu, 10), // 거래량 하루 거래량
        analysis: "-", // 분석 데이터는 없으므로 기본값
        vs: parseFloat(item.vs), // 대비, 전일 대비 등락
      }));
      setChartData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stocks = [...chartData];

  const handleRowClick = (stock) => {
    setSelectedStock(stock); 
    setCurrentPage("StockChartDetail");
  };

  return (
    <div className="pageContainer">
      <div className="titleSection">
        <h2 className="title">주식목록</h2>
      </div>

      {/* 로딩 중 메시지 */}
      {isLoading && (
        <div className="loadingMessage">
          데이터를 가져오는 중입니다...
        </div>
      )}

      {!isLoading && (
        <>
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
                  onClick={() => handleRowClick(stock)}
                >
                  <td>{index + 1}</td>
                  <td>{stock.itmsNm}</td>
                  <td>{stock.mkp.toLocaleString()}원</td>
                  <td style={{ color: stock.fltRt > 0 ? "red" : "blue" }}>
                    {stock.fltRt > 0 ? "+" : ""}
                    {stock.fltRt}%
                  </td>
                  <td>{stock.mrktTotAmt.toLocaleString()}억원</td>
                  <td>{stock.lstgStCnt.toLocaleString()}주</td>
                  <td>{stock.analysis || "-"}</td>
                  <td style={{ color: stock.vs > 0 ? "red" : "blue" }}>
                    {stock.vs > 0 ? "+" : ""}
                    {stock.vs}원
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default StockListPage;
