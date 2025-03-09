import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const StarterContext = createContext();

// Create a provider component
export function StarterProvider({ children }) {
  // Retrieve rounds from localStorage, with a fallback to default if parsing fails
  let storedStarter;

  try {
    storedStarter = JSON.parse(localStorage.getItem("Starter"));
  } catch (error) {
    // If parsing fails, fallback to the default value
    storedStarter = -1;
  }

  const [Starter, setStarter] = useState(storedStarter);

  // Save input to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("Starter", Starter);
  }, [Starter]);

  return (
    <StarterContext.Provider value={{ Starter, setStarter }}>
      {children}
    </StarterContext.Provider>
  );
}

// Custom hook to use the context
export function useStarter() {
  return useContext(StarterContext);
}
