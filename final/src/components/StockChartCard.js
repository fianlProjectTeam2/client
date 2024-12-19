import React from "react";
import ReactApexChart from "react-apexcharts";

const StockChartCard = ({ data, title, setCurrentPage }) => {
  const transformedData = data?.map((price) => ({
    x: price.time_close,
    y: [price.open, price.high, price.low, price.close], // [시가, 고가, 저가, 종가]
  }));

  const apexOptions = {
    chart: {
      height: 300,
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    grid: {
      show: false,
    },
    plotOptions: {
      candlestick: {
        wick: {
          useFillColor: true,
        },
      },
    },
    title: {
      text: title,
      align: "center",
    },
    xaxis: {
      labels: {
        show: true,
        datetimeFormatter: {
          month: "MMM 'yy",
        },
      },
      type: "datetime",
      categories: data?.map((date) => date.time_close),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value} 원`,
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `₩ ${value.toFixed(0)}`,
      },
    },
  };

  return (
    <div
      style={{
        flex: "1 1 calc(20%-500px)",
        margin: "10px",
        height: "300px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        padding: "10px",
        backgroundColor: "#fff",
      }}
    >
      <a onClick={() => setCurrentPage("StockChartDetail")}>
        <ReactApexChart
          type="candlestick"
          series={[
            {
              data: transformedData,
            },
          ]}
          options={apexOptions}
          height={300}
        />
      </a>
    </div>
  );
};

export default StockChartCard;
