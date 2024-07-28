import axios from "axios";
import Cookies from "js-cookie";
import AuthService from "./AuthService";

const API_URL = "http://localhost:5000/api";

const instance = axios.create({ 
  baseURL: API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      AuthService.logout();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
