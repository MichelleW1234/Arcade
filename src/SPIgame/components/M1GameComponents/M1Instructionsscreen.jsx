import { Link } from 'react-router-dom';
import { useState } from 'react';

import alien from "../../../Images/image 8.svg";
import laser from "../../../Images/image 9.svg";
import laserCannon from "../../../Images/image 17.svg";

import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { useSPIUser } from '../../Providers/SPIUserProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';

import {playSound} from '../../../Helpers/helpers.js';
import {openingGuide, closingGuide, quitGame} from '../../Helpers/helpers.js';

import "../GameInstructionsscreen.css";

function M1Instructionsscreen() {

  const { ActiveGame, setActiveGame} = useActiveGame();
  const { Player, setPlayer } = usePlayer();
  const {SPIUser, setSPIUser} = useSPIUser();

  const [aliensDetectedOn, setAliensDetectedOn] = useState(false);
  const [waveInfoOn, setWaveInfoOn] = useState(false);
  const [equipmentOn, setEquipmentOn] = useState(false);
  
  return (

    <div className = "screenLayout">

      <h1 className = "instructionsSign"> Station 1: Hive outskirts </h1>

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
              </p>

              <button className = "SPIGuideCloseButtons" onClick={() => setAliensDetectedOn(closingGuide())}> Close </button>
            </div>
          </div>

        ) : (

          <button className = "SPIGuideButton"  onClick = {() => setAliensDetectedOn(openingGuide())}> Alien Guide
          </button>
        )}

        {waveInfoOn === true ? (

          <div className = "SPIMissionInfofloatingFlag">
            <div className="SPIGuideContainer">
              <h3> Waves Detected: </h3>
              <p>
                &gt; Waves to Eliminate: 5 <br/>
                &gt; Wave Size: 10 <br/> <br/>
              </p>

              <button className = "SPIGuideCloseButtons" onClick={() => setWaveInfoOn(closingGuide())}> Close </button>
            </div>
          </div>


        ) : (

          <button className = "SPIGuideButton" onClick = {() => setWaveInfoOn(openingGuide())}> Wave Guide
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

          <button className = "SPIGuideButton" onClick = {() => setEquipmentOn(openingGuide())}> Equipment Guide
          </button>

        )}

      </div>

      <div className = "generalbuttonContainer">
        <Link to= "/selection" className = "generalbutton" onClick={() => quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame)}>
          Quit Game
        </Link>
        <Link to= "/SPIM1game" className = "generalbuttonGlitch" onClick = {() => playSound(7)}>
          Enter Zone
        </Link>
      </div>
      
    </div>

  )

}
  
  export default M1Instructionsscreen
