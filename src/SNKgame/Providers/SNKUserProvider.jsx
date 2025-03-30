/*
Header:
0 -> snake bumped?
1 -> apples eaten
*/

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const SNKUserContext = createContext();

// Create a provider component
export function SNKUserProvider({ children }) {

  const [SNKUser, setSNKUser] = useState(() => {
    try {
      const storedSNKUser = JSON.parse(sessionStorage.getItem("SNKUser"));
      return Array.isArray(storedSNKUser) ? storedSNKUser : [false, 0]; // Ensure it's an array
    } catch (error) {
      return [false, 0]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("SNKUser", JSON.stringify(SNKUser));
  }, [SNKUser]);

  return (
    <SNKUserContext.Provider value={{ SNKUser, setSNKUser }}>
      {children}
    </SNKUserContext.Provider>
  );
}

// Custom hook to use the context
export function useSNKUser() {
  return useContext(SNKUserContext);
}