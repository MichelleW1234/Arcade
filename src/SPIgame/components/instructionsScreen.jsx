
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
        &gt; You are part of a task force assigned to destroy a dangerous alien hive that is a threat to the galaxy. <br/>
        &gt; In order to fully extinguish the hive, you must embark on 4 missions. <br/>
        &gt; Starting from the beginning, you must complete the current mission in order to move onto the next one.  <br/>
        &gt; Every mission has helpful information before you start, so be sure to read through it carefully. <br/>
        &gt; If you die at any time, the game ends.  <br/>
        &gt; You gain points per mission completed. <br/>
        &gt; Good luck! <br/>
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
