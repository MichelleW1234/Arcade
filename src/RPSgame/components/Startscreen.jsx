
import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {playSound, exitGame} from '../../Helpers/helpers.js';

function Startscreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();

    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        exitGame(setActiveGame);
        navigate("/selection");
    },
        ".ExitGame"
    );

    useKeyboardShortcut("Enter", () => {
        playSound(1);
        navigate("/RPSinstructions");
    },
        ".Continue"
    );

    return (

        <div className = "StartingScreenLayout">
            
            <div className = "header-glow-box">
                <span className="header-border top"></span>
                <span className="header-border right"></span>
                <span className="header-border bottom"></span>
                <span className="header-border left"></span>
                <h1 className = "headerwords"> Loading <span className='headerwordsGlitch'>Rock-Paper-Scissors...</span></h1>
            </div>
            
            <div className = "generalbuttonContainer">

                <Link to= "/selection" className = "generalbutton ExitGame" onClick={() => exitGame(setActiveGame)}>
                    <div className="buttonNameContainer">Exit Game<br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
                </Link>
                <Link to="/RPSinstructions" className = "generalbuttonGlitch Continue" onClick={() => playSound(1)}>
                    <div className="buttonNameContainer">Continue<br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                </Link>
                
            </div>
        </div>

    );

}


export default Startscreen;
