import { Link } from 'react-router-dom';

import alien from "../../../Images/image 8.svg";
import laser from "../../../Images/image 9.svg";
import laserCannon from "../../../Images/image 17.svg";

import {playSound} from '../../../Helpers/helpers.js';

function M1InstructionsScreen() {

  return (

    <div className = "screenLayout">

      <h1 className = "instructionsSign"> Station 1: Hive outskirts </h1>

      <p className = "largefont">   
        &gt; Mission Description: Exterminate all oncoming waves before they reach you. <br/> <br/>
        &gt; Aliens Detected:<br/> <br/>
        &nbsp; &nbsp; &gt; <img src={alien} ></img> - Soldier  <br/> <br/>
        &nbsp; &nbsp; &nbsp; &bull; Laser Weakness: <img src={laser} ></img> <br/>
        &nbsp; &nbsp; &nbsp; &bull; Special Abilities: None <br/> <br/>
        &gt; Waves to Eliminate: 5 <br/>
        &gt; Wave Size: 10 <br/> <br/>
        &gt; Equipment: <br/><br/>
        &nbsp; &nbsp; &gt; <img src={laserCannon} ></img> - Laser Cannon <br/> <br/>
        &nbsp; &nbsp; &nbsp; &bull; Pulse Type: <img src={laser} ></img> <br/>
        &nbsp; &nbsp; &nbsp; &bull; To Use: Move slider to aim at target <br/>
      </p>

      <div className = "generalbuttonContainer">
        <Link to= "/SPIgameM1" className = "generalbuttonGlitch" onClick = {() => playSound(7)}>
          Enter Zone
        </Link>
      </div>
      
    </div>

  )

}
  
  export default M1InstructionsScreen
