import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ReferenceContext = createContext();

// Create a provider component
export function ReferenceProvider({ children }) {
  // Retrieve rounds from localStorage, with a fallback to default if parsing fails
  let storedReference;

  try {
    storedReference = JSON.parse(localStorage.getItem("reference"));
  } catch (error) {
    // If parsing fails, fallback to the default value
    storedReference = ["Rock beats scissors (Rock crushes Scissors)", 
        "Rock loses to Paper (Paper covers Rock)",
        "Paper beats Rock (Paper covers Rock)", 
        "Paper loses to Scissors (Scissors cut Paper)",
        "Scissors beats Paper (Scissors cut Paper)", 
        "Scissors loses to Rock (Rock crushes Scissors)"];
  }

  const [reference, setReference] = useState(storedReference);

  // Save input to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("reference", JSON.stringify(reference));
  }, [reference]);

  return (
    <ReferenceContext.Provider value={{ reference, setReference}}>
      {children}
    </ReferenceContext.Provider>
  );
}

// Custom hook to use the context
export function useReference() {
  return useContext(ReferenceContext);
}

