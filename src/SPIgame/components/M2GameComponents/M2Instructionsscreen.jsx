import { Link } from 'react-router-dom';
import { useState } from 'react';

import alienArmored from "../../../Images/image 11.svg";
import alien from "../../../Images/image 8.svg";
import laser from "../../../Images/image 9.svg";
import laserCannon from "../../../Images/image 17.svg";

import {openingGuide, closingGuide} from '../../Helpers/helpers.js';
import {playSound} from '../../../Helpers/helpers.js';

import "../GameInstructionsscreen.css";

function M2Instructionsscreen() {

  const [aliensDetectedOn, setAliensDetectedOn] = useState(false);
  const [waveInfoOn, setWaveInfoOn] = useState(false);
  const [equipmentOn, setEquipmentOn] = useState(false);

  return (

    <div className = "screenLayout">

      <h1 className = "instructionsSign"> Station 2: Entry </h1>

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

          <button className = "SPIGuideButton"  onClick = {() => setAliensDetectedOn(openingGuide())}> Alien Guide
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
        <Link to= "/SPIM2game" className = "generalbuttonGlitch" onClick = {() => playSound(7)}>
            Enter Zone
        </Link>
      </div>
      
    </div>

  )

}
  
export default M2Instructionsscreen;
