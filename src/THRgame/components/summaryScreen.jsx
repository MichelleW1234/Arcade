import { Link } from 'react-router-dom';

import { useTHRUser } from '../Providers/THRUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../Providers/PlayerProvider.jsx';

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

import "./summaryScreen.css"

function summaryScreen() {

    const {THRUser, setTHRUser} = useTHRUser();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer } = usePlayer();


    const resetGame = () => {

        setTHRUser([[],[1, "/THRM1Instructions"], false]);

    }

    const reset = () => {

        playSound(4);
        resetGame();
        setActiveGame(retrieveActiveGame(1));

    }

    return (

        <div className = "screenLayout">

            <div className = "THRResultsBoard">
                <h1>Missions Completed: {THRUser[0].length}</h1>
                <h1>Points Earned: {THRUser[0].length * ActiveGame[1]}</h1>
            </div>

            {Player[0] >= ActiveGame[1] ? (

                <Link to="/THRmission" className = "generalbutton" onClick = {resetGame}>
                    Play Again
                </Link>

            ) : (

                <p className = "largefont"> You don't have enough points to play this game again.</p>

            )}

            <Link to="/selection" className = "generalbutton" onClick={reset}>
                Exit Game
            </Link>

        </div>

    )

}
export default summaryScreen