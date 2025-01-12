import axios from "axios";

const API_URL = "http://localhost:8080";

const StockAPI = {
  fetchMyStock: () => {
    return axios.get(`${API_URL}/stock/mypage`, {
      withCredentials: true,
    });
  },

  fetchMyFinances: () => {
    return axios.get(`${API_URL}/stock/myFinances`, {
      withCredentials: true,
    });
  },

  fetchPurchaseInfo: (data) => {
    return axios.get(`${API_URL}/stock/purchase/info`, {
      params: { stockCode: data },
      withCredentials: true,
    });
  },

  sellStock: (data) => {
    return axios.post(`${API_URL}/stock/sell`, data, {
      withCredentials: true,
    });
  },

  defaultStockData: () =>{
    return axios.get(`${API_URL}/stock/default/data`, {
      withCredentials: true,
    });
  },
};

export default StockAPI;
