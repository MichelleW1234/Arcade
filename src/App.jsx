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
import THRgameScreen from "./THRgame/components/gameScreen.jsx";
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
        <Route path="/THRgame" element={<THRgameScreen />}/>
        <Route path="/THRsummary" element={<THRsummaryScreen />}/>

        {/*Page doesn't exist error*/}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
