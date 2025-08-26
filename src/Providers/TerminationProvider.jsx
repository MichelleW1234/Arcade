/*
0 ->  player is fully outside the Arcade?
*/
import { createContext, useContext, useState, useEffect } from "react";

const TerminationContext = createContext();

export function TerminationProvider({ children }) {
  // Load initial state from localStorage
  const [Termination, setTermination] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("Termination"));
      return Array.isArray(stored) ? stored : [true];
    } catch {
      return [true]; // fallback
    }
  });

  useEffect(() => {
    localStorage.setItem("Termination", JSON.stringify(Termination));
  }, [Termination]);

  return (
    <TerminationContext.Provider value={{ Termination, setTermination }}>
      {children}
    </TerminationContext.Provider>
  );
}

export function useTermination() {
  return useContext(TerminationContext);
}

