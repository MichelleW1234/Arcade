/*
Header:
0 -> Number of colors blasted
*/

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CBLUserContext = createContext();

// Create a provider component
export function CBLUserProvider({ children }) {

  const [CBLUser, setCBLUser] = useState(() => {
    try {
      const storedCBLUser = JSON.parse(sessionStorage.getItem("CBLUser"));
      return Array.isArray(storedCBLUser) ? storedCBLUser : [0]; // Ensure it's an array

    } catch (error) {

      return [0]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("CBLUser", JSON.stringify(CBLUser));
  }, [CBLUser]);

  return (
    <CBLUserContext.Provider value={{ CBLUser, setCBLUser }}>
      {children}
    </CBLUserContext.Provider>
  );
}

// Custom hook to use the context
export function useCBLUser() {
  return useContext(CBLUserContext);
}