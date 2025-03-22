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
  // Retrieve rounds from localStorage, with a fallback to default if parsing fails
  let storedTTTUser;

  try {
    storedTTTUser = JSON.parse(localStorage.getItem("TTTUser"));
  } catch (error) {
    // If parsing fails, fallback to the default value
    storedTTTUser = [-1, -1];
  }

  const [TTTUser, setTTTUser] = useState(() => {
    try {
      const storedTTTUser = JSON.parse(localStorage.getItem("TTTUser"));
      return Array.isArray(storedTTTUser) ? storedTTTUser : [-1, -1]; // Ensure it's an array
    } catch (error) {
      return [-1, -1]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("TTTUser", JSON.stringify(TTTUser));
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

