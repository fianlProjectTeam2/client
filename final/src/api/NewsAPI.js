import axios from "axios";

const API_URL = "http://localhost:8080";

const NewsAPI = {
  fetchNewsData: (company) => {
    return axios.get(`${API_URL}/craw/news?query=${encodeURIComponent(company)}`, {
      withCredentials: true,
    });
  },

  fetchPredicData: () => {
    return axios.get(`${API_URL}/craw/news/prediction`, {
      withCredentials:true,
    });
  },

  fetchPredicScore: () => {
    return axios.get(`${API_URL}/craw/news/prediction/score`,{
      withCredentials:true,
    });
  },
};

export default NewsAPI;
