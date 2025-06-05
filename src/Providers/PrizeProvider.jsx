import React, { createContext, useContext, useState, useEffect } from "react";

import Bear from '../Images/image 1.svg';
import Bee from '../Images/image 2.svg';
import Heart from '../Images/image 3.svg';
import GameBoy from '../Images/image 4.svg';
import Robot from '../Images/image 5.svg';
import Alien from '../Images/image 6.svg';
import Spider from '../Images/image 7.svg';
import Whale from "../Images/image 19.svg";
import Carrot from "../Images/image 20.svg";

// Create the context
const PrizeContext = createContext();

// Create a provider component
export function PrizeProvider({ children }) {

  const [ Prize, setPrize] = useState(() => {
    try {
      const storedPrize = JSON.parse(sessionStorage.getItem("Prize"));
      return Array.isArray(storedPrize) ? storedPrize : [["Bear", 80, Bear], ["BumbleBee", 50, Bee], ["Valentine", 20, Heart],
                                                          ["GameBoy", 100, GameBoy], ["Robot", 30, Robot], ["Alien", 20, Alien], ["Spider", 80, Spider], ["Carrot", 40, Carrot], ["Whale", 50, Whale]]; // Ensure it's an array
    } catch (error) {
      return [["Bear", 80, Bear], ["BumbleBee", 50, Bee], ["Valentine", 20, Heart],
      ["GameBoy", 100, GameBoy], ["Robot", 30, Robot], ["Alien", 20, Alien], ["Spider", 80, Spider], ["Carrot", 40, Carrot], ["Whale", 50, Whale]]; // Fallback if JSON parsing fails
    }
  });

  // Save input to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("Prize", JSON.stringify(Prize));
  }, [Prize]);

  return (
    <PrizeContext.Provider value={{ Prize, setPrize }}>
      {children}
    </PrizeContext.Provider>
  );
}

// Custom hook to use the context
export function usePrize() {
  return useContext(PrizeContext);
}