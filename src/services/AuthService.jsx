import axios from "./axios";
import Cookies from "js-cookie";

const setUser = (token, refreshToken) => {
  Cookies.set("token", token);
  Cookies.set("refreshToken", refreshToken);
};

const login = async (email, password, rememberMe = false) => {
  try {
    const response = await axios.post("/authencation/login", {
      email,
      password,
      rememberMe,
    });
    if (response.data.token && response.data.refreshToken) {
      setUser(response.data.token, response.data.refreshToken);
      return response.data.token;
    }
    return null;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const profile = async (id) => {
  try {
    const response = await axios.get(`/auth/profile/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const changePassword = async (id, oldPassword, newPassword, confirmPassword) => {
  try {
    const response = await axios.put(`/auth/${id}`, {
      oldPassword,
      newPassword,
      confirmPassword,
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const logout = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  window.location.href = "/";
};

const refreshToken = async () => {
  const refreshToken = Cookies.get("refreshToken");
  if (!refreshToken) return Promise.reject("No refresh token found");

  try {
    const response = await axios.post("/auth/refresh-token", {
      refreshToken,
    });
    const { token, refreshToken: newRefreshToken } = response.data;
    setUser(token, newRefreshToken);
    return token;
  } catch (error) {
    logout();
    throw error.response?.data || error.message;
  }
};

const AuthService = {
  login,
  profile,
  logout,
  refreshToken,
  changePassword,
};

export default AuthService;
