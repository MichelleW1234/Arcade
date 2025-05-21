import React from "react";
import ArcadeStartScreen from "./components/ArcadeStartScreen.jsx";
import GameSelectionScreen from "./components/GameSelectionScreen.jsx";
import RulesandPointsScreen from "./components/RulesandPointsScreen.jsx";
import PrizeRoomScreen from "./components/PrizeRoomScreen.jsx";

import RPSStartscreen from "./RPSgame/components/RPSStartscreen.jsx";
import RPSGamescreen from "./RPSgame/components/RPSGamescreen.jsx";
import RPSInstructionsscreen from "./RPSgame/components/RPSInstructionsscreen.jsx";
import RPSSummaryscreen from "./RPSgame/components/RPSGamesummary.jsx";
import RPSLevelSelectionscreen from "./RPSgame/components/RPSLevelSelectionscreen.jsx";

import TTTHomeScreen from "./TTTgame/components/homeScreen.jsx";
import TTTInstructionsScreen from "./TTTgame/components/instructionsScreen.jsx";
import TTTGameScreen from "./TTTgame/components/gameScreen.jsx";
import TTTTurnDecidingScreen from "./TTTgame/components/turnDecidingScreen.jsx";
import TTTResultsScreen from "./TTTgame/components/resultsScreen.jsx";

import SNKStartScreen from "./SNKgame/components/StartScreen.jsx";
import SNKInstructionsScreen from "./SNKgame/components/InstructionsScreen.jsx";
import SNKGameScreen from "./SNKgame/components/GameScreen.jsx";
import SNKResultsScreen from "./SNKgame/components/ResultsScreen.jsx";

import THRStartScreen from "./THRgame/components/StartScreen.jsx";
import THRinstructionsScreen from "./THRgame/components/instructionsScreen.jsx";
import THRmissionScreen from "./THRgame/components/missionScreen.jsx";
import THRM1InstructionsScreen from "./THRgame/components/M1components/M1InstructionsScreen.jsx";
import THRM2InstructionsScreen from "./THRgame/components/M2components/M2InstructionsScreen.jsx";
import THRM3InstructionsScreen from "./THRgame/components/M3components/M3InstructionsScreen.jsx";
import THRgameScreenM1 from "./THRgame/components/M1components/gameScreenM1.jsx";
import THRgameScreenM2 from "./THRgame/components/M2components/gameScreenM2.jsx";
import THRgameScreenM3 from "./THRgame/components/M3components/gameScreenM3.jsx";
import THRsummaryScreen from "./THRgame/components/summaryScreen.jsx";

import NoPage from "./components/NoPage.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";

function App() {

  return (
    <div className = "innerboarder">
    <BrowserRouter>
      <Routes>
        <Route index element={<ArcadeStartScreen />}/>
        <Route path="/arcadeStart" element={<ArcadeStartScreen />}/>
        <Route path="/rulesAndPoints" element={<RulesandPointsScreen />}/>
        <Route path="/prizeRoom" element={<PrizeRoomScreen />}/>
        <Route path="/selection" element={<GameSelectionScreen />}/>
        
        <Route path="/RPSstart" element={<RPSStartscreen />}/>
        <Route path="/RPSinstructions" element={<RPSInstructionsscreen />}/>
        <Route path="/RPSlevels" element={<RPSLevelSelectionscreen />}/>
        <Route path="/RPSgame" element={<RPSGamescreen />}/>
        <Route path="/RPSsummary" element={<RPSSummaryscreen />}/>

        <Route path="/TTThome" element={<TTTHomeScreen />}/>
        <Route path="/TTTinstructions" element={<TTTInstructionsScreen />}/>
        <Route path="/TTTcoinFlip" element={<TTTTurnDecidingScreen />}/>
        <Route path="/TTTgame" element={<TTTGameScreen />}/>
        <Route path="/TTTresults" element={<TTTResultsScreen />}/>

        <Route path="/SNKstart" element={<SNKStartScreen />}/>
        <Route path="/SNKinstructions" element={<SNKInstructionsScreen />}/>
        <Route path="/SNKgame" element={<SNKGameScreen />}/>
        <Route path="/SNKresults" element={<SNKResultsScreen />}/>

        <Route path="/THRstart" element={<THRStartScreen />}/>
        <Route path="/THRinstructions" element={<THRinstructionsScreen />}/>
        <Route path="/THRmission" element={<THRmissionScreen />}/>
        <Route path="/THRM1Instructions" element={<THRM1InstructionsScreen />}/>
        <Route path="/THRM2Instructions" element={<THRM2InstructionsScreen />}/>
        <Route path="/THRM3Instructions" element={<THRM3InstructionsScreen />}/>
        <Route path="/THRgameM1" element={<THRgameScreenM1 />}/>
        <Route path="/THRgameM2" element={<THRgameScreenM2 />}/>
        <Route path="/THRgameM3" element={<THRgameScreenM3 />}/>
        <Route path="/THRsummary" element={<THRsummaryScreen />}/>

        {/*Page doesn't exist error*/}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
