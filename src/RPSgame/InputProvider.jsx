import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const InputContext = createContext();

// Create a provider component
export function InputProvider({ children }) {
  // Retrieve rounds from localStorage, with a fallback to default if parsing fails
  let storedInput;

  try {
    storedInput = JSON.parse(localStorage.getItem("input"));
  } catch (error) {
    // If parsing fails, fallback to the default value
    storedInput = ["Rock", "Paper", "Scissors"];
  }

  const [input, setInput] = useState(storedInput);

  // Save input to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("input", JSON.stringify(input));
  }, [input]);

  return (
    <InputContext.Provider value={{ input, setInput }}>
      {children}
    </InputContext.Provider>
  );
}

// Custom hook to use the context
export function useInput() {
  return useContext(InputContext);
}

