import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useBFRUser } from '../Providers/BFRUserProvider.jsx';

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

function Summaryscreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const {BFRUser, setBFRUser} = useBFRUser();


    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        reset();
        navigate("/selection");
    },
        ".ExitGame"
    );

    useKeyboardShortcut("Enter", () => {
        if (Player[0] >= ActiveGame[1]){
            resetGame();
            navigate("/BFRgame");
        }
    },
        ".PlayAgain"
    );



    const reset = () => {
        
        playSound(4);
        setBFRUser([0]);
        setActiveGame(retrieveActiveGame(0));

    }

    const resetGame = () => {
        
        playSound(19);
        setBFRUser([0]);

    }


    return (

        <div className = "screenLayout">

            <div className = "StatsBoard">
                <p>Balloons Popped: {BFRUser[0]} </p>
                <p> <span className="StatsGlitch">Points Earned: {BFRUser[0]*2} </span></p>
            </div>

            {Player[0] >= ActiveGame[1] ? (

                <Link to = "/BFRgame" className = "generalbutton PlayAgain" onClick = {() => resetGame()}> 
                    <div className="buttonNameContainer"> Play Again<br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                </Link>

            ) : (

                <p className="largefont"> You don't have enough points to play again. </p>

            )} 

            <Link to = "/selection" className = "generalbutton ExitGame" onClick={() => reset()}> 
                <div className="buttonNameContainer"> Exit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

            
        </div>

    );

}


export default Summaryscreen;