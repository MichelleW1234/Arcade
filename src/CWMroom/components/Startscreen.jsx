import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

function Startscreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();

    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        leave();
        navigate("/selection");
    },
        ".Leave"
    );

    useKeyboardShortcut("Enter", () => {
        playSound(24);
        navigate("/CWMinstructions");
    },
        ".Enter"
    );




    const leave = () => {
    
        playSound(1);
        setActiveGame(retrieveActiveGame(0));
    
    }

    return (

        <div className = "StartingScreenLayout">

            <div className = "EnterTitleGlow">
                <h1 className = "headerwords">
                    Welcome to the <span className = "headerwordsGlitch"> Claw Arcade</span>.
                </h1>
            </div>

            <div className="generalbuttonContainer">
                <Link to="/selection" className = "generalbutton Leave" onClick = {() => leave()}>
                    Leave
                </Link>
                <Link to="/CWMinstructions" className = "generalbuttonGlitch Enter" onClick = {() => playSound(24)}>
                    Enter
                </Link>
            </div>
            
        </div>

    );

}


export default Startscreen;