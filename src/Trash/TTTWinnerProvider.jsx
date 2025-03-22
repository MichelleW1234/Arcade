import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const WinnerContext = createContext();

// Create a provider component
export function TTTWinnerProvider({ children }) {
  // Retrieve rounds from localStorage, with a fallback to default if parsing fails
  let storedWinner;

  try {
    storedWinner = JSON.parse(localStorage.getItem("Winner"));
  } catch (error) {
    // If parsing fails, fallback to the default value
    storedWinner = -1;
  }

  const [Winner, setWinner] = useState(storedWinner);

  // Save input to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("Winner", Winner);
  }, [Winner]);

  return (
    <WinnerContext.Provider value={{ Winner, setWinner }}>
      {children}
    </WinnerContext.Provider>
  );
}

// Custom hook to use the context
export function useWinner() {
  return useContext(WinnerContext);
}