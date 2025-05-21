
import { Link } from 'react-router-dom';


function M3InstructionsScreen() {

  return (

    <div className = "screenLayout">

      <h1 className = "instructionsSign"> Instructions: </h1>

      <p className = "largefont">   
        &gt; Instructions go here. <br/>
      </p>

      <div className = "generalbuttonContainer">
        <Link to= "/THRgameM3" className = "generalbuttonGlitch" >
            Begin Waves
        </Link>
      </div>
      
    </div>

  )

}
  
export default M3InstructionsScreen
