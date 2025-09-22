import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useORBUser } from '../Providers/ORBUserProvider.jsx';
import { useAchievements } from '../../Providers/AchievementsProvider.jsx';

import {playSound, retrieveActiveGame, resetAchievementsUpdate} from "../../Helpers/helpers.js";

function Summaryscreen (){

    const { Player } = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { ORBUser, setORBUser} = useORBUser();
    const { Achievements, setAchievements} = useAchievements();

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
            navigate("/ORBgame");
        }
    },
        ".PlayAgain"
    );



    const reset = () => {
        
        playSound(4);
        setORBUser([false]);
        setActiveGame(retrieveActiveGame(0));
        resetAchievementsUpdate(Achievements, setAchievements);

    }

    const resetGame = () => {

        playSound(19);
        setORBUser([false]);
        resetAchievementsUpdate(Achievements, setAchievements);

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

            {Achievements[0][0] === true ? (

                <p className = "largefont"> Congrats! You've won an achievement!</p>

            ) : (

                null

            )}

            {Player[0] >= ActiveGame[1] ? (

                <Link to = "/ORBgame" className = "generalbutton PlayAgain" onClick = {() => resetGame()}> 
                    <div className="buttonNameContainer"> Play Again  <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                </Link>

            ) : (

                <p className="largefont"> You don't have enough points to play again. </p>

            )} 

            <Link to = "/selection" className = "generalbutton ExitGame" onClick={() => reset()}> 
                <div className="buttonNameContainer">Exit Game<br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
           </Link>

        </div>

    );

}


export default Summaryscreen;