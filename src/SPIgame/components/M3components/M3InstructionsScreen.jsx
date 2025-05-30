
import { Link } from 'react-router-dom';

import alienMutant from "../../../Images/image 10.svg";
import alien from "../../../Images/image 8.svg";
import laser from "../../../Images/image 9.svg";
import laserMutant from "../../../Images/image 12.svg";

function M3InstructionsScreen() {

  return (

    <div className = "screenLayout">

      <h1 className = "instructionsSign"> Station 3: The Core </h1>

      <p className = "largefont">   
        &gt; Mission description: Exterminate all oncoming waves before they reach you. <br/>
        &gt; Aliens detected:<br/>
        &nbsp; &nbsp; &gt; <img src={alien} ></img> - soldier  <br/>
        &nbsp; &nbsp; &nbsp; &bull; Laser weakness: <img src={laser} ></img> <br/>
        &nbsp; &nbsp; &nbsp; &bull; Special abilities: None <br/>
        &nbsp; &nbsp; &gt; <img src={alienMutant} ></img> - Mutant  <br/>
        &nbsp; &nbsp; &nbsp; &bull; Laser weakness: <img src={laserMutant} ></img> <br/>
        &nbsp; &nbsp; &nbsp; &bull; Special abilities: None <br/>
        &gt; Waves to eliminate: 5 <br/>
        &gt; Wave size: 20 <br/>
        &gt; Equipment: <br/>
        &nbsp; &nbsp; &gt; laser cannon <br/>
        &nbsp; &nbsp; &nbsp; &bull; Modes: <br/>
        &nbsp; &nbsp; &nbsp; &nbsp; &bull; Normal: <img src={laser} ></img> <br/>
        &nbsp; &nbsp; &nbsp; &nbsp; &bull; Mutant: <img src={laserMutant} ></img> <br/>
        &nbsp; &nbsp; &nbsp; &bull; To use: Move slider to aim at target. Click buttom to switch between modes. <br/>
        &nbsp; &nbsp; &nbsp; &bull; Unlimited ammunition<br/>
      </p>

      <div className = "generalbuttonContainer">
        <Link to= "/SPIgameM3" className = "generalbuttonGlitch" >
            Enter Zone
        </Link>
      </div>
      
    </div>

  )

}
  
export default M3InstructionsScreen
