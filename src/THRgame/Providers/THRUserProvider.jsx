/*
Header:
0 -> completed missions List
1 -> [current unlocked mission, corresponding screen link]
*/

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const THRUserContext = createContext();

// Create a provider component
export function THRUserProvider({ children }) {

  const [THRUser, setTHRUser] = useState(() => {
    try {
      const storedTHRUser = JSON.parse(sessionStorage.getItem("THRUser"));
      return Array.isArray(storedTHRUser) ? storedTHRUser : [[],[1, "/THRgameM1"]]; // Ensure it's an array
    } catch (error) {
      return [[],[1, "/THRgameM1"]]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("THRUser", JSON.stringify(THRUser));
  }, [THRUser]);

  return (
    <THRUserContext.Provider value={{ THRUser, setTHRUser }}>
      {children}
    </THRUserContext.Provider>
  );
}

// Custom hook to use the context
export function useTHRUser() {
  return useContext(THRUserContext);
}