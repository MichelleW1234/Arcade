import { Link } from 'react-router-dom';

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

import "./SummaryScreen.css";

function SummaryScreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();3

    const reset = () => {
        
        playSound(4);
        setActiveGame(retrieveActiveGame(1));

    }

    return (

        <div className = "screenLayout">

            <div className = "ORBResultsBoard">

                {Player[0] > Player[1] ? (

                    <h1 className="ORBResultsWords"> You won! Nice job! </h1>

                ) : (

                    <h1 className="ORBResultsWords"> You lost. Better luck next time! </h1>

                )}
    
            </div>

            <Link to = "/selection" className = "generalbutton" onClick={() => reset()}> Exit Game</Link>

            {Player[0] >= ActiveGame[1] ? (

                <Link to = "/ORBgame" className = "generalbutton" onClick = {() => playSound(19)}> Play Again </Link>

            ) : (

                <h1 className="largefont"> You don't have enough points to play again. </h1>

            )} 
            
        </div>

    );

}


export default SummaryScreen;