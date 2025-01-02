import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const LevelContext = createContext();

// Create a provider component
export function LevelProvider({ children }) {

  // Retrieve rounds from localStorage or default to 1 if not available
  const storedLevel = localStorage.getItem('level') ? JSON.parse(localStorage.getItem('level')) : 1;

  const [level, setLevel] = useState(storedLevel);

  // Save rounds to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('level', level);
  }, [level]);

  return (
    <LevelContext.Provider value={{level, setLevel}}>
      {children}
    </LevelContext.Provider>
  );
}

// Custom hook to use the context
export function useLevel() {
  return useContext(LevelContext);
}