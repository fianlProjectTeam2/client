import axios from "axios";

const API_URL = "http://localhost:8080";

const MoveAPI = {
  fetchMoveData: () => {
    return axios.get(`${API_URL}/move/data`, {
      withCredentials: true,
    });
  },
};

export default MoveAPI;