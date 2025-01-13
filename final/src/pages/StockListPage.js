import React, { useState, useEffect } from "react";
import "../static/resources/css/StockListPage.css";
import ChartAPI from "../api/ChartAPI";
import StockAPI from "../api/StockAPI";
import NewsAPI from "../api/NewsAPI";

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

  // AI 분석 점수 데이터를 fetch하고 회사별 평균 점수 계산
  const fetchScoreData = async () => {
    try {
      const response = await NewsAPI.fetchPredicScore();
      const scores = response.data;

      // 회사별 평균 점수 계산
      const companyScores = scores.reduce((acc, item) => {
        const { companyName, articlePredictionValue } = item;

        if (!acc[companyName]) {
          acc[companyName] = { total: 0, count: 0 };
        }

        acc[companyName].total += articlePredictionValue;
        acc[companyName].count += 1;

        return acc;
      }, {});

      // 평균 점수 계산
      const averageScores = Object.entries(companyScores).reduce(
        (result, [companyName, { total, count }]) => {
          result[companyName] = total / count;
          return result;
        },
        {}
      );

      return averageScores;
    } catch (error) {
      console.error("Error fetching AI scores:", error);
      return {};
    }
  };

  // 주식 데이터를 fetch하고 AI 점수 병합
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const aiScores = await fetchScoreData(); // AI 점수 가져오기
      const response = await ChartAPI.fetchStockData();
      const responses = response?.data || [];
      const items = responses.flatMap(
        (res) => res?.response?.body?.items?.item || []
      );

      const transformedData = items.map((item) => {
        const companyName = item.itmsNm; // 회사명
        const aiScore = aiScores[companyName] || "-"; // AI 점수 없으면 '-'

        return {
          symbol: item.isinCd,
          basDt: item.basDt,
          clpr: parseFloat(item.clpr),
          fltRt: parseFloat(item.fltRt),
          hipr: item.hipr,
          isinCd: item.isinCd,
          itmsNm: companyName,
          lopr: item.lopr,
          lstgStCnt: item.lstgStCnt,
          mkp: item.mkp,
          mrktCtg: item.mrktCtg,
          mrktTotAmt: parseFloat(item.mrktTotAmt) / 1e8,
          srtnCd: item.srtnCd,
          trPrc: item.trPrc,
          trqu: parseInt(item.trqu, 10),
          analysis: aiScore, // AI 점수 추가
          vs: parseFloat(item.vs),
        };
      });

      setChartData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultData();
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
        <div className="loadingMessage">세부 데이터를 가져오는 중입니다...</div>
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
                  <td>
                    {stock.analysis !== "-" ? stock.analysis.toFixed(2) : "-"}
                  </td>
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
