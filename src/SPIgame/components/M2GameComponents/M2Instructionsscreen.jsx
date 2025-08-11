import { useNavigate, Link } from 'react-router-dom';
import { useState} from 'react';
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";

import alienArmored from "../../../Images/image 11.svg";
import alien from "../../../Images/image 8.svg";
import laser from "../../../Images/image 9.svg";
import laserCannon from "../../../Images/image 17.svg";

import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { useSPIUser } from '../../Providers/SPIUserProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';

import {playSound} from '../../../Helpers/helpers.js';
import {openingGuide, closingGuide, quitGame} from '../../Helpers/helpers.js';

import "../GameInstructionsscreen.css";

function M2Instructionsscreen() {

  const { ActiveGame, setActiveGame} = useActiveGame();
  const { Player, setPlayer } = usePlayer();
  const {SPIUser, setSPIUser} = useSPIUser();

  const [aliensDetectedOn, setAliensDetectedOn] = useState(false);
  const [waveInfoOn, setWaveInfoOn] = useState(false);
  const [equipmentOn, setEquipmentOn] = useState(false);


  const navigate = useNavigate();

  useKeyboardShortcut("Enter", () => {
    if (aliensDetectedOn == false && waveInfoOn == false && equipmentOn == false){
      playSound(7);
      navigate("/SPIM2game");
    }
  },
    ".EnterZone"
  );

  useKeyboardShortcut("Escape", () => {
    if (aliensDetectedOn == false && waveInfoOn == false && equipmentOn == false){
      quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame);
      navigate("/selection");
    }
  },
    ".QuitGame"
  );

  useKeyboardShortcut("1", () => {
    if (waveInfoOn == false && equipmentOn == false){
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
    if (aliensDetectedOn == false && equipmentOn == false){
      if (waveInfoOn == true){

        setWaveInfoOn(closingGuide());

      } else {

        setWaveInfoOn(openingGuide());

      }
    }
  },
    ".WaveGuide"
  );

  useKeyboardShortcut("3", () => {
    if (waveInfoOn == false && aliensDetectedOn == false){
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

      <h1 className = "instructionsSign"> <span className='signGlitch'>Station 2: Entry</span></h1>

      <h1 className = "SPIMissionDescription"> 
        Mission Description: Exterminate all oncoming waves before they reach you.
      </h1>

      <div className = "SPIGuideButtonContainer">
        {aliensDetectedOn === true ? (
        
          <div className = "SPIMissionInfofloatingFlag">
            <div className = "SPIGuideContainer">
              <h3>Aliens Detected:</h3>
              <p>
                <img src={alien} ></img> - Soldier  <br/> <br/>
                &nbsp; &bull; Laser Weakness: <img src={laser} ></img> <br/>
                &nbsp; &bull; Special Abilities: None <br/> <br/>
                <img src={alienArmored} ></img> - Sentinel <br/> <br/>
                &nbsp; &bull; Laser Weakness: RESISTANT <br/>
                &nbsp; &bull; Special Abilities: Shifting positions <br/>
                &nbsp; &bull; Other Notes: Can be scared off if all other alien types are eliminated. <br/> <br/>
              </p>

              <button className = "SPIGuideCloseButtons" onClick={() => setAliensDetectedOn(closingGuide())}> Close </button>
            </div>
          </div>

        ) : (

          <button className = "SPIGuideButton AlienGuide"  onClick = {() => setAliensDetectedOn(openingGuide())}> Alien Guide
          </button>

        )} 

        {waveInfoOn === true ? (

          <div className = "SPIMissionInfofloatingFlag">
            <div className="SPIGuideContainer">
              <h3> Waves Detected: </h3>
              <p>
                &gt; Waves to Eliminate: 5 <br/>
                &gt; Wave Size: 20 <br/> <br/>
              </p>

              <button className = "SPIGuideCloseButtons" onClick={() => setWaveInfoOn(closingGuide())}> Close </button>
            </div>
          </div>


        ) : (

          <button className = "SPIGuideButton WaveGuide" onClick = {() => setWaveInfoOn(openingGuide())}> Wave Guide
          </button>
        )}

        {equipmentOn === true ? (
        
          <div className = "SPIMissionInfofloatingFlag">
            <div className = "SPIGuideContainer">
              <h3>Equipment:</h3>
              <p>
                <img src={laserCannon} ></img> - Laser Cannon <br/> <br/>
                  &nbsp; &bull; Pulse Type: <img src={laser} ></img> <br/>
                  &nbsp; &bull; To Use: Move slider to aim at target <br/>
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
        <Link to= "/SPIM2game" className = "generalbuttonGlitch EnterZone" onClick = {() => playSound(7)}>
            Enter Zone
        </Link>
      </div>
      
    </div>

  )

}
  
export default M2Instructionsscreen;
