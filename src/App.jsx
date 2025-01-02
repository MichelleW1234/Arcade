import React from "react";
import ArcadeStartScreen from "./components/ArcadeStartScreen.jsx";
import GameSelectionScreen from "./components/GameSelectionScreen.jsx";


import Startscreen from "./RPSgame/components/RPSStartscreen.jsx";
import Gamescreen from "./RPSgame/components/RPSGamescreen.jsx";
import Instructionsscreen from "./RPSgame/components/RPSInstructionsscreen.jsx";
import Summaryscreen from "./RPSgame/components/RPSGamesummary.jsx";
import NoPage from "./components/NoPage.jsx";
import LevelSelectionscreen from "./RPSgame/components/RPSLevelSelectionscreen.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";

function App() {

  return (
    <div className = "innerboarder">
    <BrowserRouter>
      <Routes>
        <Route index element={<ArcadeStartScreen />}/>
        <Route path="/arcadeStart" element={<GameSelectionScreen />}/>
        <Route path="/selection" element={<GameSelectionScreen />}/>
        
        <Route path="/start" element={<Startscreen />}/>
        <Route path="/game" element={<Gamescreen />}/>
        <Route path="/instructions" element={<Instructionsscreen />}/>
        <Route path="/summary" element={<Summaryscreen />}/>
        <Route path="/levels" element={<LevelSelectionscreen />}/>

        {/*Page doesn't exist error*/}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
