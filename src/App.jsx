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

import SPIStartScreen from "./SPIgame/components/StartScreen.jsx";
import SPIinstructionsScreen from "./SPIgame/components/instructionsScreen.jsx";
import SPImissionScreen from "./SPIgame/components/missionScreen.jsx";
import SPIM1InstructionsScreen from "./SPIgame/components/M1components/M1InstructionsScreen.jsx";
import SPIM2InstructionsScreen from "./SPIgame/components/M2components/M2InstructionsScreen.jsx";
import SPIM3InstructionsScreen from "./SPIgame/components/M3components/M3InstructionsScreen.jsx";
import SPIM4InstructionsScreen from "./SPIgame/components/M4components/M4InstructionsScreen.jsx";
import SPIgameScreenM1 from "./SPIgame/components/M1components/gameScreenM1.jsx";
import SPIgameScreenM2 from "./SPIgame/components/M2components/gameScreenM2.jsx";
import SPIgameScreenM3 from "./SPIgame/components/M3components/gameScreenM3.jsx";
import SPIgameScreenM4 from "./SPIgame/components/M4components/gameScreenM4.jsx";
import SPIsummaryScreen from "./SPIgame/components/summaryScreen.jsx";

import ORBStartScreen from "./ORBgame/components/StartScreen.jsx";
import ORBinstructionsScreen from "./ORBgame/components/InstructionsScreen.jsx";
import ORBgameScreen from "./ORBgame/components/GameScreen.jsx";
import ORBsummaryScreen from "./ORBgame/components/SummaryScreen.jsx";

import NoPage from "./components/NoPage.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import {HashRouter, Routes, Route, BrowserRouter } from 'react-router-dom';
import "./App.css";

function App() {


  return (
    <div className = "innerboarder">
    <BrowserRouter>
    {/*<HashRouter>*/}
      <ScrollToTop />
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

        <Route path="/SPIstart" element={<SPIStartScreen />}/>
        <Route path="/SPIinstructions" element={<SPIinstructionsScreen />}/>
        <Route path="/SPImission" element={<SPImissionScreen />}/>
        <Route path="/SPIM1Instructions" element={<SPIM1InstructionsScreen />}/>
        <Route path="/SPIM2Instructions" element={<SPIM2InstructionsScreen />}/>
        <Route path="/SPIM3Instructions" element={<SPIM3InstructionsScreen />}/>
        <Route path="/SPIM4Instructions" element={<SPIM4InstructionsScreen />}/>
        <Route path="/SPIgameM1" element={<SPIgameScreenM1 />}/>
        <Route path="/SPIgameM2" element={<SPIgameScreenM2 />}/>
        <Route path="/SPIgameM3" element={<SPIgameScreenM3 />}/>
        <Route path="/SPIgameM4" element={<SPIgameScreenM4 />}/>
        <Route path="/SPIsummary" element={<SPIsummaryScreen />}/>

        <Route path="/ORBstart" element={<ORBStartScreen />}/>
        <Route path="/ORBInstructions" element={<ORBinstructionsScreen />}/>
        <Route path="/ORBgame" element={<ORBgameScreen />}/>
        <Route path="/ORBsummary" element={<ORBsummaryScreen />}/>
        
        {/*Page doesn't exist error*/}
        <Route path="*" element={<NoPage />} />
      </Routes>
    {/*</HashRouter>*/}
    </BrowserRouter>
    </div>
  )
}

export default App
