/*
0 -> cumulative points that user currently has
*/

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const PlayerContext = createContext();

// Create a provider component
export function PlayerProvider({ children }) {

  const [Player, setPlayer] = useState(() => {
    try {
      const storedPlayer = JSON.parse(sessionStorage.getItem("Player"));
      return Array.isArray(storedPlayer) ? storedPlayer : [0]; // Ensure it's an array
    } catch (error) {
      return [0]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("Player", JSON.stringify(Player));
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