import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  async function register({ fullName, email, password }) {
    const data = await api("/auth/register", {
      method: "POST",
      auth: false,
      body: { fullName, email, password },
    });
    if (data?.token) {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
    }
    return data;
  }

  async function login({ email, password }) {
    const { token } = await api("/auth/login", {
      method: "POST",
      auth: false,
      body: { email, password },
    });
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
