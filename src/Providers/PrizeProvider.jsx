import React, { createContext, useContext, useState, useEffect } from "react";

import Bear from '../Images/ArcadePrizeImages/Bear.svg';
import Bee from '../Images/ArcadePrizeImages/Bee.svg';
import Heart from '../Images/ArcadePrizeImages/Valentine.svg';
import GameBoy from '../Images/ArcadePrizeImages/GameBoy.svg';
import Robot from '../Images/ArcadePrizeImages/Robot.svg';
import Alien from '../Images/ArcadePrizeImages/Alien.svg';
import Spider from '../Images/ArcadePrizeImages/Spider.svg';
import Whale from "../Images/ArcadePrizeImages/Whale.svg";
import Carrot from "../Images/ArcadePrizeImages/Carrot.svg";

// Create the context
const PrizeContext = createContext();

// Create a provider component
export function PrizeProvider({ children }) {

  const [ Prize, setPrize] = useState(() => {
    try {
      const storedPrize = JSON.parse(sessionStorage.getItem("Prize"));
      return Array.isArray(storedPrize) ? storedPrize : [["Bear", 80, Bear], ["BumbleBee", 50, Bee], ["Valentine", 20, Heart],
                                                          ["GameBoy", 100, GameBoy], ["Robot", 30, Robot], ["Alien", 20, Alien], 
                                                          ["Spider", 80, Spider], ["Carrot", 40, Carrot], ["Whale", 50, Whale]];
    } catch (error) {
      return [["Bear", 80, Bear], ["BumbleBee", 50, Bee], ["Valentine", 20, Heart],
              ["GameBoy", 100, GameBoy], ["Robot", 30, Robot], ["Alien", 20, Alien], 
              ["Spider", 80, Spider], ["Carrot", 40, Carrot], ["Whale", 50, Whale]]; // Fallback if JSON parsing fails
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