import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  BoxPlotController,
  BoxAndWiskers,
} from "@sgratzl/chartjs-chart-boxplot";
import { Chart as ReactChart } from "react-chartjs-2";
import "../static/resources/css/MainChart.css";

// Chart.js 플러그인 등록
Chart.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BoxPlotController,
  BoxAndWiskers
);

const MainChart = ({ data }) => {
  // 시간을 `HH:mm:ss` 형식으로 변환
  const formatTime = (timestamp) => {
    const hours = timestamp.slice(0, 2);
    const minutes = timestamp.slice(2, 4);
    const seconds = timestamp.slice(4, 6);
    return `${hours}:${minutes}:${seconds}`;
  };

  // 데이터 그룹화 함수 (100원 단위로 가격 그룹화)
  const groupDataByTime = (data, priceRange) => {
    const grouped = {};

    data.forEach((d) => {
      const time = formatTime(d.timestamp); // x축 시간 (HH:mm:ss)
      const price =
        Math.floor(parseInt(d.dealPrice, 10) / priceRange) * priceRange; // y축 가격 그룹화 (100원 단위)
      if (!grouped[time]) grouped[time] = [];
      grouped[time].push(price);
    });

    return grouped;
  };

  // 박스플롯 데이터 생성
  const prepareBoxPlotData = (data, priceRange) => {
    const groupedData = groupDataByTime(data, priceRange);
    const labels = Object.keys(groupedData); // 시간 값 (x축 라벨)

    const boxPlotData = labels.map((time) => {
      const priceValues = groupedData[time].sort((a, b) => a - b); // 정렬
      return [
        Math.min(...priceValues), // 최소값
        priceValues[Math.floor(priceValues.length * 0.25)], // 1사분위수
        priceValues[Math.floor(priceValues.length * 0.5)], // 중앙값
        priceValues[Math.floor(priceValues.length * 0.75)], // 3사분위수
        Math.max(...priceValues), // 최대값
      ];
    });

    return {
      labels, // x축 라벨 (시간)
      data: boxPlotData, // y축 데이터 (박스플롯)
    };
  };

  // 박스플롯 데이터 준비
  const { labels, data: boxPlotData } = prepareBoxPlotData(data, 100);

  // Chart.js 데이터 구성
  const chartData = {
    labels: labels, // x축 시간 라벨
    datasets: [
      {
        label: "100원 단위 가격 분포",
        backgroundColor: "rgba(0, 123, 255, 0.5)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
        outlierColor: "#999999", // 이상치 색상
        data: boxPlotData,
      },
    ],
  };

  // Chart.js 옵션 설정
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "시간별 100원 단위 실시간 박스플롯 차트",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "시간",
        },
      },
      y: {
        title: {
          display: true,
          text: "가격 (100원 단위)",
        },
        min: 55000, // y축 최소값
        max: 56000, // y축 최대값
        ticks: {
          stepSize: 100, // y축 100원 단위 간격 설정
        },
      },
    },
  };

  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  const formatDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="MainChart-Container">
      <div className="main-chart">
        <h2>박스플롯 차트</h2>
        {data && data.length > 0 ? (
          <ReactChart type="boxplot" data={chartData} options={chartOptions} />
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div className="stock-table">
        <h1>Real-time Stock Data</h1>
        <h2>날짜 : {formatDate()}</h2>
        <h2>삼성전자 누적 거래량</h2>
        <table className="stock-table">
          <thead>
            <tr>
              <th>거래시간</th>
              <th>주식코드</th>
              <th>거래금액</th>
              <th>거래량</th>
            </tr>
          </thead>
          <tbody>
            {data.map((stock, index) => (
              <tr key={index}>
                <td>{formatTime(stock.timestamp)}</td>
                <td>{stock.stockCode}</td>
                <td>{formatNumber(stock.dealPrice)}</td>
                <td>{formatNumber(stock.dealVolume)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainChart;
