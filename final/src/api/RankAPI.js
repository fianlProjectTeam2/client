import axios from "axios";

const API_URL = "http://localhost:8080";

const RankAPI = {
  rankInsert: () => {
    return axios.get(`${API_URL}/rank/insert`, {
      withCredentials: true,
    });
  },

  fetchRank: () => {
    return axios.get(`${API_URL}/rank/data`, {
      withCredentials: true,
    });
  },

  fetchProfit: () => {
    return axios.get(`${API_URL}/profit`, {
      withCredentials: true,
    });
  },
};

export default RankAPI;
