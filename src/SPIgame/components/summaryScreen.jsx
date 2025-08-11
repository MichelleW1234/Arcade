import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { useSPIUser } from '../Providers/SPIUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../Providers/PlayerProvider.jsx';

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

function Summaryscreen() {

    const {SPIUser, setSPIUser} = useSPIUser();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer } = usePlayer();

    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        reset();
        navigate("/selection");
    },
        ".ExitGame"
    );

    useKeyboardShortcut("Enter", () => {
        if (Player[0] >= ActiveGame[1]){
            resetGame();
            navigate("/SPImission");
        }
    },
        ".PlayAgain"
    );


    const resetGame = () => {

        playSound(19);
        setSPIUser([0,[1, "/SPIM1Instructions"], false]);

    }

    const reset = () => {

        playSound(4);
        setSPIUser([0,[1, "/SPIM1Instructions"], false]);
        setActiveGame(retrieveActiveGame(0));

    }

    return (

        <div className = "screenLayout">

            <div className = "StatsBoard">
                <p> Missions Completed: {SPIUser[0]}</p>
                <p> <span className="StatsGlitch"> Points Earned: {SPIUser[0] * ActiveGame[1]}</span></p>
            </div>

            {Player[0] >= ActiveGame[1] ? (

                <Link to="/SPImission" className = "generalbutton PlayAgain" onClick = {()=> resetGame()}>
                    Play Again
                </Link>

            ) : (

                <p className = "largefont"> You don't have enough points to play this game again.</p>

            )}

            <Link to="/selection" className = "generalbutton ExitGame" onClick={()=> reset()}>
                Exit Game
            </Link>

        </div>

    )

}
export default Summaryscreen