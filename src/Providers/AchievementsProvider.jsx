/*
0 -> RPS array
1 -> TTT array
2 -> SNK array
3 -> SPI array
4 -> ORB array
5 -> CBL array
6 -> BFR array
7 -> SMZ array

for each achievement array: 
  0 -> current progress
  1 -> threshold to win achievement
  2 -> achievement title
  3 -> badge image
  4 -> # of badges won
*/

import rps from '../Images/ArcadeAchievementBadges/RPS.svg';
import ttt from '../Images/ArcadeAchievementBadges/TTT.svg';
import snk from '../Images/ArcadeAchievementBadges/SNK.svg';
import spi from '../Images/ArcadeAchievementBadges/SPI.svg';
import orb from '../Images/ArcadeAchievementBadges/ORB.svg';
import cbl from '../Images/ArcadeAchievementBadges/CBL.svg';
import bfr from '../Images/ArcadeAchievementBadges/BFR.svg';
import smz from '../Images/ArcadeAchievementBadges/SMZ.svg';

import { createContext, useContext, useState, useEffect } from "react";

import { storage } from "../storage";

const AchievementsContext = createContext();

export function AchievementsProvider({ children }) {

  const defaultAchievementsList = [[false], 
                                   [0, 5, "Won 5 games of Rock-Paper-Scissors", rps, 0], 
                                   [0, 10, "Won 10 games of Tic-Tac-Toe", ttt, 0], 
                                   [0, 1, "Ate 50 Apples in one game of Snake", snk, 0], 
                                   [0, 1, "Completed all 4 missions in one game of Space Invasion", spi, 0], 
                                   [0, 5, "Won 5 games of Orbit", orb, 0], 
                                   [0, 1, "Blasted 15 colors in one game of Color Blast", cbl, 0], 
                                   [0, 1, "Popped 15 balloons in one game of Balloon Frenzy", bfr, 0], 
                                   [0, 1, "Traveled 500 meters in one game of Sky Maze", smz, 0],
                                   [0, 1, "Took 50 steps in one game of Chicken Crossing", smz, 0]];

  const [Achievements, setAchievements] = useState(() => {
    return storage.get("Achievements", defaultAchievementsList);
  });

  useEffect(() => {
    storage.set("Achievements", Achievements);
  }, [Achievements]);

  return (
    <AchievementsContext.Provider value={{ Achievements, setAchievements }}>
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  return useContext(AchievementsContext);
}
