import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {useCBLUser} from "../Providers/CBLUserProvider.jsx";

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

function Summaryscreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const {CBLUser, setCBLUser} = useCBLUser();


    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        reset();
        navigate("/selection");
    });

    useKeyboardShortcut("Enter", () => {
        if (Player[0] >= ActiveGame[1]){
            resetGame();
            navigate("/CBLgame");
        }
    });




    const resetGame = () => {
        
        playSound(19)
        setCBLUser([0]);

    }

    const reset = () => {
        
        playSound(4);
        setCBLUser([0]);
        setActiveGame(retrieveActiveGame(0));

    }

    return (

        <div className = "screenLayout">

            <div className = "StatsBoard">

                <p>Number of colors blasted: {CBLUser[0]}</p>
                <p>  <span className="StatsGlitch"> Points earned: {CBLUser[0]*3} </span> </p>
    
            </div>

            {Player[0] >= ActiveGame[1] ? (

                <Link to = "/CBLgame" className = "generalbutton" onClick = {() => resetGame()}> Play Again </Link>

            ) : (

                <p className="largefont"> You don't have enough points to play again. </p>

            )} 

            <Link to = "/selection" className = "generalbutton" onClick={() => reset()}> Exit Game</Link>

        </div>

    );

}


export default Summaryscreen;