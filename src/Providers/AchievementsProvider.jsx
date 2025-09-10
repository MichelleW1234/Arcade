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

import RPS from '../Images/ArcadeAchievementBadges/RPS.svg';
import TTT from '../Images/ArcadeAchievementBadges/TTT.svg';
import SNK from '../Images/ArcadeAchievementBadges/SNK.svg';
import SPI from '../Images/ArcadeAchievementBadges/SPI.svg';
import ORB from '../Images/ArcadeAchievementBadges/ORB.svg';
import CBL from '../Images/ArcadeAchievementBadges/CBL.svg';
import BFR from '../Images/ArcadeAchievementBadges/BFR.svg';
import SMZ from '../Images/ArcadeAchievementBadges/SMZ.svg';

import { createContext, useContext, useState, useEffect } from "react";

import { storage } from "../storage";

const AchievementsContext = createContext();

export function AchievementsProvider({ children }) {

  const defaultAchievementsList = [[false], 
                                   [0, 5, "Won 5 games of Rock-Paper-Scissors", RPS, 0], 
                                   [0, 10, "Won 10 games of Tic-Tac-Toe", TTT, 0], 
                                   [0, 1, "Ate 50 Apples in one game of Snake", SNK, 0], 
                                   [0, 1, "Completed all 4 missions in one game of Space Invasion", SPI, 0], 
                                   [0, 5, "Won 5 games of Orbit", ORB, 0], 
                                   [0, 1, "Blasted 15 colors in one game of Color Blast", CBL, 0], 
                                   [0, 1, "Popped 15 balloons in one game of Balloon Frenzy", BFR, 0], 
                                   [0, 1, "Traveled 500 meters in one game of Sky Maze", SMZ, 0]];

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
