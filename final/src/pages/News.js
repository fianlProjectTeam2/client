import React, { useEffect, useState } from "react";
import "../static/resources/css/News.css";
import NewsAPI from "../api/NewsAPI";

const News = () => {
  const [selectedCompany, setSelectedCompany] = useState("삼성전자");
  const [newsData, setNewsData] = useState([]);

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  const fetchNews = async (company) => {
    try {
      const response = await NewsAPI.fetchNewsData(company);
      setNewsData(response.data);
    } catch (error) {
      console.error("Error fetching news data", error);
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const stripHtmlTags = (text) => {
    const div = document.createElement("div");
    div.innerHTML = text;
    return div.textContent || div.innerText || "";
  };

  useEffect(() => {
    fetchNews(selectedCompany);
  }, [selectedCompany]);

  return (
    <div>
      <main className="main-content">
        <div
          className="select-container"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <select
            className="custom-select"
            value={selectedCompany}
            onChange={handleCompanyChange}
          >
            <option value="삼성전자">삼성전자</option>
            <option value="SK하이닉스">SK하이닉스</option>
            <option value="LG에너지솔루션">LG에너지솔루션</option>
            <option value="삼성바이오로직스">삼성바이오로직스</option>
            <option value="현대차">현대차</option>
            <option value="셀트리온">셀트리온</option>
            <option value="기아">기아</option>
            <option value="KB금융">KB금융</option>
            <option value="NAVER">NAVER</option>
            <option value="신한지주">신한지주</option>
          </select>
        </div>

        <table border="1">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>기사요약</th>
              <th>주소</th>
            </tr>
          </thead>
          <tbody>
            {newsData.map((news, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{truncateText(stripHtmlTags(news.title), 40)}</td>
                <td>{truncateText(stripHtmlTags(news.description), 40)}</td>
                <td>
                  <a href={news.link} target="_blank" rel="noopener noreferrer">
                    {"주소"}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}></td>
            </tr>
          </tfoot>
        </table>
      </main>
    </div>
  );
};

export default News;
