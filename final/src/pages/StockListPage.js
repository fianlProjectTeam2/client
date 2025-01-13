import React, { useState, useEffect } from "react";
import "../static/resources/css/StockListPage.css";
import ChartAPI from "../api/ChartAPI";
import StockAPI from "../api/StockAPI";

const StockListPage = ({ setCurrentPage, setSelectedStock }) => {
  const [chartData, setChartData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 데이터를 fetch하는 함수
  const fetchDefaultData = async () => {
    try {
      const response = await StockAPI.defaultStockData();
      const defaultData = response.data.map((item) => ({
        symbol: item.stockCode,
        itmsNm: item.stockName,
        mkp: item.openPrice,
      }));
      setInitialData(defaultData);
    } catch (error) {
      console.error("Error fetching default data:", error);
      setError(error.message);
    }
  };

  // 새로운 데이터를 fetch하는 함수
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await ChartAPI.fetchStockData();
      const responses = response?.data || [];
      const items = responses.flatMap((res) => res?.response?.body?.items?.item || []);

      const transformedData = items.map((item) => ({
        symbol: item.isinCd,
        basDt: item.basDt,
        clpr: parseFloat(item.clpr),
        fltRt: parseFloat(item.fltRt),
        hipr: item.hipr,
        isinCd: item.isinCd,
        itmsNm: item.itmsNm,
        lopr: item.lopr,
        lstgStCnt: item.lstgStCnt,
        mkp: item.mkp,
        mrktCtg: item.mrktCtg,
        mrktTotAmt: parseFloat(item.mrktTotAmt) / 1e8,
        srtnCd: item.srtnCd,
        trPrc: item.trPrc,
        trqu: parseInt(item.trqu, 10),
        analysis: "-",
        vs: parseFloat(item.vs),
      }));
      setChartData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트가 마운트되었을 때 초기 데이터를 가져옴
  useEffect(() => {
    fetchDefaultData();
  }, []);

  // 새로운 데이터를 fetch
  useEffect(() => {
    fetchData();
  }, []);

  const displayedStocks = isLoading ? initialData : chartData;

  const handleRowClick = (stock) => {
    setSelectedStock(stock);
    setCurrentPage("StockChartDetail");
  };

  return (
    <div className="pageContainer">
      <div className="titleSection">
        <h2 className="title">주식목록</h2>
      </div>

      {isLoading && (
        <div className="loadingMessage">
          세부 데이터를 가져오는 중입니다...
        </div>
      )}

      {!isLoading && error && <p style={{ color: "red" }}>Error: {error}</p>}

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>종목명</th>
            <th>현재가</th>
            {!isLoading && (
              <>
                <th>등락률</th>
                <th>시가총액</th>
                <th>거래량</th>
                <th>AI 분석점수</th>
                <th>전일 대비 시세</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {displayedStocks.map((stock, index) => (
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
              <td>{stock.mkp?.toLocaleString() || "-"}원</td>
              {!isLoading && (
                <>
                  <td style={{ color: stock.fltRt > 0 ? "red" : "blue" }}>
                    {stock.fltRt > 0 ? "+" : ""}
                    {stock.fltRt || "-"}%
                  </td>
                  <td>{(stock.mrktTotAmt || 0).toLocaleString()}억원</td>
                  <td>{(stock.lstgStCnt || 0).toLocaleString()}주</td>
                  <td>{stock.analysis || "-"}</td>
                  <td style={{ color: stock.vs > 0 ? "red" : "blue" }}>
                    {stock.vs > 0 ? "+" : ""}
                    {stock.vs || "-"}원
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockListPage;
