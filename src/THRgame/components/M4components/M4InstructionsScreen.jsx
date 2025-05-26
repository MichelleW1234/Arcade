

import { Link } from 'react-router-dom';


function M4InstructionsScreen() {

  return (

    <div className = "screenLayout">

      <h1 className = "instructionsSign"> Instructions: </h1>

      <p className = "largefont">   
        &gt; Instructions go here. <br/>
      </p>

      <div className = "generalbuttonContainer">
        <Link to= "/THRgameM4" className = "generalbuttonGlitch" >
            Begin Waves
        </Link>
      </div>
      
    </div>

  )

}
  
export default M4InstructionsScreen

