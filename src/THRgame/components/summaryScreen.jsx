import { Link } from 'react-router-dom';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../Providers/PlayerProvider.jsx';

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

function summaryScreen() {

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer } = usePlayer();

    const reset = () => {

        playSound(4);
        setActiveGame(retrieveActiveGame(1));

    }

    return (

        <div className = "screenLayout">

            <h1>This is where the summary goes</h1>

            {Player[0] >= ActiveGame[1] ? (

                <Link to="/THRgame" className = "generalbutton">
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