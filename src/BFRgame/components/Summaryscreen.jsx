import { Link } from 'react-router-dom';

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useBFRUser } from '../Providers/BFRUserProvider.jsx';

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

import "../../components/GameSummaryscreen.css";

function Summaryscreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const {BFRUser, setBFRUser} = useBFRUser();

    const reset = () => {
        
        playSound(4);
        setBFRUser([0]);
        setActiveGame(retrieveActiveGame(1));

    }

    const resetGame = () => {
        
        playSound(19);
        setBFRUser([0]);

    }


    return (

        <div className = "screenLayout">

            <div className = "StatsBoard">
                <p>Balloons popped: {BFRUser[0]} </p>
                <p>Points earned: {BFRUser[0]*2} </p>
            </div>

            {Player[0] >= ActiveGame[1] ? (

                <Link to = "/BFRgame" className = "generalbutton" onClick = {() => resetGame()}> Play Again </Link>

            ) : (

                <h1 className="largefont"> You don't have enough points to play again. </h1>

            )} 

            <Link to = "/selection" className = "generalbutton" onClick={() => reset()}> Exit Game</Link>

            
        </div>

    );

}


export default Summaryscreen;