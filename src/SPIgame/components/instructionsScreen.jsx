
import { Link } from 'react-router-dom';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

function instructionsScreen() {

  const { ActiveGame, setActiveGame} = useActiveGame();

  const quit = () => {

    playSound(4);
    setActiveGame(retrieveActiveGame(1))

  }

  return (

    <div className = "screenLayout">

      <h1 className = "instructionsSign"> Instructions: </h1>

      <p className = "largefont">   
        &gt; Instructions go here. <br/>
      </p>

      <div className = "generalbuttonContainer">
        <Link to="/selection" className = "generalbutton" onClick={quit}>
          Quit Game
        </Link>
        <Link to= "/SPImission" className = "generalbuttonGlitch" onClick={() => playSound(1)}>
          Continue
        </Link>
      </div>
      
    </div>

  )

}
  
  export default instructionsScreen
