import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut.js";

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {playSound, exitGame} from '../../Helpers/helpers.js';

function Instructionsscreen (){

    const { setActiveGame} = useActiveGame();

    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        exitGame(setActiveGame);
        navigate("/selection");
    },
        ".ExitGame"
    );

    useKeyboardShortcut("Enter", () => {
        playSound(19);
        navigate("/CHCgame");
    },
        ".StartGame"
    );



    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> <span className='signGlitch'>Instructions:</span></h1>
            
            <p className = "largefont">
                &gt; Use the control buttons to move the chicken up [ W ], left [ A ], and right [ D ]. <br/>
                &gt; You get a 30 second time limit to travel as far as possible. <br/>
                &gt; Avoid all cars while crossing streets. <br/>
                &gt; Grassy areas are safe zones. <br/>
                &gt; Each step forward equals one point. <br/>
                &gt; It costs 10 points to play this game. <br/>
                &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
            </p>

            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton ExitGame" onClick={() => exitGame(setActiveGame)}>
                    <div className="buttonNameContainer"> Exit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
                </Link>

                <Link to="/CHCgame" className = "generalbuttonGlitch StartGame" onClick={() => playSound(19)}>
                    <div className="buttonNameContainer">Start Game <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                </Link>

            </div>
            
        </div>

    );

}


export default Instructionsscreen;