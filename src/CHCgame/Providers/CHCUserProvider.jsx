/*
Header:
0 -> Number of steps taken
*/

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CHCUserContext = createContext();

// Create a provider component
export function CHCUserProvider({ children }) {

  const [CHCUser, setCHCUser] = useState(() => {
    try {
      const storedCHCUser = JSON.parse(sessionStorage.getItem("CHCUser"));
      return Array.isArray(storedCHCUser) ? storedCHCUser : [0]; // Ensure it's an array

    } catch (error) {

      return [0]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("CHCUser", JSON.stringify(CHCUser));
  }, [CHCUser]);

  return (
    <CHCUserContext.Provider value={{ CHCUser, setCHCUser }}>
      {children}
    </CHCUserContext.Provider>
  );
}

// Custom hook to use the context
export function useCHCUser() {
  return useContext(CHCUserContext);
}