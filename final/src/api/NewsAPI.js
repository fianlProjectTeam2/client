import axios from "axios";

const API_URL = "http://localhost:8080";

const NewsAPI = {
  fetchNewsData: (data) => {
    return axios.get(`${API_URL}/craw/news?query=삼성전자`, {
      withCredentials: true,
    });
  },
};

export default NewsAPI;