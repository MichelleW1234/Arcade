import { Link } from 'react-router-dom';

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useSNKUser } from '../Providers/SNKUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

import "../../components/GameSummaryscreen.css";

function Summaryscreen(){

    const { Player, setPlayer} = usePlayer();
    const { SNKUser, setSNKUser } = useSNKUser();
    const { ActiveGame, setActiveGame} = useActiveGame();

    const resetGame = () => {
        
        playSound(19);
        setSNKUser([false, 0]);
    
    }


    const reset = () => {
    
        playSound(4);
        setSNKUser([false, 0]);
        setActiveGame(retrieveActiveGame(1))
    
    }
    

    return (

        <div className = "screenLayout">

            <div className = "StatsBoard"> 

                <p> Total Apples Eaten: {SNKUser[1]} </p>
                <p> <span className="StatsGlitch"> Total Points Earned: {SNKUser[1] * 2} </span></p>

            </div>

            {Player[0] >= ActiveGame[1] ? 

                <Link to="/SNKgame" className = "generalbutton" onClick={() => resetGame()}>
                    Play Again
                </Link>

            :

                <h1 className = "largefont"> You don't have enough points to play this game again. </h1>

            }

            <Link to="/selection" className = "generalbutton" onClick={() => reset()}>
                Quit Game
            </Link>
            
        </div>

    );

}


export default Summaryscreen;