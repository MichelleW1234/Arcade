import { Link } from 'react-router-dom';

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useSNKUser } from '../Providers/SNKUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {retrieveActiveGame} from '../../Helpers/helpers.js';

import "./ResultsScreen.css";

function ResultsScreen (){

    const { Player, setPlayer} = usePlayer();
    const { SNKUser, setSNKUser } = useSNKUser();
    const { ActiveGame, setActiveGame} = useActiveGame();

    const resetGame = () => {
        
        setSNKUser([false, 0]);

        const difference = Player[0] + (SNKUser[1] * 2) - 5;
    
        if (difference >= 0){
    
            setPlayer(prev => [difference, prev[0]]);
    
        } else {
    
            setPlayer(prev => [0, prev[0]]);
    
        }
    
    }


    const reset = () => {
    
        resetGame();
        setActiveGame(retrieveActiveGame(1))
    
    }
    

    return (

        <div className = "screenLayout">

            <div className = "SNKresultsSign"> 

                <h1 className = "SNKresultsFont">
                    Total Points Earned: {SNKUser[1] * 2}
                </h1>

            </div>

            {Player[0] >= 10 ? 

                <Link to="/SNKgame" className = "generalbuttonGlitch" onClick={resetGame}>
                    Play Again
                </Link>

            :

                <h1 className = "largefont"> You don't have enough points to play this game again. </h1>

            }

            <Link to="/selection" className = "generalbuttonGlitch" onClick={reset}>
                Quit Game
            </Link>
            
        </div>

    );

}


export default ResultsScreen;