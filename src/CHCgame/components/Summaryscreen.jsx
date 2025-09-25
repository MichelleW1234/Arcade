import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { useCHCUser } from '../Providers/CHCUserProvider.jsx';
import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useAchievements } from '../../Providers/AchievementsProvider.jsx';

import {playSound, retrieveActiveGame, resetAchievementsUpdate} from "../../Helpers/helpers.js";

function Summaryscreen (){

    const { Player} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Achievements, setAchievements} = useAchievements();
    const { CHCUser, setCHCUser } = useCHCUser();

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
            navigate("/CHCgame");
        }
    },
        ".PlayAgain"
    );



    const reset = () => {
        
        playSound(4);
        setCHCUser([0]);
        setActiveGame(retrieveActiveGame(0));
        resetAchievementsUpdate(Achievements, setAchievements);

    }

    const resetGame = () => {
        
        playSound(19);
        setCHCUser([0]);
        resetAchievementsUpdate(Achievements, setAchievements);

    }


    return (

        <div className = "screenLayout">

            <div className = "StatsBoard">
                <p>Steps Taken: {CHCUser[0]}</p>
                <p> <span className="StatsGlitch">Points Earned: {CHCUser[0]}</span></p>
            </div>

            {Achievements[0][0] === true ? (

                <p className = "largefont"> Congrats! You've won an achievement!</p>

            ) : (

                null

            )}

            {Player[0] >= ActiveGame[1] ? (

                <Link to = "/CHCgame" className = "generalbutton PlayAgain" onClick = {() => resetGame()}> 
                    <div className="buttonNameContainer">Play Again<br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                </Link>

            ) : (

                <p className="largefont"> You don't have enough points to play again. </p>

            )} 

            <Link to = "/selection" className = "generalbutton ExitGame" onClick={() => reset()}> 
                <div className="buttonNameContainer">Exit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

            
        </div>

    );

}


export default Summaryscreen;