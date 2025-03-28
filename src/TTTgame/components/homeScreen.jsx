import { Link } from 'react-router-dom';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {retrieveActiveGame} from '../../Helpers/helpers.js';

function homeScreen() {

  const { ActiveGame, setActiveGame} = useActiveGame();

  return (

    <div className = "screenLayout">

        <h1 className = "headerwords"> <span className = "headerwordsGlitch">Welcome</span> to Tic-Tac-Toe.</h1>

        <div className = "generalbuttonContainer">
          <Link to="/selection" className = "generalbutton" onClick={() => setActiveGame(retrieveActiveGame(1))}>
            Quit Game
          </Link>
          <Link to= "/TTTinstructions" className = "generalbuttonGlitch">
            Instructions
          </Link>
        </div>
        
    </div>

  )
}

export default homeScreen