import { useNavigate, Link } from 'react-router-dom';
import { useState} from 'react';
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";
import { useExitPoints } from "../../../hooks/useExitPoints";
import { storage } from "../../../storage";

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
  const { setSPIUser} = useSPIUser();

  const [aliensDetectedOn, setAliensDetectedOn] = useState(false);
  const [waveInfoOn, setWaveInfoOn] = useState(false);
  const [equipmentOn, setEquipmentOn] = useState(false);


  const navigate = useNavigate();

  useKeyboardShortcut("Enter", () => {
    if (aliensDetectedOn === false && waveInfoOn === false && equipmentOn === false){
      playSound(7);
      navigate("/SPIM2game");
    }
  },
    ".EnterZone"
  );

  useKeyboardShortcut("Escape", () => {
    if (aliensDetectedOn === false && waveInfoOn === false && equipmentOn === false){
      quitGame(setSPIUser, setPlayer, ActiveGame, setActiveGame);
      navigate("/selection");
    }
  },
    ".QuitGame"
  );

  useKeyboardShortcut("1", () => {
    if (waveInfoOn === false && equipmentOn === false){
      if (aliensDetectedOn === true){

        setAliensDetectedOn(closingGuide());

      } else {

        setAliensDetectedOn(openingGuide());

      }
    }
  },
    ".AlienGuide"
  );

  useKeyboardShortcut("2", () => {
    if (aliensDetectedOn === false && equipmentOn === false){
      if (waveInfoOn === true){

        setWaveInfoOn(closingGuide());

      } else {

        setWaveInfoOn(openingGuide());

      }
    }
  },
    ".WaveGuide"
  );

  useKeyboardShortcut("3", () => {
    if (waveInfoOn === false && aliensDetectedOn === false){
      if (equipmentOn === true){

        setEquipmentOn(closingGuide());

      } else {

        setEquipmentOn(openingGuide());

      }
    }
  },
    ".EquipmentGuide"
  );
  

  useExitPoints(() => {
      const adjustedPoints = [Player[0] - ActiveGame[1]];
      storage.set("Player", adjustedPoints);
      setPlayer(adjustedPoints);
  });



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
                <img src={alien} alt = "" /> - Soldier  <br/> <br/>
                &nbsp; &bull; Laser Weakness: <img src={laser} alt = "" /> <br/>
                &nbsp; &bull; Special Abilities: None <br/> <br/>
                <img src={alienArmored} alt = "" /> - Sentinel <br/> <br/>
                &nbsp; &bull; Laser Weakness: RESISTANT <br/>
                &nbsp; &bull; Special Abilities: Shifting positions <br/>
                &nbsp; &bull; Other Notes: Can be scared off if all other alien types are eliminated. <br/> <br/>
              </p>

              <button className = "SPIGuideCloseButtons" onClick={() => setAliensDetectedOn(closingGuide())}> Close </button>
            </div>
          </div>

        ) : (

          <button className = "SPIGuideButton AlienGuide"  onClick = {() => setAliensDetectedOn(openingGuide())}>
            <div className="buttonNameContainer"> Alien Guide <br/> <span className = "buttonKeyDescription"> [1] </span></div> 
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

          <button className = "SPIGuideButton WaveGuide" onClick = {() => setWaveInfoOn(openingGuide())}> 
            <div className="buttonNameContainer">Wave Guide<br/> <span className = "buttonKeyDescription"> [2] </span></div>
          </button>
        )}

        {equipmentOn === true ? (
        
          <div className = "SPIMissionInfofloatingFlag">
            <div className = "SPIGuideContainer">
              <h3>Equipment:</h3>
              <p>
                <img src={laserCannon} alt = "" /> - Laser Cannon <br/> <br/>
                  &nbsp; &bull; Pulse Type: <img src={laser} alt = "" /> <br/>
                  &nbsp; &bull; To Use: Move slider [ &larr; ] and [ &rarr; ] to aim at target <br/>
              </p>
              <button className = "SPIGuideCloseButtons" onClick={() => setEquipmentOn(closingGuide())}> Close </button>
            </div>
          </div>

        ) : (

          <button className = "SPIGuideButton EquipmentGuide" onClick = {() => setEquipmentOn(openingGuide())}>
            <div className="buttonNameContainer">Equipment Guide <br/> <span className = "buttonKeyDescription"> [3] </span></div>
          </button>

        )}
        
      </div>

      <div className = "generalbuttonContainer">
        <Link to= "/selection" className = "generalbutton QuitGame" onClick={() => quitGame(setSPIUser, setPlayer, ActiveGame, setActiveGame)}>
          <div className="buttonNameContainer"> Quit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
        </Link>
        <Link to= "/SPIM2game" className = "generalbuttonGlitch EnterZone" onClick = {() => playSound(7)}>
          <div className="buttonNameContainer"> Enter Zone <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
        </Link>
      </div>
      
    </div>

  )

}
  
export default M2Instructionsscreen;
