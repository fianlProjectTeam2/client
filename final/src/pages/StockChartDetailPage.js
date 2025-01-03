import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "../static/resources/css/StockChartDetailPage.css";
import ChartAPI from "../api/ChartAPI";
import AuthAPI from "../api/AuthAPI";

const StockChartDetailPage = ({ stock, toggleSidebar, isSidebarVisible }) => {
  const [candleChartOptions, setCandleChartOptions] = useState(null);
  const [barChartOptions, setBarChartOptions] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [dailys, setDailys] = useState([]);
  const [investorData, setInvestorData] = useState([]);

  const [orderType, setOrderType] = useState("일반 주문");
  const [priceType, setPriceType] = useState("지정가");
  const [price, setPrice] = useState(53900);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [stockName, setStockName] = useState();
  const [session, setSession] = useState();

  const fetchSession = async () => {
    try {
      const response = await AuthAPI.sessionCheck();
      setSession(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchData = async () => {
    try {
      // stock.itmsNm을 기반으로 데이터를 가져오기
      const response = await ChartAPI.fetchChartData(10, stock.itmsNm);
      const responses = response?.data || [];
      const items = responses.flatMap(
        (res) => res?.response?.body?.items?.item || []
      );
      console.log(items);
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

      setDailyData(transformedData.reverse());
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    if (stock?.itmsNm) {
      fetchData();
    }
  }, [stock]);

  useEffect(() => {
    fetchSession();
  }, []);

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleNumberChange = (number) => {
    const calculatedQuantity = quantity + number;
    setQuantity(calculatedQuantity);
  };

  useEffect(() => {
    if (!dailyData || dailyData.length === 0) return;

    const generateChartOptions = () => {
      // 캔들스틱 차트 데이터 생성
      const candleData = dailyData.map((item) => ({
        x: item.basDt,
        y: [item.mkp, item.hipr, item.lopr, item.clpr],
      }));

      const candleOptions = {
        series: [{ data: candleData }],
        options: {
          chart: { type: "candlestick", height: 350 },
          xaxis: { type: "category", labels: { rotate: -45 } },
          plotOptions: {
            candlestick: {
              colors: {
                upward: "#FF0000", // 빨간색 (상승)
                downward: "#0000FF", // 파란색 (하락)
              },
            },
          },
        },
      };

      // 바 차트 데이터 생성
      const barData = dailyData.map((item) => item.vs);
      const barCategories = dailyData.map((item) => item.basDt);

      const barOptions = {
        series: [{ name: "전일대비 등락", data: barData }],
        options: {
          chart: { type: "bar", height: 350 },
          xaxis: { categories: barCategories },
          tooltip: { enabled: true },
        },
      };

      // 일별 데이터 생성
      const daily = dailyData.map((item) => ({
        date: item.basDt,
        price: `${item.clpr.toLocaleString()}원`,
        rate: `${item.fltRt > 0 ? "+" : ""}${item.fltRt.toFixed(2)}%`,
        volume: `${item.trqu.toLocaleString()}주`,
        amount: `${(item.trPrc / 1e8).toFixed(2)}억원`,
      }));

      // 투자자 데이터: 더미 데이터로 설정
      const investors = [
        { date: "오늘", individual: "-", foreign: "-", institution: "0" },
      ];

      setCandleChartOptions(candleOptions);
      setBarChartOptions(barOptions);
      setDailys(daily);
      setInvestorData(investors);
    };

    generateChartOptions();
  }, [dailyData]);

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }, [isSidebarVisible]);

  if (!candleChartOptions || !barChartOptions) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div className="dashboard-container-wrapper">
      <div className="dashboard-container">
        <div className="charts-container">
          {/* 캔들스틱 차트 */}
          {candleChartOptions.series?.[0]?.data?.length > 0 && (
            <div className="chart-wrapper">
              <h3>시가,고가,저가,종가</h3>
              <ReactApexChart
                options={candleChartOptions.options}
                series={candleChartOptions.series}
                type="candlestick"
                height={350}
              />
            </div>
          )}

          {/* 바 차트 */}
          {barChartOptions.series?.[0]?.data?.length > 0 && (
            <div className="chart-wrapper">
              <h3>전일대비등락</h3>
              <ReactApexChart
                options={barChartOptions.options}
                series={barChartOptions.series}
                type="bar"
                height={350}
              />
            </div>
          )}
        </div>

        {/* 테이블 섹션 */}
        <div
          className={`table-section ${isSidebarVisible ? "sidebar-open" : ""}`}
        >
          <div className="table-wrapper">
            <h3>일별 시세</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>일자</th>
                  <th>종가</th>
                  <th>등락률</th>
                  <th>거래량</th>
                </tr>
              </thead>
              <tbody>
                {dailys.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.price}</td>
                    <td
                      style={{ color: row.rate.includes("+") ? "red" : "blue" }}
                    >
                      {row.rate}
                    </td>
                    <td>{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-wrapper">
            <div className="order-form">
              <h3>주문하기</h3>
              {/* 주문 유형 */}
              <div className="form-group">
                <label htmlFor="order-type">주문 유형</label>
                <select
                  id="order-type"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                >
                  <option value="구매">구매</option>
                  <option value="판매">판매</option>
                </select>
              </div>

              {/* 구매 가격 */}
              <div className="form-group">
                <label>구매 가격</label>
                <div className="price-type">
                  <button
                    className={`price-button ${
                      priceType === "지정가" ? "active" : ""
                    }`}
                    onClick={() => setPriceType("지정가")}
                  >
                    지정가
                  </button>
                </div>
                <div className="price-input">
                  <input
                    type="text"
                    value={`${price.toLocaleString()} 원`}
                    readOnly
                  />
                  <button onClick={() => setPrice((prev) => prev - 100)}>
                    −
                  </button>
                  <button onClick={() => setPrice((prev) => prev + 100)}>
                    +
                  </button>
                </div>
              </div>

              {/* 수량 */}
              <div className="form-group">
                <label>수량</label>
                <div className="quantity-input">
                  <input
                    type="text"
                    placeholder="수량 입력"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  <button onClick={() => handleQuantityChange("decrement")}>
                    −
                  </button>
                  <button onClick={() => handleQuantityChange("increment")}>
                    +
                  </button>
                </div>
                <div className="quantity-buttons">
                  <button onClick={() => handleNumberChange(10)}>+10</button>
                  <button onClick={() => handleNumberChange(25)}>+25</button>
                  <button onClick={() => handleNumberChange(50)}>+50</button>
                </div>
              </div>

              <hr />

              <div className="form-summary">
                <div className="summary-row">
                  <span>구매가능 금액</span>
                  <span>0원</span>
                </div>
                <div className="summary-row">
                  <span>총 주문 금액</span>
                  <span>{(quantity * price).toLocaleString()}원</span>
                </div>
              </div>

              {session ? (
                <button className="order-button-s">
                  구매하기
                </button>
              ) : (
                <button className="order-button-f" disabled>
                  로그인하고 구매하기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChartDetailPage;
