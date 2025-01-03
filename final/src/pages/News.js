import React, { useEffect, useState } from "react";
import "../static/resources/css/News.css";
import NewsAPI from "../api/NewsAPI";

const News = () => {
  const [searchWord, setSearchWord] = useState("");
  const [newsData, setNewsData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchWord(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/postList?page=1&searchWord=${searchWord}`;
  };

  const fetchNews = async () => {
    try {
      const response = await NewsAPI.fetchNewsData();
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
    fetchNews();
  }, []);

  return (
    <div>
      <main className="main-content">
        <table border="1">
          <thead>
            <tr>
              <th>기사번호</th>
              <th>제목</th>
              <th>기사요약</th>
              {/* <th>기사내용</th> */}
              <th>기사주소</th>
            </tr>
          </thead>
          <tbody>
            {newsData.map((news, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{truncateText(stripHtmlTags(news.title), 40)}</td>
                <td>{truncateText(stripHtmlTags(news.description), 40)}</td>
                {/* <td>{truncateText(stripHtmlTags(news.body), 20)}</td> */}
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
              <td colSpan="5" style={{ textAlign: "center" }}>

              </td>
            </tr>
          </tfoot>
        </table>

        <div
          className="search-container"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <form onSubmit={handleSearchSubmit}>
            <input
              type="search"
              id="searchWord"
              name="searchWord"
              value={searchWord}
              onChange={handleSearchChange}
            />
            <button type="submit">검색</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default News;
