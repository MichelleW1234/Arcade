import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ActiveGameContext = createContext();

// Create a provider component
export function ActiveGameProvider({ children }) {
  // Retrieve rounds from localStorage, with a fallback to default if parsing fails
  let storedActiveGame;

  try {
    storedActiveGame = JSON.parse(localStorage.getItem("ActiveGame"));
  } catch (error) {
    // If parsing fails, fallback to the default value
    storedActiveGame = ["/RPSstart", 20, null, null, null];
  }

  const [ActiveGame, setActiveGame] = useState(storedActiveGame);

  // Save input to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ActiveGame", JSON.stringify(ActiveGame));
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

