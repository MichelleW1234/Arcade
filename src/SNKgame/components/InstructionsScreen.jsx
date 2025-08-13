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
        playSound(19)
        navigate("/SNKgame");
    },
        ".StartGame"
    );

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> <span className='signGlitch'>Instructions:</span></h1>
            
            <p className = "largefont">
                &gt; Use the controls to guide the snake up, down, left, and right to eat the apples. <br/>
                &gt; You will gain 2 points for every apple that is eaten. <br/>
                &gt; It costs 5 points to play this game. <br/>
                &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
            </p>

            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton ExitGame" onClick={() => exitGame(setActiveGame)}>
                    <div className="buttonNameContainer">Exit Game<br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
                </Link>

                <Link to="/SNKgame" className = "generalbuttonGlitch StartGame" onClick={() => playSound(19)}>
                    <div className="buttonNameContainer">Start Game <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                    
                </Link>

            </div>
            
        </div>

    );

}


export default Instructionsscreen;