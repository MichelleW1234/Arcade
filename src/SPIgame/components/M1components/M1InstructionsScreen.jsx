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
        &gt; Mission description: Exterminate all oncoming waves before they reach you. <br/> <br/>
        &gt; Aliens detected:<br/> <br/>
        &nbsp; &nbsp; &gt; <img src={alien} ></img> - Soldier  <br/> <br/>
        &nbsp; &nbsp; &nbsp; &bull; Laser weakness: <img src={laser} ></img> <br/>
        &nbsp; &nbsp; &nbsp; &bull; Special abilities: None <br/> <br/>
        &gt; Waves to eliminate: 5 <br/>
        &gt; Wave size: 10 <br/> <br/>
        &gt; Equipment: <br/><br/>
        &nbsp; &nbsp; &gt; <img src={laserCannon} ></img> - laser cannon <br/> <br/>
        &nbsp; &nbsp; &nbsp; &bull; ammunition: <img src={laser} ></img> <br/>
        &nbsp; &nbsp; &nbsp; &bull; To use: move slider to aim at target <br/>
        &nbsp; &nbsp; &nbsp; &bull; Unlimited ammunition<br/>
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
