import axios from "axios";

const API_URL = "http://localhost:8080";

const PurchaseAPI = {
  purchaseStock: (data) => {
    return axios.post(`${API_URL}/stock/purchase`, data, {
      withCredentials: true,
    });
  },
};

export default PurchaseAPI;
