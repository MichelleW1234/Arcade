import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const RoundsContext = createContext();

// Create a provider component
export function RoundsProvider({ children }) {
  // Retrieve rounds from localStorage or default to 1 if not available
  const storedRounds = localStorage.getItem('rounds');
  const initialRounds = storedRounds ? parseInt(storedRounds, 10) : 1;

  const [rounds, setRounds] = useState(initialRounds);

  // Save rounds to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('rounds', rounds);
  }, [rounds]);

  return (
    <RoundsContext.Provider value={{ rounds, setRounds }}>
      {children}
    </RoundsContext.Provider>
  );
}

// Custom hook to use the context
export function useRounds() {
  return useContext(RoundsContext);
}