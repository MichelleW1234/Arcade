import { Link } from 'react-router-dom';

import boss from "../../../Images/image 13.svg";
import bossDanger from "../../../Images/image 14.svg";
import rifle from "./gameScreenM4Components/cursor.cur";
import beamlight from "../../../Images/image 15.svg";
import hpbar from "../../../Images/image 16.svg";

import {playSound} from '../../../Helpers/helpers.js';

function M4InstructionsScreen() {

  return (

    <div className = "screenLayout">

      <h1 className = "instructionsSign"> Station 4: The Nest </h1>

      <p className = "largefont">   
        &gt; Mission description: Defeat the queen <br/> <br/>
        &gt; Aliens detected:<br/> <br/>
        &nbsp; &nbsp; &gt; <img src={boss} ></img> - The Queen  <br/> <br/>
        &nbsp; &nbsp; &nbsp; &bull; Special abilities: Shifting positions, Switching between states<br/> <br/>
        &nbsp; &nbsp; &nbsp; &bull; Normal state: <img src={boss} ></img> - okay to shoot <br/> <br/>
        &nbsp; &nbsp; &nbsp; &bull; Explosive state: <img src={bossDanger} ></img> - DO NOT shoot <br/> <br/>
        &nbsp; &nbsp; &nbsp; &bull; Other notes: Do NOT let your light go out before it's dead. <br/> <br/>
        &gt; Equipment: <br/> <br/>
        &nbsp; &nbsp; &gt; <img src={beamlight} ></img> - Beamlight <br/> <br/>
        &nbsp; &nbsp; &nbsp; &bull; Illuminates objects in complete darkness <br/>
        &nbsp; &nbsp; &nbsp; &bull; Battery life: 60 seconds <br/> <br/>
        &nbsp; &nbsp; &gt; <img src={rifle} ></img> - Laser rifle<br/> <br/>
        &nbsp; &nbsp; &nbsp; &bull; First-person weapon designed for precision firing <br/>
        &nbsp; &nbsp; &nbsp; &bull; To use: Aim at target and click <br/>
        &nbsp; &nbsp; &nbsp; &bull; Unlimited ammunition <br/> <br/>
        &nbsp; &nbsp; &gt; <img src={hpbar} ></img> - Health bar <br/> <br/>
        &nbsp; &nbsp; &nbsp; &bull; Tracks health status of enemy <br/>
      </p>

      <div className = "generalbuttonContainer">
        <Link to= "/SPIgameM4" className = "generalbuttonGlitch" onClick = {() => playSound(7)}>
            Enter Zone
        </Link>
      </div>
      
    </div>

  )

}
  
export default M4InstructionsScreen

