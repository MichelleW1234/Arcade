import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {playSound, exitGame} from '../../Helpers/helpers.js';

function Instructionsscreen() {

  const { ActiveGame, setActiveGame} = useActiveGame();

  const navigate = useNavigate();

  useKeyboardShortcut("Escape", () => {
    exitGame(setActiveGame);
    navigate("/selection");
  },
    ".ExitGame"
  );

  useKeyboardShortcut("Enter", () => {
    playSound(19);
    navigate("/SPImission");
  },
    ".StartGame"
  );

  return (

    <div className = "screenLayout">

      <h1 className = "instructionsSign"> <span className='signGlitch'>Instructions:</span></h1>

      <p className = "largefont">  
        &gt; You are part of a space crew that has been assigned the task of destroying a dangerous alien hive that has become a threat to the galaxy. <br/>
        &gt; In order to fully extinguish the hive, you must embark on 4 missions. <br/>
        &gt; Starting from the beginning, you must complete the current mission in order to move onto the next one.  <br/>
        &gt; Every mission has helpful information before you start, so be sure to read through it carefully. <br/>
        &gt; If you die at any time, the game ends.  <br/>
        &gt; You gain 15 points per mission completed. <br/>
        &gt; It costs 15 points to play this game. <br/> 
        &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/> <br/>
        Note from creator: This game may glitch. Good luck!
      </p>

      <div className = "generalbuttonContainer">
        <Link to="/selection" className = "generalbutton ExitGame" onClick={() => exitGame(setActiveGame)}>
          <div className="buttonNameContainer"> Exit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
          
        </Link>
        <Link to= "/SPImission" className = "generalbuttonGlitch StartGame" onClick={() => playSound(19)}>
          <div className="buttonNameContainer"> Start Game <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
        </Link>
      </div>
      
    </div>

  )

}
  
  export default Instructionsscreen
