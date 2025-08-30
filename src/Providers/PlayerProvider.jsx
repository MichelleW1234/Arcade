import { createContext, useContext, useState, useEffect } from "react";
import { storage } from "../storage";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  // Load initial state
  const [Player, setPlayer] = useState(() => {
    return storage.get("Player", [0]);
  });

  // Persist whenever Player changes
  useEffect(() => {
    storage.set("Player", Player);
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