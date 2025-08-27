/*
0 -> cumulative points that user currently has
*/

import { createContext, useContext, useState, useEffect } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  // Load initial state from localStorage
  const [Player, setPlayer] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("Player"));
      return Array.isArray(stored) ? stored : [0];
    } catch {
      return [0]; // fallback
    }
  });

  // Persist whenever Player changes
  useEffect(() => {
    localStorage.setItem("Player", JSON.stringify(Player));
  }, [Player]);
  

  return (
    <PlayerContext.Provider value={{ Player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}

