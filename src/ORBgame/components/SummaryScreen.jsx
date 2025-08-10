import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useORBUser } from '../Providers/ORBUserProvider.jsx';

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

function Summaryscreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { ORBUser, setORBUser} = useORBUser();


    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        reset();
        navigate("/selection");
    });

    useKeyboardShortcut("Enter", () => {
        if (Player[0] >= ActiveGame[1]){
            resetGame();
            navigate("/ORBgame");
        }
    });



    const reset = () => {
        
        playSound(4);
        setORBUser([false]);
        setActiveGame(retrieveActiveGame(0));

    }

    const resetGame = () => {

        playSound(19);
        setORBUser([false]);

    }

    return (

        <div className = "screenLayout">

            <div className = "StatsBoard">

                {ORBUser[0] === true ? (

                    <>
                        <p> Target hit.</p>
                        <p> <span className="StatsGlitch"> You won! Nice job! </span> </p>
                    </>

                ) : (

                    <>
                        <p> Target missed. </p> 
                        <p> <span className="StatsGlitch"> You lost. Better luck next time! </span> </p>
                    </>

                )}
    
            </div>

            {Player[0] >= ActiveGame[1] ? (

                <Link to = "/ORBgame" className = "generalbutton" onClick = {() => resetGame()}> Play Again </Link>

            ) : (

                <p className="largefont"> You don't have enough points to play again. </p>

            )} 

            <Link to = "/selection" className = "generalbutton" onClick={() => reset()}> Exit Game</Link>

            
        </div>

    );

}


export default Summaryscreen;