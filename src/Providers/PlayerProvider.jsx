/*
0 -> cumulative points that user CURRENTLY has
1 -> cumulative points that user PREVIOUSLY had (before last game played)
*/

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const PlayerContext = createContext();

// Create a provider component
export function PlayerProvider({ children }) {
  // Retrieve rounds from localStorage, with a fallback to default if parsing fails
  let storedPlayer;

  try {
    storedPlayer = JSON.parse(localStorage.getItem("Player"));
  } catch (error) {
    // If parsing fails, fallback to the default value
    storedPlayer = [0, 0];
  }

  const [Player, setPlayer] = useState(() => {
    try {
      const storedPlayer = JSON.parse(localStorage.getItem("Player"));
      return Array.isArray(storedPlayer) ? storedPlayer : [0, 0]; // Ensure it's an array
    } catch (error) {
      return [0, 0]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
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

