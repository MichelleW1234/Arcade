import { createContext, useContext, useState, useEffect } from "react";
import { storage } from "../storage";

import bear from '../Images/ArcadePrizeImages/Bear.svg';
import bee from '../Images/ArcadePrizeImages/Bee.svg';
import heart from '../Images/ArcadePrizeImages/Valentine.svg';
import gameBoy from '../Images/ArcadePrizeImages/GameBoy.svg';
import robot from '../Images/ArcadePrizeImages/Robot.svg';
import alien from '../Images/ArcadePrizeImages/Alien.svg';
import spider from '../Images/ArcadePrizeImages/Spider.svg';
import whale from "../Images/ArcadePrizeImages/Whale.svg";
import carrot from "../Images/ArcadePrizeImages/Carrot.svg";
import hippo from "../Images/ArcadePrizeImages/Hippo.svg";
import cow from "../Images/ArcadePrizeImages/Cow.svg";

import blackCat from "../Images/ArcadePrizeImages/BlackCat.svg";
import orangeCat from "../Images/ArcadePrizeImages/OrangeCat.svg";
import siameseCat from "../Images/ArcadePrizeImages/SiameseCat.svg";
import britishShorthairCat from "../Images/ArcadePrizeImages/BritishShorthairCat.svg";

import basketball from "../Images/ArcadePrizeImages/Basketball.svg";
import soccerball from "../Images/ArcadePrizeImages/Soccerball.svg";
import paddle from "../Images/ArcadePrizeImages/Paddle.svg";
import football from "../Images/ArcadePrizeImages/Football.svg";

import earth from "../Images/ArcadePrizeImages/Earth.svg";
import sun from "../Images/ArcadePrizeImages/Sun.svg";
import saturn from "../Images/ArcadePrizeImages/Saturn.svg";
import andromeda from "../Images/ArcadePrizeImages/Andromeda.svg";

// Create the context
const PrizeContext = createContext();

export function PrizeProvider({ children }) {

  const defaultPrizes = [["Bear", 100, bear], ["BumbleBee", 80, bee], ["Valentine", 50, heart],
                        ["GameBoy", 80, gameBoy], ["Robot", 60, robot], ["Alien", 40, alien], 
                        ["Spider", 80, spider], ["Carrot", 40, carrot], ["Whale", 60, whale],
                        ["Black Cat", 0, blackCat], ["Orange Cat", 0, orangeCat], ["Siamese Cat", 0, siameseCat],
                        ["British Shorthair Cat", 0, britishShorthairCat], ["Football", 0, football], ["Ping Pong Paddle", 0, paddle], 
                        ["Soccerball", 0, soccerball], ["Basketball", 0, basketball], ["Andromeda Galaxy", 0, andromeda], ["Sun", 0, sun], 
                        ["Saturn", 0, saturn], ["Earth", 0, earth], ["Cow", 50, cow], ["Hippo", 30, hippo]];

  const [Prize, setPrize] = useState(() => {
    return storage.get("Prize", defaultPrizes);
  });

  useEffect(() => {
    storage.set("Prize", Prize);
  }, [Prize]);

  return (
    <PrizeContext.Provider value={{ Prize, setPrize }}>
      {children}
    </PrizeContext.Provider>
  );
}

export function usePrize() {
  return useContext(PrizeContext);
}
