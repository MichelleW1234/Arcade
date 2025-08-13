import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { useTTTUser } from '../Providers/TTTUserProvider.jsx';

import { usePlayer} from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {resetGame} from "../Helpers/helpers.js";
import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

function Summaryscreen() {

    const { TTTUser, setTTTUser} = useTTTUser();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer} = usePlayer();

    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        reset();
        navigate("/selection");
    },
        ".ExitGame"
    );

    useKeyboardShortcut("Enter", () => {
        if (Player[0] >= ActiveGame[1]){
        playAgain();
        navigate("/TTTcoinFlip");
        }
    },
        ".PlayAgain"
    );



    const playAgain = () => {

        playSound(19);
        resetGame(setTTTUser);

    }
    
    const reset = () => {

        playSound(4);
        resetGame(setTTTUser);
        setActiveGame(retrieveActiveGame(0));

    }

    return (
        <div className = "screenLayout">

            <div className = "StatsBoard">
                {TTTUser[1] === 0 ? (

                    <>
                        <p>The computer got three in a row.</p>
                        <p><span className = "StatsGlitch"> You lost. </span></p>
                    </>

                ) : TTTUser[1] === 1 ? (

                    <>
                        <p> You got three in a row. </p>
                        <p><span className = "StatsGlitch"> You won! </span></p>
                    </>

                ) : (

                    <>
                        <p> It's a draw. </p>
                        <p><span className = "StatsGlitch"> No one wins!</span></p>
                    </>

                )}

            </div>

            {Player[0] >= ActiveGame[1] ? (

                <Link to= "/TTTcoinFlip" className = "generalbutton PlayAgain" onClick={() => playAgain()}>
                    <div className="buttonNameContainer">Play Again<br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                    
                </Link>

            ) : (

                <p className = "largefont"> You don't have enough points to play this game again.</p>

            )}

            <Link to= "/selection" className = "generalbutton ExitGame" onClick={() => reset()}>
                <div className="buttonNameContainer">Exit Game<br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

        </div>
    )
}

export default Summaryscreen;