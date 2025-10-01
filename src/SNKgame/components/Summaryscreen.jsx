import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useSNKUser } from '../Providers/SNKUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useAchievements } from '../../Providers/AchievementsProvider.jsx';

import {playSound, retrieveActiveGame, resetAchievementsUpdate} from '../../Helpers/helpers.js';

function Summaryscreen(){

    const { Player} = usePlayer();
    const { SNKUser, setSNKUser } = useSNKUser();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Achievements, setAchievements} = useAchievements();

    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        reset();
        navigate("/selection");
    },
        ".QuitGame"
    );

    useKeyboardShortcut("Enter", () => {
        if (Player[0] >= ActiveGame[1]){
            resetGame()
            navigate("/SNKgame");
        }
    },
        ".PlayAgain"
    );



    const resetGame = () => {
        
        playSound(19);
        setSNKUser([false, 0]);
        resetAchievementsUpdate(Achievements, setAchievements);
    
    }

    const reset = () => {
    
        playSound(4);
        setSNKUser([false, 0]);
        setActiveGame(retrieveActiveGame(0));
        resetAchievementsUpdate(Achievements, setAchievements);
    
    }
    

    return (

        <div className = "screenLayout">

            <div className = "StatsBoard"> 

                <p> Total Apples Eaten: {SNKUser[1]} </p>
                <p> <span className="StatsGlitch"> Total Points Earned: {SNKUser[1] * 2} </span></p>

            </div>

            {Achievements[0][0] === true ? (

                <p className = "largefont"> Congrats! You've won an achievement!</p>

            ) : (

                null

            )}

            {Player[0] >= ActiveGame[1] ? (

                <Link to="/SNKgame" className = "generalbutton PlayAgain" onClick={() => resetGame()}>
                    <div className="buttonNameContainer"> Play Again <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                </Link>

            ) : (

                <p className = "largefont"> You don't have enough points to play this game again. </p>

            )}

            <Link to="/selection" className = "generalbutton QuitGame" onClick={() => reset()}>
                <div className="buttonNameContainer">Quit Game<br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>
            
        </div>

    );

}


export default Summaryscreen;