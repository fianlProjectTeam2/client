import React, { useEffect, useState } from "react";
import "../static/resources/css/ChartCard.css";
import ChartAPI from "../api/ChartAPI";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function ChartCard({ title }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await ChartAPI.fetchChartData();
      const items = response.data.response.body.items.item;

      const dates = items.map((item) => item.basDt);
      const closingPrices = items.map((item) => parseFloat(item.clpr));

      setChartData({
        labels: dates.reverse(),
        datasets: [
          {
            label: "종가 (Clpr)",
            data: closingPrices.reverse(),
            borderColor: "blue",
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            tension: 0.3,
          },
        ],
      });
    };

    fetchChartData();
  }, []);

  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div className="chart-placeholder">
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "삼성전자 주가 차트",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "날짜",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "종가 (단위: 원)",
                },
                ticks: {
                  stepSize: 100,
                },
                beginAtZero: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default ChartCard;
