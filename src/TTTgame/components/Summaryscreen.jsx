import { Link } from 'react-router-dom';

import { useTTTUser } from '../Providers/TTTUserProvider.jsx';

import { usePlayer} from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {resetGame} from "../Helpers/helpers.js";
import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

import "../../components/GameSummaryscreen.css";

function Summaryscreen() {

    const { TTTUser, setTTTUser} = useTTTUser();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer} = usePlayer();

    const playAgain = () => {

        playSound(19);
        resetGame(setTTTUser);

    }
    
    const reset = () => {

        playSound(4);
        resetGame(setTTTUser);
        setActiveGame(retrieveActiveGame(1));

    }

    return (
        <div className = "screenLayout">

            <div className = "StatsBoard">
                <p> Result: </p>
                <p> <span className = "StatsGlitch">{Player[0] < Player[1] ? ("You lost. :("): Player[0] > Player[1]  ? ("You won! :)") : ("It's a draw!")} </span></p>
                <p>No one wins!</p>
            </div>

            {Player[0] >= ActiveGame[1] ? (

                <Link to= "/TTTcoinFlip" className = "generalbutton" onClick={() => playAgain()}>
                    Play Again
                </Link>

            ) : (

                <p className = "largefont"> You don't have enough points to play this game again.</p>

            )}

            <Link to= "/selection" className = "generalbutton" onClick={() => reset()}>
                Exit Game
            </Link>

        </div>
    )
}

export default Summaryscreen;