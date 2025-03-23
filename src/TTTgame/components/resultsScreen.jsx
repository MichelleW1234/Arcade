import { useTTTUser } from '../Providers/TTTUserProvider.jsx';

import { usePlayer} from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {resetGame} from "../Helpers/TTThelpers.js";
import {retrieveActiveGame} from "../../Helpers/helpers.js";

import "./resultsScreen.css";

function resultsScreen() {

    const { TTTUser, setTTTUser} = useTTTUser();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer} = usePlayer();

    const reset = () => {

        resetGame(setTTTUser);

        setActiveGame(retrieveActiveGame(1));

    }

    return (
        <div className = "screenLayout">

            {console.log("Winner scores", Player[0])}

            <div className = "TTTscoreboard">
                <h1> Result: </h1>
                <h1>{Player[0] < Player[1] ? ("You lost. :("): Player[0] > Player[1]  ? ("You won! :)") : ("It's a draw!")}</h1>
            </div>

            {Player[0] >= ActiveGame[1] ? (

                <a href = "/TTTcoinFlip" className = "generalbutton" onClick={() => resetGame(setTTTUser)}>
                    Play Again
                </a>

            ) : (

                <p className = "largefont"> You don't have enough points to play this game again.</p>

            )}

           
           <div className = "TTTbuttonsContainer">
                <a href = "/selection" className = "generalbutton" onClick={() => reset()}>
                    Exit Game
                </a>

            </div>
        </div>
    )
}

export default resultsScreen