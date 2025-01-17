import axios from 'axios';

const API_URL = 'http://localhost:8080';

const AlertAPI = {
  fetchAlertList: () => 
    axios.get(`${API_URL}/user1/alertData`, { withCredentials: true }),
  checkAlert: (alertNum) =>
    axios.post(`${API_URL}/user1/alert/check`, { alertNum }, { withCredentials: true }),
};

export default AlertAPI;