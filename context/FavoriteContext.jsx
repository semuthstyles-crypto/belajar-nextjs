"use client";
import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function isFavorite(userId) {
    return favorites.some((fav) => fav.id === userId);
  }

  function toggleFavorite(user) {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === user.id)
        ? prev.filter((fav) => fav.id !== user.id)
        : [...prev, user]
    );
  }

  return (
    <FavoriteContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);

  if (context === undefined) {
    throw new Error("useFavorite harus dipakai di dalam <FavoriteProvider>");
  }

  return context;
}