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

import BlackCat from "../Images/ArcadePrizeImages/BlackCat.svg";
import OrangeCat from "../Images/ArcadePrizeImages/OrangeCat.svg";
import SiameseCat from "../Images/ArcadePrizeImages/SiameseCat.svg";
import BritishShorthairCat from "../Images/ArcadePrizeImages/BritishShorthairCat.svg";

import Basketball from "../Images/ArcadePrizeImages/Basketball.svg";
import Soccerball from "../Images/ArcadePrizeImages/Soccerball.svg";
import Paddle from "../Images/ArcadePrizeImages/Paddle.svg";
import Football from "../Images/ArcadePrizeImages/Football.svg";

// Create the context
const PrizeContext = createContext();

// Create a provider component
export function PrizeProvider({ children }) {

  const [ Prize, setPrize] = useState(() => {
    try {
      const storedPrize = JSON.parse(sessionStorage.getItem("Prize"));
      return Array.isArray(storedPrize) ? storedPrize : [["Bear", 80, Bear], ["BumbleBee", 50, Bee], ["Valentine", 20, Heart],
                                                          ["GameBoy", 100, GameBoy], ["Robot", 30, Robot], ["Alien", 20, Alien], 
                                                          ["Spider", 80, Spider], ["Carrot", 40, Carrot], ["Whale", 50, Whale],
                                                          ["Black Cat", 0, BlackCat], ["Orange Cat", 0, OrangeCat], ["Siamese Cat", 0, SiameseCat],
                                                          ["British Shorthair Cat", 0, BritishShorthairCat], ["Football", 0, Football], ["Ping Pong Paddle", 0, Paddle], 
                                                          ["Soccerball", 0, Soccerball], ["Basketball", 0, Basketball]];
    } catch (error) {
      return [["Bear", 80, Bear], ["BumbleBee", 50, Bee], ["Valentine", 20, Heart],
              ["GameBoy", 100, GameBoy], ["Robot", 30, Robot], ["Alien", 20, Alien], 
              ["Spider", 80, Spider], ["Carrot", 40, Carrot], ["Whale", 50, Whale],
              ["Black Cat", 0, BlackCat], ["Orange Cat", 0, OrangeCat], ["Siamese Cat", 0, SiameseCat],
              ["British Shorthair Cat", 0, BritishShorthairCat], ["Football", 0, Football], ["Ping Pong Paddle", 0, Paddle], 
              ["Soccerball", 0, Soccerball], ["Basketball", 0, Basketball]]; // Fallback if JSON parsing fails
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