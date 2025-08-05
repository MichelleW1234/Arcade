/*
Header:
0 -> distance flew
*/

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const SMZUserContext = createContext();

// Create a provider component
export function SMZUserProvider({ children }) {

  const [SMZUser, setSMZUser] = useState(() => {
    try {
      const storedSMZUser = JSON.parse(sessionStorage.getItem("SMZUser"));
      return Array.isArray(storedSMZUser) ? storedSMZUser : [0]; // Ensure it's an array

    } catch (error) {

      return [0]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("SMZUser", JSON.stringify(SMZUser));
  }, [SMZUser]);

  return (
    <SMZUserContext.Provider value={{ SMZUser, setSMZUser }}>
      {children}
    </SMZUserContext.Provider>
  );
}

// Custom hook to use the context
export function useSMZUser() {
  return useContext(SMZUserContext);
}