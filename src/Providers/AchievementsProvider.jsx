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
import Andromeda from "../Images/ArcadePrizeImages/Andromeda.svg";

import { createContext, useContext, useState, useEffect } from "react";

import { storage } from "../storage";

const AchievementsContext = createContext();

export function AchievementsProvider({ children }) {

  const defaultAchievementsList = [[false], 
                                   [0, 5, "Won 5 games of Rock-Paper-Scissors", Andromeda, 0], 
                                   [0, 10, "Won 10 games of Tic-Tac-Toe", Andromeda, 0], 
                                   [0, 1, "Ate 50 Apples in Snake", Andromeda, 0], 
                                   [0, 1, "Completed all 4 missions in Space Invasion", Andromeda, 0], 
                                   [0, 5, "Won 5 games of Orbit", Andromeda, 0], 
                                   [0, 1, "Blasted 15 colors in Color Blast", Andromeda, 0], 
                                   [0, 1, "Popped 15 balloons in Balloon Frenzy", Andromeda, 0], 
                                   [0, 1, "Traveled 500 meters in Sky Maze", Andromeda, 0]];

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
