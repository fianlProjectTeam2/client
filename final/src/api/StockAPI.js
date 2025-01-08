import axios from "axios";

const API_URL = "http://localhost:8080";

const StockAPI = {
  fetchMyStock: () => {
    return axios.get(`${API_URL}/stock/mypage`, {
      withCredentials: true,
    });
  },

  fetchMyFinances : () =>{
    return axios.get(`${API_URL}/stock/myFinances`,{
        withCredentials: true,
    })
  }
};

export default StockAPI;
