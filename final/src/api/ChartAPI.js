import axios from "axios";

const API_URL = "http://localhost:8080";

const ChartAPI = {
  fetchChartData: (numOfRows = 1, item) => {
    return axios.get(`${API_URL}/api/stock-info`, {
      params: { numOfRows, item },
      withCredentials: true,
    });
  },
};

export default ChartAPI;