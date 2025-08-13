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
        navigate("/ORBgame");
    },
        ".StartGame"
    );

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> <span className='signGlitch'>Instructions:</span></h1>

            <p className = "largefont">
                &gt; Press Stop when the yellow light lands on green.<br/>
                &gt; If you land it, you gain 5 points. If you miss, you lose 5 points.<br/>
                &gt; You get one attempt.<br/>
                &gt; It costs 5 points to play this game. <br/>
                &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
            </p>

            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton ExitGame" onClick={() => exitGame(setActiveGame)}>
                    <div className="buttonNameContainer"> Exit Game<br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
                </Link>

                <Link to="/ORBgame" className = "generalbuttonGlitch StartGame" onClick={() => playSound(19)}>
                    <div className="buttonNameContainer"> Start Game <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                </Link>

            </div>
            
        </div>

    );

}


export default Instructionsscreen;