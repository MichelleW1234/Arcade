import { useNavigate, Link } from 'react-router-dom';
import { useState} from 'react';
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";

import boss from "../../../Images/image 13.svg";
import bossDanger from "../../../Images/image 14.svg";
import rifle from "./M4GameScreenComponents/cursor.cur";
import beamlight from "../../../Images/image 15.svg";
import hpbar from "../../../Images/image 16.svg";

import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { useSPIUser } from '../../Providers/SPIUserProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';

import {playSound} from '../../../Helpers/helpers.js';
import {openingGuide, closingGuide, quitGame} from '../../Helpers/helpers.js';

import "../GameInstructionsscreen.css";

function M4Instructionsscreen() {

  const { ActiveGame, setActiveGame} = useActiveGame();
  const { Player, setPlayer } = usePlayer();
  const {SPIUser, setSPIUser} = useSPIUser();

  const [aliensDetectedOn, setAliensDetectedOn] = useState(false);
  const [equipmentOn, setEquipmentOn] = useState(false);


  const navigate = useNavigate();
  
  useKeyboardShortcut("Enter", () => {
    if (aliensDetectedOn == false && equipmentOn == false){
      playSound(7);
      navigate("/SPIM4game");
    }
  },
    ".EnterZone"
  );

  useKeyboardShortcut("Escape", () => {
    if (aliensDetectedOn == false && equipmentOn == false){
      quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame);
      navigate("/selection");
    }
  },
    ".QuitGame"
  );

  useKeyboardShortcut("1", () => {
    if (equipmentOn == false){
      if (aliensDetectedOn == true){
        setAliensDetectedOn(closingGuide());
      } else {
        setAliensDetectedOn(openingGuide());
      }
    }
  },
    ".AlienGuide"
  );

  useKeyboardShortcut("2", () => {
    if (aliensDetectedOn == false){
      if (equipmentOn == true){
        setEquipmentOn(closingGuide());
      } else {
        setEquipmentOn(openingGuide());
      }
    }
  },
    ".EquipmentGuide"
  );



  return (

    <div className = "screenLayout">

      <h1 className = "instructionsSign"> <span className='signGlitch'> Station 4: The Nest </span></h1>

      <h1 className = "SPIMissionDescription"> 
        Mission Description: Defeat the boss.
      </h1>

      <div className = "SPIGuideButtonContainer">  

        {aliensDetectedOn === true ? (
        
          <div className = "SPIMissionInfofloatingFlag">
            <div className = "SPIGuideContainer">
              <h3>Aliens Detected:</h3>
              <p>
                <img src={boss} ></img> - The Queen  <br/> <br/>
                &nbsp; &bull; Special Abilities: Shifting positions, different states, heightened power<br/> <br/>
                &nbsp; &bull; Normal State: <img src={boss} ></img> - Okay to shoot <br/> <br/>
                &nbsp; &bull; Explosive State: <img src={bossDanger} ></img> - DO NOT shoot <br/> <br/>
                &nbsp; &bull; Other Notes: Do NOT let your light source go out before the Queen dies. <br/> <br/>
              </p>

              <button className = "SPIGuideCloseButtons" onClick={() => setAliensDetectedOn(closingGuide())}> Close </button>
            </div>
          </div>

        ) : (

          <button className = "SPIGuideButton AlienGuide" onClick = {() => setAliensDetectedOn(openingGuide())}> Alien Guide
          </button>
        )}
        
        {equipmentOn === true ? (
        
          <div className = "SPIMissionInfofloatingFlag">
            <div className = "SPIGuideContainer">
              <h3>Equipment:</h3>
              <p>
                <img src={beamlight} ></img> - Beamlight <br/> <br/>
                &nbsp; &bull; Illuminates objects in complete darkness <br/>
                &nbsp; &bull; Battery Life: 60 seconds <br/> <br/>
                <img src={hpbar} ></img> - Health Bar <br/> <br/>
                &nbsp; &bull; Tracks health status of enemy <br/> <br/>
                <img src={rifle} ></img> - Laser Rifle<br/> <br/>
                &nbsp; &bull; First-person weapon designed for precision firing <br/>
                &nbsp; &bull; To Use: Aim at target and click <br/>
              </p>
              <button className = "SPIGuideCloseButtons" onClick={() => setEquipmentOn(closingGuide())}> Close </button>
            </div>
          </div>

        ) : (

          <button className = "SPIGuideButton EquipmentGuide" onClick = {() => setEquipmentOn(openingGuide())}> Equipment Guide
          </button>

        )}

      </div>

      <div className = "generalbuttonContainer">
        <Link to= "/selection" className = "generalbutton QuitGame" onClick={() => quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame)}>
          Quit Game
        </Link>
        <Link to= "/SPIM4game" className = "generalbuttonGlitch EnterZone" onClick = {() => playSound(7)}>
            Enter Zone
        </Link>
      </div>
      
    </div>

  )

}
  
export default M4Instructionsscreen;

