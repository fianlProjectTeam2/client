import axios from 'axios';

const API_URL = 'http://localhost:8080';

const AuthAPI = {
  login: (data) => 
    axios.post(`${API_URL}/login/login`, data, { withCredentials: true }),
  sessionCheck: () =>
    axios.get(`${API_URL}/login/sessionCheck`, { withCredentials: true }),
  logout: () =>
    axios.get(`${API_URL}/login/logout`, {withCredentials : true})
};

export default AuthAPI;