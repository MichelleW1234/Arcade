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


/*
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
*/