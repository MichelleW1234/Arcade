import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const PlayerContext = createContext();

// Create a provider component
export function PlayerProvider({ children }) {
  // Default value if localStorage is empty or parsing fails
  let storedPlayer = [0, 0];

  try {
    const saved = localStorage.getItem("Player");
    if (saved !== null) {
      storedPlayer = JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error parsing Player from localStorage:", error);
  }

  const [Player, setPlayer] = useState(storedPlayer);

  // Save to localStorage whenever Player changes
  useEffect(() => {
    localStorage.setItem("Player", JSON.stringify(Player));
  }, [Player]);

  return (
    <PlayerContext.Provider value={{ Player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}

// Custom hook to use the context
export function usePlayer() {
  return useContext(PlayerContext);
}