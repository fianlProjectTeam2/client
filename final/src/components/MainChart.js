import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MainChart = () => {
  const data = {
    labels: ["월", "화", "수", "목", "금"],
    datasets: [
      {
        label: "코스피 지수",
        data: [2400, 2450, 2430, 2480, 2500],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "코스닥 지수",
        data: [690, 700, 695, 710, 720],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "주식 지수 차트",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "종가 (단위: 원)",
        },
        ticks: {
          stepSize: 100, // Y축 단위
          callback: (value) => `${value} 원`, // 값에 '원' 단위 추가
        },
        beginAtZero: false, // Y축 시작을 데이터 값에 맞춤
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", padding: "20px", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default MainChart;
