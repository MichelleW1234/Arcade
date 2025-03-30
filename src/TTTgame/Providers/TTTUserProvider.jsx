/*
Header:
0 -> Who starts
1 -> Winner of game 
*/

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const TTTUserContext = createContext();

// Create a provider component
export function TTTUserProvider({ children }) {

  const [TTTUser, setTTTUser] = useState(() => {
    try {
      const storedTTTUser = JSON.parse(sessionStorage.getItem("TTTUser"));
      return Array.isArray(storedTTTUser) ? storedTTTUser : [-1, -1]; // Ensure it's an array
    } catch (error) {
      return [-1, -1]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("TTTUser", JSON.stringify(TTTUser));
  }, [TTTUser]);

  return (
    <TTTUserContext.Provider value={{ TTTUser, setTTTUser }}>
      {children}
    </TTTUserContext.Provider>
  );
}

// Custom hook to use the context
export function useTTTUser() {
  return useContext(TTTUserContext);
}