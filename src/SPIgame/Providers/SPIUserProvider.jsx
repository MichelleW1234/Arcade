/*
Header:
0 -> # of completed missions
1 -> [current unlocked mission, corresponding screen link]
2 -> died?
*/

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const SPIUserContext = createContext();

// Create a provider component
export function SPIUserProvider({ children }) {

  const [SPIUser, setSPIUser] = useState(() => {
    try {
      const storedSPIUser = JSON.parse(sessionStorage.getItem("SPIUser"));
      return Array.isArray(storedSPIUser) ? storedSPIUser : [0,[1, "/SPIM1Instructions"], false]; // Ensure it's an array
    } catch (error) {
      return [0,[1, "/SPIM1Instructions"], false]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("SPIUser", JSON.stringify(SPIUser));
  }, [SPIUser]);

  return (
    <SPIUserContext.Provider value={{ SPIUser, setSPIUser }}>
      {children}
    </SPIUserContext.Provider>
  );
}

// Custom hook to use the context
export function useSPIUser() {
  return useContext(SPIUserContext);
}