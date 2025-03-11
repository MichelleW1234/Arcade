import { useStarter } from '../Providers/TTTStarterProvider.jsx';
import { useWinner } from '../Providers/TTTWinnerProvider.jsx';

import { usePlayer} from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {retrieveActiveGame} from "../../Helpers/helpers.js";

import "./resultsScreen.css";

function resultsScreen() {

    const { Starter, setStarter} = useStarter();
    const { Winner, setWinner} = useWinner();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer} = usePlayer();

    const reset = () => {

        setStarter(-1);
        setWinner(-1);
        setActiveGame(retrieveActiveGame(1));

    }

    const resetGame = () => {

        setStarter(-1);
        setWinner(-1);
        
    }

    return (
        <div className = "screenLayout">

            <div className = "TTTscoreboard">
                <h1> Result: </h1>
                <h1>{Player[0] < Player[1] ? ("You lost. :("): Player[0] > Player[1]  ? ("You won! :)") : ("It's a draw!")}</h1>
            </div>

            {Player[0] >= ActiveGame[1] ? (

                <a href = "/TTTcoinFlip">
                    <button className = "generalbutton" onClick={() => resetGame()}> Play Again </button>
                </a>

            ) : (

                <p className = "largefont"> You don't have enough points to play this game again.</p>

            )}

           
           <div className = "TTTbuttonsContainer">
                <a href = "/selection">
                    <button className = "generalbutton" onClick={() => reset()}> Exit Game </button>
                </a>

            </div>
        </div>
    )
}

export default resultsScreen