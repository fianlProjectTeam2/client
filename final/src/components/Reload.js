import React, { useEffect } from "react";

const Reload = ({ setCurrentPage, selectedStock }) => {

  const handleDetail = () => {
    setCurrentPage("StockChartDetail");
  };

  useEffect(()=>{
    handleDetail();
  },[selectedStock])

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default Reload;
