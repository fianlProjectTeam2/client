import axios from "axios";

const API_URL = "http://localhost:8080";

const PointAPI = {
  fetchPointData: () => {
    return axios.get(`${API_URL}/point/check`, {
      withCredentials: true,
    });
  },
  
  ChargePointData: (point) => {
    return axios.post(
      `${API_URL}/point/charge`,
      { point : point },
      {
        withCredentials: true,
      }
    );
  },
};

export default PointAPI;