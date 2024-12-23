import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "../static/resources/css/StockChartDetailPage.css";

const StockChartDetailPage = ({ toggleSidebar, isSidebarVisible }) => {
  const [candleChartOptions, setCandleChartOptions] = useState(null);
  const [barChartOptions, setBarChartOptions] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [investorData, setInvestorData] = useState([]);

  const [orderType, setOrderType] = useState("일반 주문");
  const [priceType, setPriceType] = useState("지정가");
  const [price, setPrice] = useState(53900);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handlePercentageChange = (percentage) => {
    const calculatedQuantity = Math.floor(totalAmount * (percentage / 100));
    setQuantity(calculatedQuantity);
  };

  useEffect(() => {
    const candleOptions = {
      series: [
        {
          data: [
            { x: "12월 11일", y: [7200, 7400, 4700, 4805] },
            { x: "12월 12일", y: [4800, 5000, 4600, 4895] },
            { x: "12월 13일", y: [4900, 5000, 4850, 4995] },
            { x: "12월 14일", y: [4950, 5700, 4900, 5700] },
            { x: "12월 15일", y: [5700, 6700, 5600, 6650] },
            { x: "12월 18일", y: [6650, 6700, 6600, 6660] },
          ],
        },
      ],
      options: {
        chart: { type: "candlestick", height: 350 },
        xaxis: { type: "category" },
      },
    };

    const barOptions = {
      series: [
        {
          name: "거래량",
          data: [10074683, 2043396, 542817, 42239, 34138, 37000, 80000],
        },
      ],
      options: {
        chart: { type: "bar", height: 350 },
        xaxis: {
          categories: [
            "12월 11일",
            "12월 12일",
            "12월 13일",
            "12월 14일",
            "12월 15일",
            "12월 18일",
            "12월 19일",
          ],
        },
        tooltip: { enabled: true },
      },
    };

    const daily = [
      {
        date: "12월 19일",
        price: "6,660원",
        rate: "+0.15%",
        volume: "1,280,117주",
        amount: "85억원",
      },
      {
        date: "12월 18일",
        price: "6,650원",
        rate: "+16.66%",
        volume: "10,074,683주",
        amount: "716억원",
      },
      {
        date: "12월 17일",
        price: "5,700원",
        rate: "+14.11%",
        volume: "2,542,817주",
        amount: "142억원",
      },
      {
        date: "12월 16일",
        price: "4,995원",
        rate: "+2.04%",
        volume: "42,239주",
        amount: "2억원",
      },
      {
        date: "12월 15일",
        price: "4,895원",
        rate: "+1.87%",
        volume: "34,138주",
        amount: "1.7억원",
      },
    ];

    const investors = [
      { date: "오늘", individual: "-", foreign: "-11,720", institution: "0" },
      {
        date: "12월 18일",
        individual: "+4,756",
        foreign: "-4,881",
        institution: "+159",
      },
      {
        date: "12월 17일",
        individual: "+131,663",
        foreign: "-131,317",
        institution: "+182",
      },
      {
        date: "12월 16일",
        individual: "+8,260",
        foreign: "-8,846",
        institution: "+62",
      },
    ];

    setCandleChartOptions(candleOptions);
    setBarChartOptions(barOptions);
    setDailyData(daily);
    setInvestorData(investors);
  }, []);

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
              <h3>캔들스틱 차트</h3>
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
              <h3>바 차트</h3>
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
                  <th>거래대금</th>
                </tr>
              </thead>
              <tbody>
                {dailyData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.price}</td>
                    <td
                      style={{ color: row.rate.includes("+") ? "red" : "blue" }}
                    >
                      {row.rate}
                    </td>
                    <td>{row.volume}</td>
                    <td>{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-wrapper">
            <h3>투자자 매매 동향</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>일자</th>
                  <th>개인</th>
                  <th>외국인</th>
                  <th>기관</th>
                </tr>
              </thead>
              <tbody>
                {investorData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.individual}</td>
                    <td
                      style={{
                        color: row.foreign.includes("-") ? "blue" : "red",
                      }}
                    >
                      {row.foreign}
                    </td>
                    <td>{row.institution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
            <option value="일반 주문">일반 주문</option>
            <option value="시장가 주문">시장가 주문</option>
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
            <button
              className={`price-button ${
                priceType === "시장가" ? "active" : ""
              }`}
              onClick={() => setPriceType("시장가")}
            >
              시장가
            </button>
          </div>
          <div className="price-input">
            <input
              type="text"
              value={`${price.toLocaleString()} 원`}
              readOnly
            />
            <button onClick={() => setPrice((prev) => prev - 100)}>−</button>
            <button onClick={() => setPrice((prev) => prev + 100)}>+</button>
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
            <button onClick={() => handleQuantityChange("decrement")}>−</button>
            <button onClick={() => handleQuantityChange("increment")}>+</button>
          </div>
          <div className="quantity-buttons">
            <button onClick={() => handlePercentageChange(10)}>10%</button>
            <button onClick={() => handlePercentageChange(25)}>25%</button>
            <button onClick={() => handlePercentageChange(50)}>50%</button>
            <button onClick={() => handlePercentageChange(100)}>최대</button>
          </div>
        </div>

        <hr />

        {/* 금액 */}
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

        {/* 버튼 */}
        <button className="order-button" disabled>
          로그인하고 구매하기
        </button>
      </div>
    </div>
  );
};

export default StockChartDetailPage;
