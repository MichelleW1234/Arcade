/*
Header:
0 -> Target Hit?
*/

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ORBUserContext = createContext();

// Create a provider component
export function ORBUserProvider({ children }) {

  const [ORBUser, setORBUser] = useState(() => {
    try {
      const storedORBUser = JSON.parse(sessionStorage.getItem("ORBUser"));
      return Array.isArray(storedORBUser) ? storedORBUser : [false]; // Ensure it's an array

    } catch (error) {

      return [false]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("ORBUser", JSON.stringify(ORBUser));
  }, [ORBUser]);

  return (
    <ORBUserContext.Provider value={{ ORBUser, setORBUser }}>
      {children}
    </ORBUserContext.Provider>
  );
}

// Custom hook to use the context
export function useORBUser() {
  return useContext(ORBUserContext);
}