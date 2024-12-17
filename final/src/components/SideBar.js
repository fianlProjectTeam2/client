import React, { useState } from "react";
import "../static/resources/css/SideBar.css";

function SideBar() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1000); // Prevent overlap
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1000); // Prevent overlap
    setMaxPrice(value);
  };

  return (
    <aside className="sidebar">
      <h2>가격 범위</h2>
      <div className="range-slider">
        <label>최소 가격: {minPrice.toLocaleString()} 원</label>
        <input
          type="range"
          min="0"
          max="1000000"
          value={minPrice}
          onChange={handleMinChange}
        />

        <label>최대 가격: {maxPrice.toLocaleString()} 원</label>
        <input
          type="range"
          min="0"
          max="1000000"
          value={maxPrice}
          onChange={handleMaxChange}
        />
      </div>
    </aside>
  );
}

export default SideBar;
