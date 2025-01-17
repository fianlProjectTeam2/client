import axios from 'axios';

const API_URL = 'http://localhost:8080';

const AuthAPI = {
  login: (data) => 
    axios.post(`${API_URL}/login/react/login`, data, { withCredentials: true }),
  sessionCheck: () =>
    axios.get(`${API_URL}/login/sessionCheck`, { withCredentials: true }),
  logout: () =>
    axios.get(`${API_URL}/login/react/logout`, {withCredentials : true}),
  sessionCheckIsAdmin: () =>
    axios.get(`${API_URL}/login/session/data`, {withCredentials:true}),
};

export default AuthAPI;