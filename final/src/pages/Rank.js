import React, { useEffect, useState } from "react";
import "../static/resources/css/Rank.css";
import RankAPI from "../api/RankAPI";

const Rank = () => {
  const [insertResult, setInsertResult] = useState();
  const [rank, setRank] = useState([]);

  const rankDataInsert = async () => {
    try {
      const response = await RankAPI.rankInsert();
      setInsertResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRankData = async () => {
    try {
      const response = await RankAPI.fetchRank();
      setRank(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    rankDataInsert();
  }, []);

  useEffect(() => {
    fetchRankData();
  }, [insertResult]);

  return (
    <div>
      <main className="main-content">
        <h2>이달의 주식왕</h2>
        <table border="1">
          <thead>
            <tr>
              <th>순위</th>
              <th>닉네임</th>
              <th>수익</th>
            </tr>
          </thead>
          <tbody>
            {rank.map((data, index) => {
              let rowClass = "";
              console.log(data);
              if (data.rank === "1") {
                rowClass = "top-rank-1";
              } else if (data.rank === "2") {
                rowClass = "top-rank-2";
              } else if (data.rank === "3") {
                rowClass = "top-rank-3";
              }

              return (
                <tr key={index} className={rowClass}>
                  <td>{data.rank}</td>
                  <td>{data.nickName}</td>
                  <td>{data.assetValue}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}></td>
            </tr>
          </tfoot>
        </table>

        <div
          className="search-container"
          style={{ textAlign: "center", marginTop: "20px" }}
        ></div>
      </main>
    </div>
  );
};

export default Rank;
