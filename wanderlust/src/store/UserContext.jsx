import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    api("/me")
      .then((u) => setUser(u))
      .catch(() => setUser(null));
  }, []);

  async function refresh() {
    const me = await api("/me");
    setUser(me);
  }

  async function saveUser(partial) {
    const updated = await api("/me", { method: "PUT", body: partial });
    setUser(updated);
  }

  async function updateUser(partial) {
    const updated = await api("/me", { method: "PUT", body: partial });
    setUser(updated);
  }

  async function deleteAccount() {
    await api("/me", { method: "DELETE" });
    setUser(null);
    localStorage.removeItem("token");
  }

  function clearUser() {
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
    <UserContext.Provider value={{ user, saveUser, updateUser, deleteAccount, clearUser, refresh }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
