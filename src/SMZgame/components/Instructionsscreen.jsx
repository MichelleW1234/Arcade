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
        navigate("/SMZgame");
    },
        ".StartGame"
    );



    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> <span className='signGlitch'>Instructions:</span></h1>
            
            <p className = "largefont">
                &gt; Move the bird up and down to avoid incoming walls and to travel as far as possible. <br/>
                &gt; Every 5 meters traveled is approximately equal to 1 point. <br/>
                &gt; It costs 15 points to play this game. <br/> 
                &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
            </p>

            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton ExitGame" onClick={() => exitGame(setActiveGame)}>
                    <div className="buttonNameContainer"> Exit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
                </Link>

                <Link to="/SMZgame" className = "generalbuttonGlitch StartGame" onClick={() => playSound(19)}>
                    <div className="buttonNameContainer">Start Game <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                </Link>

            </div>
            
        </div>

    );

}


export default Instructionsscreen;