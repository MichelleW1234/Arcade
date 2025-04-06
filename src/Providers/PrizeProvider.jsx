import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const PrizeContext = createContext();

// Create a provider component
export function PrizeProvider({ children }) {

  const [ Prize, setPrize] = useState(() => {
    try {
      const storedPrize = JSON.parse(sessionStorage.getItem("Prize"));
      return Array.isArray(storedPrize) ? storedPrize : [["Bear", 100], ["Bear", 100], ["Bear", 100]]; // Ensure it's an array
    } catch (error) {
      return [["Bear", 100], ["Bear", 100], ["Bear", 100]]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("Prize", JSON.stringify(Prize));
  }, [Prize]);

  return (
    <PrizeContext.Provider value={{ Prize, setPrize }}>
      {children}
    </PrizeContext.Provider>
  );
}

// Custom hook to use the context
export function usePrize() {
  return useContext(PrizeContext);
}