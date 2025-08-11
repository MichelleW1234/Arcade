
import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {playSound, exitGame} from '../../Helpers/helpers.js';

function Instructionsscreen (){

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
        navigate("/RPSlevels");
    },
        ".StartGame"
    );

    return (
        <div className= "screenLayout">
            <h1 className = "instructionsSign"> <span className='signGlitch'>Instructions:</span></h1>
            <p className="largefont">
                &gt; This game runs for 10 rounds.<br/>
                &gt; In each round, you can either win or lose against the computer. <br/>
                &gt; The one with the most amount of wins by the end of the game wins overall. <br/>
                &gt; If you win overall, you gain 20 points. If you lose, you lose 20 points. If you tie, you don't gain or lose any points.<br/>
                &gt; You can read about how different objects affect one another by clicking the "Move References" button while playing. <br/>
                &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
            </p>
            <p className="largefont">
                Good luck!
            </p>
            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton ExitGame" onClick={() => exitGame(setActiveGame)}>
                    Exit Game
                </Link>
                <Link to= "/RPSlevels" className = "generalbuttonGlitch StartGame" onClick={() => playSound(19)}>
                    Start Game
                </Link>

            </div>
        </div>
    );
}

export default Instructionsscreen;
