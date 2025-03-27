/*
Header:
0 -> Active level of game
1 -> Input options for active level
2 -> Level references for active level
3 -> User wins
4 -> Computer wins
*/

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const RPSUserContext = createContext();

// Create a provider component
export function RPSUserProvider({ children }) {

  const [RPSUser, setRPSUser] = useState(() => {
    try {
      const storedRPSUser = JSON.parse(sessionStorage.getItem("RPSUser"));
      return Array.isArray(storedRPSUser) ? storedRPSUser : [1, ["Rock", "Paper", "Scissors"], ["Rock beats scissors (Rock crushes Scissors)", 
        "Rock loses to Paper (Paper covers Rock)",
        "Paper beats Rock (Paper covers Rock)", 
        "Paper loses to Scissors (Scissors cut Paper)",
        "Scissors beats Paper (Scissors cut Paper)", 
        "Scissors loses to Rock (Rock crushes Scissors)"], 0, 0]; // Ensure it's an array

    } catch (error) {

      return [1, ["Rock", "Paper", "Scissors"], ["Rock beats scissors (Rock crushes Scissors)", 
        "Rock loses to Paper (Paper covers Rock)",
        "Paper beats Rock (Paper covers Rock)", 
        "Paper loses to Scissors (Scissors cut Paper)",
        "Scissors beats Paper (Scissors cut Paper)", 
        "Scissors loses to Rock (Rock crushes Scissors)"], 0, 0]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("RPSUser", JSON.stringify(RPSUser));
  }, [RPSUser]);

  return (
    <RPSUserContext.Provider value={{ RPSUser, setRPSUser }}>
      {children}
    </RPSUserContext.Provider>
  );
}

// Custom hook to use the context
export function useRPSUser() {
  return useContext(RPSUserContext);
}




