/*
Header:
0 -> Number of balloons found
*/

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const BFRUserContext = createContext();

// Create a provider component
export function BFRUserProvider({ children }) {

  const [BFRUser, setBFRUser] = useState(() => {
    try {
      const storedBFRUser = JSON.parse(sessionStorage.getItem("BFRUser"));
      return Array.isArray(storedBFRUser) ? storedBFRUser : [0]; // Ensure it's an array

    } catch (error) {

      return [0]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("BFRUser", JSON.stringify(BFRUser));
  }, [BFRUser]);

  return (
    <BFRUserContext.Provider value={{ BFRUser, setBFRUser }}>
      {children}
    </BFRUserContext.Provider>
  );
}

// Custom hook to use the context
export function useBFRUser() {
  return useContext(BFRUserContext);
}