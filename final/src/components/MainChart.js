import React, { useEffect, useState } from "react";
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
import StockAPI from "../api/StockAPI";

Chart.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BoxPlotController,
  BoxAndWiskers
);

const MainChart = () => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({});
  const [data, setData] = useState([]);
  const [newRealData, setNewRealData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081");
    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      console.log(newData);
      setNewRealData((prevData) => [...prevData, newData]);
      setData((prevData) => [...prevData, newData]);
    };
    return () => socket.close();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await StockAPI.fetchChartData();
      const formattedData = response.data.map((item) => ({
        dealPrice: String(item.dealPrice).padStart(11, "0"),
        dealVolume: String(item.dealVolume).padStart(11, "0"),
        stockCode: item.stockCode,
        timestamp: item.timeCode,
        totalDealVolume: String(item.totalDealVolume).padStart(11, "0"),
      }));
      setData([...formattedData]);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      updateChartData(data);
    }
  }, [data]);

  const formatTime = (timestamp) => {
    const hours = timestamp.slice(0, 2);
    const minutes = timestamp.slice(2, 4);
    const seconds = timestamp.slice(4, 6);
    return `${hours}:${minutes}:${seconds}`;
  };

  const groupDataByTime = (data, priceRange) => {
    const grouped = {};

    data.forEach((d) => {
      let timestamp = d.timestamp;
      if (timestamp.startsWith("T")) {
        timestamp = timestamp.slice(1);
      }

      if (!timestamp || timestamp.length !== 12) {
        console.error("Invalid timestamp:", timestamp);
        return;
      }

      // 날짜와 시간 추출
      const year = `20${timestamp.slice(0, 2)}`; // "25" → "2025"
      const month = timestamp.slice(2, 4); // "01"
      const day = timestamp.slice(4, 6); // "13"
      const HH = timestamp.slice(6, 8); // "12"
      const mmRaw = timestamp.slice(8, 10); // "01"

      // 분을 20분 단위로 그룹화
      const mm = Math.floor(Number(mmRaw) / 20) * 20;
      const time = `${HH}:${mm.toString().padStart(2, "0")}`; // HH:MM 형식

      // 가격 그룹화
      if (!d.dealPrice || isNaN(Number(d.dealPrice))) {
        console.error("Invalid dealPrice:", d.dealPrice);
        return; // 잘못된 데이터 무시
      }
      const price = Math.floor(Number(d.dealPrice) / priceRange) * priceRange;

      // 그룹화
      if (!grouped[time]) grouped[time] = [];
      grouped[time].push(price);
    });
    return grouped;
  };

  const prepareBoxPlotData = (data, priceRange) => {
    const groupedData = groupDataByTime(data, priceRange);

    // 시간 라벨을 정렬
    const labels = Object.keys(groupedData).sort((a, b) => {
      const [aHours, aMinutes] = a.split(":").map(Number);
      const [bHours, bMinutes] = b.split(":").map(Number);

      // 시간(HH)을 기준으로 먼저 정렬하고, 분(MM)으로 정렬
      return aHours - bHours || aMinutes - bMinutes;
    });

    const boxPlotData = labels.map((time) => {
      const priceValues = groupedData[time].sort((a, b) => a - b);
      return [
        Math.min(...priceValues),
        priceValues[Math.floor(priceValues.length * 0.25)],
        priceValues[Math.floor(priceValues.length * 0.5)],
        priceValues[Math.floor(priceValues.length * 0.75)],
        Math.max(...priceValues),
      ];
    });

    return {
      labels,
      data: boxPlotData,
    };
  };

  const updateChartData = (newData) => {
    const { labels, data: boxPlotData } = prepareBoxPlotData(newData, 100);

    setChartData({
      labels,
      datasets: [
        {
          label: "가격 분포",
          backgroundColor: "rgba(0, 123, 255, 0.5)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 1,
          outlierColor: "#999999",
          data: boxPlotData,
        },
      ],
    });

    setChartOptions({
      responsive: true,
      scales: {
        y: {
          min: 53500,
          max: 55000,
          ticks: {
            stepSize: 100,
          },
        },
      },
    });
  };

  const formatNumber = (number) => {
    return parseInt(number, 10).toLocaleString();
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
        <h2>오늘의 시세</h2>
        {chartData ? (
          <ReactChart type="boxplot" data={chartData} options={chartOptions} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="stock-table">
        <h1>실시간 거래내역</h1>
        <h2>날짜 : {formatDate()}</h2>
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
            {newRealData.map((stock, index) => (
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
