import { Link } from 'react-router-dom';

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

import "../../components/GameSummaryscreen.css";

function Summaryscreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();3

    const reset = () => {
        
        playSound(4);
        setActiveGame(retrieveActiveGame(1));

    }

    return (

        <div className = "screenLayout">

            <div className = "StatsBoard">

                {Player[0] > Player[1] ? (

                    <>
                        <p> Target hit.</p>
                        <p> <span className="StatsGlitch"> You won! Nice job! </span> </p>
                    </>

                ) : (

                    <>
                        <p> Target missed. </p> 
                        <p> <span className="StatsGlitch"> You lost. Better luck next time! </span> </p>
                    </>

                )}
    
            </div>

            {Player[0] >= ActiveGame[1] ? (

                <Link to = "/ORBgame" className = "generalbutton" onClick = {() => playSound(19)}> Play Again </Link>

            ) : (

                <h1 className="largefont"> You don't have enough points to play again. </h1>

            )} 

            <Link to = "/selection" className = "generalbutton" onClick={() => reset()}> Exit Game</Link>

            
        </div>

    );

}


export default Summaryscreen;