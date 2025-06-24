
import { Link } from 'react-router-dom';
import { useState } from 'react';

import alienMutant from "../../../Images/image 10.svg";
import alien from "../../../Images/image 8.svg";
import laser from "../../../Images/image 9.svg";
import laserMutant from "../../../Images/image 12.svg";
import laserCannon from "../../../Images/image 18.svg";

import {playSound} from '../../../Helpers/helpers.js';

import "../gameInstructions.css";

function M3InstructionsScreen() {

  const [aliensDetectedOn, setAliensDetectedOn] = useState(false);
  const [waveInfoOn, setWaveInfoOn] = useState(false);
  const [equipmentOn, setEquipmentOn] = useState(false);

  const openingGuide = (flagNumber) => {

    if (flagNumber == 1){

      setAliensDetectedOn(true);

    } else if (flagNumber == 2){

      setWaveInfoOn(true);

    } else {

      setEquipmentOn(true);

    }
    
    playSound(3);

  }


  const closingGuide = (flagNumber) => {

    if (flagNumber == 1){

      setAliensDetectedOn(false);

    } else if (flagNumber == 2){

      setWaveInfoOn(false);

    } else {

      setEquipmentOn(false);

    }
    
    playSound(3);

  }

  return (

    <div className = "screenLayout">

      <h1 className = "instructionsSign"> Station 3: The Core </h1>

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
                <img src={alienMutant} ></img> - Mutant  <br/>
                  &nbsp; &bull; Laser Weakness: <img src={laserMutant} ></img> <br/> 
                  &nbsp; &bull; Special Abilities: None <br/> <br/>
              </p>

              <button className = "SPIGuideCloseButtons" onClick={() => closingGuide(1)}> Close </button>
            </div>
          </div>

        ) : (

          <button className = "SPIGuideButton"  onClick = {() => openingGuide(1)}> Alien Guide
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

              <button className = "SPIGuideCloseButtons" onClick={() => closingGuide(2)}> Close </button>
            </div>
          </div>

        ) : (

          <button className = "SPIGuideButton" onClick = {() => openingGuide(2)}> Wave Guide
          </button>
        )}

        {equipmentOn === true ? (
        
          <div className = "SPIMissionInfofloatingFlag">
            <div className = "SPIGuideContainer">
              <h3>Equipment:</h3>
              <p>
                <img src={laserCannon} ></img> - Laser Cannon <br/> <br/>
                &nbsp; &bull; Modes: <br/>
                &nbsp; &bull; Pulse Type - Normal: <img src={laser} ></img> <br/>
                &nbsp; &bull; Pulse Type - Mutant: <img src={laserMutant} ></img> <br/>
                &nbsp; &bull; To Use: Move slider to aim at target. Press buttom to switch between modes. <br/>
              </p>
              <button className = "SPIGuideCloseButtons" onClick={() => closingGuide(3)}> Close </button>
            </div>
          </div>

        ) : (

          <button className = "SPIGuideButton" onClick = {() => openingGuide(3)}> Equipment Guide
          </button>

        )}

      </div>

      <div className = "generalbuttonContainer">
        <Link to= "/SPIgameM3" className = "generalbuttonGlitch" onClick = {() => playSound(7)}>
            Enter Zone
        </Link>
      </div>
      
    </div>

  )

}
  
export default M3InstructionsScreen
