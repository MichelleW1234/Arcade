import { Link } from 'react-router-dom';

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {useCBLUser} from "../Providers/CBLUserProvider.jsx";

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

import "./Summaryscreen.css";

function Summaryscreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const {CBLUser, setCBLUser} = useCBLUser();

    const resetGame = () => {
        
        playSound(19)
        setCBLUser([0]);

    }

    const reset = () => {
        
        playSound(4);
        setCBLUser([0]);
        setActiveGame(retrieveActiveGame(1));

    }

    return (

        <div className = "screenLayout">

            <div className = "CBLResultsBoard">

                <h1 className = "CBLResultsWords">Number of colors blasted: {CBLUser[0]}</h1>
                <h1 className = "CBLResultsWordsGlitch">Points earned: {CBLUser[0]*3}</h1>
    
            </div>

            {Player[0] >= ActiveGame[1] ? (

                <Link to = "/CBLgame" className = "generalbutton" onClick = {() => resetGame()}> Play Again </Link>

            ) : (

                <h1 className="largefont"> You don't have enough points to play again. </h1>

            )} 

            <Link to = "/selection" className = "generalbutton" onClick={() => reset()}> Exit Game</Link>

        </div>

    );

}


export default Summaryscreen;