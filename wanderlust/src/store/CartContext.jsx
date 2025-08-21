// src/store/CartContext.jsx
import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { api } from "../lib/api";

const CartContext = createContext();

// helper: accept either {items:[...]} or [...] and ensure each item has .id
function normalizeCart(res) {
  const arr = (res?.items ?? res ?? []);
  return Array.isArray(arr)
    ? arr.map((c) => ({ ...c, id: c.id || c.placeId })) // ensure .id exists
    : [];
}

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    api("/cart")
      .then((data) => setItems(normalizeCart(data)))
      .catch(() => setItems([]));
  }, []);

  const add = async (item) => {
    // backend POST /cart accepts { id, title, distance, fee, img }
    const data = await api("/cart", { method: "POST", body: item });
    setItems(normalizeCart(data));
  };

  const remove = async (idOrPlaceId) => {
    const pid = encodeURIComponent(idOrPlaceId);
    const data = await api(`/cart/${pid}`, { method: "DELETE" });
    setItems(normalizeCart(data));
  };

  const clear = async () => {
    const data = await api("/cart", { method: "DELETE" });
    setItems(normalizeCart(data));
  };

  const book = async (item) => {
    await api("/bookings", { method: "POST", body: item });
    // optional: await clear(); or remove(item.id);
  };

  const value = useMemo(() => ({ items, add, remove, clear, book }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
