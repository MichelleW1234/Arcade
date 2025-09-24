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
                &gt; instructions go here <br/>
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