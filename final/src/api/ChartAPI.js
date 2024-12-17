import axios from "axios";

const API_URL = "http://localhost:8080";

const ChartAPI = {
  fetchChartData: () =>
    axios.get(`${API_URL}/api/stock-info`, {
      withCredentials: true,
    }),
};

export default ChartAPI;
