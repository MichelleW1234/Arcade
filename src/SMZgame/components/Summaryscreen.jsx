import { Link } from 'react-router-dom';

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useSMZUser} from '../Providers/SMZUserProvider.jsx';

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

function Summaryscreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { SMZUser, setSMZUser} = useSMZUser();

    const reset = () => {
        
        playSound(4);
        setSMZUser([0]);
        setActiveGame(retrieveActiveGame(1));

    }

    const resetGame = () => {
        
        playSound(19);
        setSMZUser([0]);

    }


    return (

        <div className = "screenLayout">

            <div className = "StatsBoard">
                <p>Distance Traveled: {SMZUser[0]} meters</p>
                <p> <span className="StatsGlitch">Points Earned: {Math.floor(SMZUser[0]/5)}</span></p>
            </div>

            {Player[0] >= ActiveGame[1] ? (

                <Link to = "/SMZgame" className = "generalbutton" onClick = {() => resetGame()}> Play Again </Link>

            ) : (

                <p className="largefont"> You don't have enough points to play again. </p>

            )} 

            <Link to = "/selection" className = "generalbutton" onClick={() => reset()}> Exit Game</Link>

            
        </div>

    );

}


export default Summaryscreen;