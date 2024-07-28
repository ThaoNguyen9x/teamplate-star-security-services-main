import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import AuthService from "../services/AuthService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userToken = Cookies.get("token");
    if (userToken) {
      try {
        const decodedToken = jwtDecode(userToken);
        setToken(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
        handleLogout();
      }
    }
  }, []);

  const handleSetToken = (tokenString, rememberMe = false) => {
    try {
      const decodedToken = jwtDecode(tokenString);
      setToken(decodedToken);
      Cookies.set("token", tokenString, { expires: rememberMe ? 7 : 1 });
    } catch (error) {
      console.error("Invalid token", error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setToken(null);
  };

  const values = {
    token,
    handleSetToken,
    handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
