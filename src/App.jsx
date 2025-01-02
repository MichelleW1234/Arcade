import React from "react";
import Startscreen from "./RPSgame/components/Startscreen.jsx";
import Gamescreen from "./RPSgame/components/Gamescreen.jsx";
import Instructionsscreen from "./RPSgame/components/Instructionsscreen.jsx";
import Summaryscreen from "./RPSgame/components/Gamesummary.jsx";
import NoPage from "./RPSgame/components/NoPage.jsx";
import LevelSelectionscreen from "./RPSgame/components/LevelSelectionscreen.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";

function App() {

  return (
    <div className = "innerboarder">
    <BrowserRouter>
      <Routes>
        <Route index element={<Startscreen />}/>
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
