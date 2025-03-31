import { Link } from 'react-router-dom';

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useSNKUser } from '../Providers/SNKUserProvider.jsx';

import { retrieveActiveGame } from '../../Helpers/helpers.js';

import "./ResultsScreen.css";

function ResultsScreen (){

    const { Player, setPlayer} = usePlayer();
    const { SNKUser, setSNKUser } = useSNKUser();

    const transaction = () => {

        const difference = (SNKUser[1]*2) - 10;

        if (difference >= 0){

            setPlayer(prev => [prev[0] + difference, prev[0]]);

        } else {

            setPlayer(prev => [0, prev[0]]);

        }

    }

    const resetGame = () => {

        setSNKUser([false, 0]);
        transaction();

    }

    const reset = () => {

        resetGame();
        retrieveActiveGame(1);

    }

    return (

        <div className = "screenLayout">

            <div className = "SNKresultsSign"> 

                <h1 className = "SNKresultsFont">
                    Total Points Earned: {SNKUser[1] * 2}
                </h1>

            </div>

            <Link to="/selection" className = "generalbuttonGlitch" onClick={() => reset()}>
                Quit Game
            </Link>

            <Link to="/SNKgame" className = "generalbuttonGlitch" onClick={() => resetGame()}>
                Play Again
            </Link>
            
        </div>

    );

}


export default ResultsScreen;