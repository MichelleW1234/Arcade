/*
Header:
0 -> prize won
*/

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CWMUserContext = createContext();

// Create a provider component
export function CWMUserProvider({ children }) {

  const [CWMUser, setCWMUser] = useState(() => {
    try {
      const storedCWMUser = JSON.parse(sessionStorage.getItem("CWMUser"));
      return Array.isArray(storedCWMUser) ? storedCWMUser : []; // Ensure it's an array

    } catch (error) {

      return []; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("CWMUser", JSON.stringify(CWMUser));
  }, [CWMUser]);

  return (
    <CWMUserContext.Provider value={{ CWMUser, setCWMUser }}>
      {children}
    </CWMUserContext.Provider>
  );
}

// Custom hook to use the context
export function useCWMUser() {
  return useContext(CWMUserContext);
}