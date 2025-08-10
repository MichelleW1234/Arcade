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
    });

    useKeyboardShortcut("Enter", () => {
        playSound(19);
        navigate("/BFRgame");
    });



    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> <span className='signGlitch'>Instructions:</span></h1>
            
            <p className = "largefont">
                &gt; Control when to activate the force field to keep balloons from passing through by popping them.<br/>
                &gt; Every balloon that is popped is worth 2 points. <br/>
                &gt; You will lose 2 points for every bird that is hit instead. <br/>
                &gt; Pop as many balloons as you can within the 30 second time limit. <br/>
                &gt; It costs 10 points to play this game. <br/>
                &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
            </p>

            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton" onClick={() => exitGame(setActiveGame)}>
                    Exit Game
                </Link>

                <Link to="/BFRgame" className = "generalbuttonGlitch" onClick={() => playSound(19)}>
                    Start Game
                </Link>

            </div>
            
        </div>

    );

}


export default Instructionsscreen;