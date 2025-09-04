import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {playSound, exitGame} from '../../Helpers/helpers.js';

function Instructionsscreen() {

  const {setActiveGame} = useActiveGame();

  const navigate = useNavigate();

  useKeyboardShortcut("Escape", () => {
    exitGame(setActiveGame);
    navigate("/selection");
  },
    ".ExitGame"
  );

  useKeyboardShortcut("Enter", () => {
    playSound(19);
    navigate("/TTTcoinflip");
  },
    ".StartGame"
  );

  return (

    <div className = "screenLayout">

      <h1 className = "instructionsSign"> <span className='signGlitch'>Instructions:</span></h1>
      
      <p className = "largefont">   
        &gt; This is a standard game of tic-tac-toe against the computer on 3x3 board with 9 cells. <br/>
        &gt; You will determine who makes the first move by flipping a coin. <br/>
        &gt; If you win, you gain 10 points. If you lose, you lose 10 points. If there is no winner, you don't gain or lose any points. <br/>
        &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
      </p>

      <div className = "generalbuttonContainer">
        <Link to="/selection" className = "generalbutton ExitGame" onClick={() => exitGame(setActiveGame)}>
          <div className="buttonNameContainer"> Exit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
        </Link>
        <Link to= "/TTTcoinflip" className = "generalbuttonGlitch StartGame" onClick={() => playSound(19)}>
          <div className="buttonNameContainer"> Start Game <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
        </Link>
      </div>
      
    </div>

  )

}
  
  export default Instructionsscreen;
