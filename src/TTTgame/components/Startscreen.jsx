import { Link } from 'react-router-dom';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

function Startscreen() {

  const { ActiveGame, setActiveGame} = useActiveGame();

  const quit = () => {

    playSound(4);
    setActiveGame(retrieveActiveGame(1))

  }

  return (

    <div className = "StartingScreenLayout">

        <h1 className = "headerwords"> Loading <span className = "headerwordsGlitch">Tic-Tac-Toe</span>... </h1>

        <div className = "generalbuttonContainer">
          <Link to="/selection" className = "generalbutton" onClick={() => quit()}>
            Exit Game
          </Link>
          <Link to= "/TTTinstructions" className = "generalbuttonGlitch" onClick={() => playSound(1)}>
            Continue
          </Link>
        </div>
        
    </div>

  )
}

export default Startscreen;