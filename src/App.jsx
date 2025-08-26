import ArcadeStartscreen from "./components/ArcadeStartscreen.jsx";
import Continuationscreen from "./components/Continuationscreen.jsx";
import GameSelectionscreen from "./components/GameSelectionscreen.jsx";
import RulesandPointsscreen from "./components/RulesandPointsscreen.jsx";
import PrizeRoomscreen from "./components/PrizeRoomscreen.jsx";

import CWMStartscreen from "./CWMroom/components/Startscreen.jsx";
import CWMInstructionsscreen from "./CWMroom/components/Instructionsscreen.jsx";
import CWMMachineSelectionscreen from "./CWMroom/components/MachineSelectionscreen.jsx";
import CWMCatInstructionsscreen from "./CWMroom/components/CatMachineComponents/CatInstructionsscreen.jsx";
import CWMCatGamescreen from "./CWMroom/components/CatMachineComponents/CatGamescreen.jsx";
import CWMCatSummaryscreen from "./CWMroom/components/CatMachineComponents/CatSummaryscreen.jsx";
import CWMSportsInstructionsscreen from "./CWMroom/components/SportsMachineComponents/SportsInstructionsscreen.jsx";
import CWMSportsGamescreen from "./CWMroom/components/SportsMachineComponents/SportsGamescreen.jsx";
import CWMSportsSummaryscreen from "./CWMroom/components/SportsMachineComponents/SportsSummaryscreen.jsx";
import CWMSpaceInstructionsscreen from "./CWMroom/components/SpaceMachineComponents/SpaceInstructionsscreen.jsx";
import CWMSpaceGamescreen from "./CWMroom/components/SpaceMachineComponents/SpaceGamescreen.jsx";
import CWMSpaceSummaryscreen from "./CWMroom/components/SpaceMachineComponents/SpaceSummaryscreen.jsx";

import RPSStartscreen from "./RPSgame/components/Startscreen.jsx";
import RPSGamescreen from "./RPSgame/components/Gamescreen.jsx";
import RPSInstructionsscreen from "./RPSgame/components/Instructionsscreen.jsx";
import RPSSummaryscreen from "./RPSgame/components/Summaryscreen.jsx";
import RPSLevelSelectionscreen from "./RPSgame/components/LevelSelectionscreen.jsx";

import TTTStartscreen from "./TTTgame/components/Startscreen.jsx";
import TTTInstructionsscreen from "./TTTgame/components/Instructionsscreen.jsx";
import TTTGamescreen from "./TTTgame/components/Gamescreen.jsx";
import TTTTurnDecidingscreen from "./TTTgame/components/TurnDecidingscreen.jsx";
import TTTSummaryscreen from "./TTTgame/components/Summaryscreen.jsx";

import SNKStartscreen from "./SNKgame/components/Startscreen.jsx";
import SNKInstructionsscreen from "./SNKgame/components/Instructionsscreen.jsx";
import SNKGamescreen from "./SNKgame/components/Gamescreen.jsx";
import SNKSummaryscreen from "./SNKgame/components/Summaryscreen.jsx";

import SPIStartscreen from "./SPIgame/components/Startscreen.jsx";
import SPIInstructionsscreen from "./SPIgame/components/Instructionsscreen.jsx";
import SPIMissionscreen from "./SPIgame/components/Missionscreen.jsx";
import SPIM1Instructionsscreen from "./SPIgame/components/M1GameComponents/M1Instructionsscreen.jsx";
import SPIM2Instructionsscreen from "./SPIgame/components/M2GameComponents/M2Instructionsscreen.jsx";
import SPIM3Instructionsscreen from "./SPIgame/components/M3GameComponents/M3Instructionsscreen.jsx";
import SPIM4Instructionsscreen from "./SPIgame/components/M4GameComponents/M4Instructionsscreen.jsx";
import SPIM1Gamescreen from "./SPIgame/components/M1GameComponents/M1GameScreen.jsx";
import SPIM2Gamescreen from "./SPIgame/components/M2GameComponents/M2GameScreen.jsx";
import SPIM3Gamescreen from "./SPIgame/components/M3GameComponents/M3Gamescreen.jsx";
import SPIM4Gamescreen from "./SPIgame/components/M4GameComponents/M4Gamescreen.jsx";
import SPISummaryscreen from "./SPIgame/components/Summaryscreen.jsx";

import ORBStartscreen from "./ORBgame/components/Startscreen.jsx";
import ORBInstructionsscreen from "./ORBgame/components/Instructionsscreen.jsx";
import ORBGamescreen from "./ORBgame/components/Gamescreen.jsx";
import ORBSummaryscreen from "./ORBgame/components/Summaryscreen.jsx";

import CBLStartscreen from "./CBLgame/components/Startscreen.jsx";
import CBLInstructionsscreen from "./CBLgame/components/Instructionsscreen.jsx";
import CBLGamescreen from "./CBLgame/components/Gamescreen.jsx";
import CBLSummaryscreen from "./CBLgame/components/Summaryscreen.jsx";

import BFRStartscreen from "./BFRgame/components/Startscreen.jsx";
import BFRInstructionsscreen from "./BFRgame/components/Instructionsscreen.jsx";
import BFRGamescreen from "./BFRgame/components/Gamescreen.jsx";
import BFRSummaryscreen from "./BFRgame/components/Summaryscreen.jsx";

import SMZStartscreen from "./SMZgame/components/Startscreen.jsx";
import SMZInstructionsscreen from "./SMZgame/components/Instructionsscreen.jsx";
import SMZGamescreen from "./SMZgame/components/Gamescreen.jsx";
import SMZSummaryscreen from "./SMZgame/components/Summaryscreen.jsx";

import { useTermination } from './Providers/TerminationProvider.jsx';

import NoPage from "./components/NoPage.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import {HashRouter, Routes, Route} from 'react-router-dom';
import "./App.css";

function App() {

  const { Termination, setTermination } = useTermination();

  return (
    <div className = "innerboarder">
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route index element={Termination[0] ? <ArcadeStartscreen /> : <Continuationscreen />}/>
        
        <Route path="/arcadeStart" element={<ArcadeStartscreen />}/>
        <Route path="/continuation" element={<Continuationscreen />}/>
        <Route path="/rulesAndPoints" element={<RulesandPointsscreen />}/>
        <Route path="/prizeRoom" element={<PrizeRoomscreen />}/>
        <Route path="/selection" element={<GameSelectionscreen />}/>

        <Route path="/CWMstart" element={<CWMStartscreen />}/>
        <Route path="/CWMinstructions" element={<CWMInstructionsscreen />}/>
        <Route path="/CWMselection" element={<CWMMachineSelectionscreen />}/>
        <Route path="/CWMcatinstructions" element={<CWMCatInstructionsscreen />}/>
        <Route path="/CWMcatgame" element={<CWMCatGamescreen />}/>
        <Route path="/CWMcatsummary" element={<CWMCatSummaryscreen />}/>
        <Route path="/CWMsportsinstructions" element={<CWMSportsInstructionsscreen />}/>
        <Route path="/CWMsportsgame" element={<CWMSportsGamescreen />}/>
        <Route path="/CWMsportssummary" element={<CWMSportsSummaryscreen />}/>
        <Route path="/CWMspaceinstructions" element={<CWMSpaceInstructionsscreen />}/>
        <Route path="/CWMspacegame" element={<CWMSpaceGamescreen />}/>
        <Route path="/CWMspacesummary" element={<CWMSpaceSummaryscreen />}/>
        
        <Route path="/RPSstart" element={<RPSStartscreen />}/>
        <Route path="/RPSinstructions" element={<RPSInstructionsscreen />}/>
        <Route path="/RPSlevels" element={<RPSLevelSelectionscreen />}/>
        <Route path="/RPSgame" element={<RPSGamescreen />}/>
        <Route path="/RPSsummary" element={<RPSSummaryscreen />}/>

        <Route path="/TTTstart" element={<TTTStartscreen  />}/>
        <Route path="/TTTinstructions" element={<TTTInstructionsscreen />}/>
        <Route path="/TTTcoinflip" element={<TTTTurnDecidingscreen />}/>
        <Route path="/TTTgame" element={<TTTGamescreen />}/>
        <Route path="/TTTsummary" element={<TTTSummaryscreen />}/>

        <Route path="/SNKstart" element={<SNKStartscreen />}/>
        <Route path="/SNKinstructions" element={<SNKInstructionsscreen />}/>
        <Route path="/SNKgame" element={<SNKGamescreen />}/>
        <Route path="/SNKsummary" element={<SNKSummaryscreen />}/>

        <Route path="/SPIstart" element={<SPIStartscreen />}/>
        <Route path="/SPIinstructions" element={<SPIInstructionsscreen />}/>
        <Route path="/SPImission" element={<SPIMissionscreen />}/>
        <Route path="/SPIM1instructions" element={<SPIM1Instructionsscreen />}/>
        <Route path="/SPIM2instructions" element={<SPIM2Instructionsscreen />}/>
        <Route path="/SPIM3instructions" element={<SPIM3Instructionsscreen />}/>
        <Route path="/SPIM4instructions" element={<SPIM4Instructionsscreen />}/>
        <Route path="/SPIM1game" element={<SPIM1Gamescreen />}/>
        <Route path="/SPIM2game" element={<SPIM2Gamescreen />}/>
        <Route path="/SPIM3game" element={<SPIM3Gamescreen />}/>
        <Route path="/SPIM4game" element={<SPIM4Gamescreen />}/>
        <Route path="/SPIsummary" element={<SPISummaryscreen />}/>

        <Route path="/ORBstart" element={<ORBStartscreen />}/>
        <Route path="/ORBinstructions" element={<ORBInstructionsscreen />}/>
        <Route path="/ORBgame" element={<ORBGamescreen />}/>
        <Route path="/ORBsummary" element={<ORBSummaryscreen />}/>

        <Route path="/CBLstart" element={<CBLStartscreen />}/>
        <Route path="/CBLinstructions" element={<CBLInstructionsscreen />}/>
        <Route path="/CBLgame" element={<CBLGamescreen />}/>
        <Route path="/CBLsummary" element={<CBLSummaryscreen />}/>

        <Route path="/BFRstart" element={<BFRStartscreen />}/>
        <Route path="/BFRinstructions" element={<BFRInstructionsscreen />}/>
        <Route path="/BFRgame" element={<BFRGamescreen />}/>
        <Route path="/BFRsummary" element={<BFRSummaryscreen />}/>

        <Route path="/SMZstart" element={<SMZStartscreen />}/>
        <Route path="/SMZinstructions" element={<SMZInstructionsscreen />}/>
        <Route path="/SMZgame" element={<SMZGamescreen />}/>
        <Route path="/SMZsummary" element={<SMZSummaryscreen />}/>
        
        {/*Page doesn't exist error*/}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </HashRouter>
    </div>
  )
}

export default App
