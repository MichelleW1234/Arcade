import React from "react";
import ArcadeStartScreen from "./components/ArcadeStartScreen.jsx";
import GameSelectionScreen from "./components/GameSelectionScreen.jsx";

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
        <Route path="/selection" element={<GameSelectionScreen />}/>
        
        <Route path="/RPSstart" element={<RPSStartscreen />}/>
        <Route path="/RPSgame" element={<RPSGamescreen />}/>
        <Route path="/RPSinstructions" element={<RPSInstructionsscreen />}/>
        <Route path="/RPSsummary" element={<RPSSummaryscreen />}/>
        <Route path="/RPSlevels" element={<RPSLevelSelectionscreen />}/>

        <Route path="/TTThome" element={<TTTHomeScreen />}/>
        <Route path="/TTTinstructions" element={<TTTInstructionsScreen />}/>
        <Route path="/TTTcoinFlip" element={<TTTTurnDecidingScreen />}/>
        <Route path="/TTTgame" element={<TTTGameScreen />}/>
        <Route path="/TTTresults" element={<TTTResultsScreen />}/>

        {/*Page doesn't exist error*/}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
