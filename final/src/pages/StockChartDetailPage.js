import React from "react";
import StockChartCard from "../components/StockChartCard";
import "../static/resources/css/StockListPage.css";

const StockChartDetailPage = ({setCurrentPage}) => {
  const charts = [
    {
      title: "주식 차트 1",
      data: [
        {
          time_close: "2024-12-01",
          open: 2400,
          high: 2500,
          low: 2300,
          close: 2450,
        },
        {
          time_close: "2024-12-02",
          open: 2450,
          high: 2550,
          low: 2400,
          close: 2500,
        },
        {
          time_close: "2024-12-03",
          open: 2500,
          high: 2600,
          low: 2450,
          close: 2550,
        },
        {
          time_close: "2024-12-04",
          open: 2550,
          high: 2650,
          low: 2500,
          close: 2600,
        },
        {
          time_close: "2024-12-05",
          open: 2600,
          high: 2700,
          low: 2550,
          close: 2650,
        },
      ],
    },
    {
      title: "주식 차트 2",
      data: [
        {
          time_close: "2024-12-01",
          open: 690,
          high: 720,
          low: 680,
          close: 700,
        },
        {
          time_close: "2024-12-02",
          open: 700,
          high: 730,
          low: 650,
          close: 690,
        },
        {
          time_close: "2024-12-03",
          open: 690,
          high: 700,
          low: 600,
          close: 600,
        },
        {
          time_close: "2024-12-04",
          open: 600,
          high: 750,
          low: 600,
          close: 750,
        },
        {
          time_close: "2024-12-05",
          open: 750,
          high: 780,
          low: 700,
          close: 770,
        },
      ],
    },
    {
      title: "주식 차트 2",
      data: [
        {
          time_close: "2024-12-01",
          open: 690,
          high: 720,
          low: 680,
          close: 700,
        },
        {
          time_close: "2024-12-02",
          open: 700,
          high: 730,
          low: 650,
          close: 690,
        },
        {
          time_close: "2024-12-03",
          open: 690,
          high: 700,
          low: 600,
          close: 600,
        },
        {
          time_close: "2024-12-04",
          open: 600,
          high: 750,
          low: 600,
          close: 750,
        },
        {
          time_close: "2024-12-05",
          open: 750,
          high: 780,
          low: 700,
          close: 770,
        },
      ],
    },
    {
      title: "주식 차트 2",
      data: [
        {
          time_close: "2024-12-01",
          open: 690,
          high: 720,
          low: 680,
          close: 700,
        },
        {
          time_close: "2024-12-02",
          open: 700,
          high: 730,
          low: 650,
          close: 690,
        },
        {
          time_close: "2024-12-03",
          open: 690,
          high: 700,
          low: 600,
          close: 600,
        },
        {
          time_close: "2024-12-04",
          open: 600,
          high: 750,
          low: 600,
          close: 750,
        },
        {
          time_close: "2024-12-05",
          open: 750,
          high: 780,
          low: 700,
          close: 770,
        },
      ],
    },
    {
      title: "주식 차트 2",
      data: [
        {
          time_close: "2024-12-01",
          open: 690,
          high: 720,
          low: 680,
          close: 700,
        },
        {
          time_close: "2024-12-02",
          open: 700,
          high: 730,
          low: 650,
          close: 690,
        },
        {
          time_close: "2024-12-03",
          open: 690,
          high: 700,
          low: 600,
          close: 600,
        },
        {
          time_close: "2024-12-04",
          open: 600,
          high: 750,
          low: 600,
          close: 750,
        },
        {
          time_close: "2024-12-05",
          open: 750,
          high: 780,
          low: 700,
          close: 770,
        },
      ],
    },
  ];

  return (
    <div className="Content">
      <input
        type="search"
        placeholder="검색"
        style={{ marginBottom: "20px" }}
      />

      <div className="ChartContent">
        {charts.map((chart, index) => (
          <StockChartCard key={index} data={chart.data} title={chart.title} setCurrentPage={setCurrentPage} />
        ))}
      </div>
    </div>
  );
};

export default StockChartDetailPage;
