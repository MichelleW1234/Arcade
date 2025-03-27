/*
0 -> href path to starting page of active game
1 -> Number of points to play (and that can be gained or lost)
2 -> 
3 -> 
4 -> 
5 -> 
*/

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ActiveGameContext = createContext();

// Create a provider component
export function ActiveGameProvider({ children }) {

  const [ActiveGame, setActiveGame] = useState(() => {
    try {
      const storedActiveGame = JSON.parse(sessionStorage.getItem("ActiveGame"));
      return Array.isArray(storedActiveGame) ? storedActiveGame : ["/RPSstart", 20]; // Ensure it's an array
    } catch (error) {
      return ["/RPSstart", 20]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("ActiveGame", JSON.stringify(ActiveGame));
  }, [ActiveGame]);

  return (
    <ActiveGameContext.Provider value={{ ActiveGame, setActiveGame }}>
      {children}
    </ActiveGameContext.Provider>
  );
}

// Custom hook to use the context
export function useActiveGame() {
  return useContext(ActiveGameContext);
}

