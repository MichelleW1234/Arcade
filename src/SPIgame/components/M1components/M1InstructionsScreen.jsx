import { Link } from 'react-router-dom';

import alien from "../../../Images/image 8.svg";
import laser from "../../../Images/image 9.svg";

function M1InstructionsScreen() {

  return (

    <div className = "screenLayout">

      <h1 className = "instructionsSign"> Station 1: Hive outskirts </h1>

      <p className = "largefont">   
        &gt; Mission description: Exterminate all oncoming waves before they reach you. <br/>
        &gt; Aliens detected:<br/>
        &nbsp; &nbsp; &gt; <img src={alien} ></img> - soldier  <br/>
        &nbsp; &nbsp; &nbsp; &bull; Laser weakness: <img src={laser} ></img> <br/>
        &nbsp; &nbsp; &nbsp; &bull; Special abilities: None <br/>
        &gt; Waves to eliminate: 5 <br/>
        &gt; Wave size: 10 <br/>
        &gt; Equipment: <br/>
        &nbsp; &nbsp; &gt; laser cannon <br/>
        &nbsp; &nbsp; &nbsp; &bull; ammunition: <img src={laser} ></img> <br/>
        &nbsp; &nbsp; &nbsp; &bull; To use: move slider to aim at target <br/>
        &nbsp; &nbsp; &nbsp; &bull; Unlimited ammunition<br/>
      </p>

      <div className = "generalbuttonContainer">
        <Link to= "/SPIgameM1" className = "generalbuttonGlitch" >
          Enter Zone
        </Link>
      </div>
      
    </div>

  )

}
  
  export default M1InstructionsScreen
