import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {useCBLUser} from "../Providers/CBLUserProvider.jsx";
import { useAchievements } from '../../Providers/AchievementsProvider.jsx';

import {playSound, retrieveActiveGame, resetAchievementsUpdate} from "../../Helpers/helpers.js";

function Summaryscreen (){

    const { Player} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const {CBLUser, setCBLUser} = useCBLUser();
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
            navigate("/CBLgame");
        }
    },
        ".PlayAgain"
    );




    const resetGame = () => {
        
        playSound(19)
        setCBLUser([0]);
        resetAchievementsUpdate(Achievements, setAchievements);

    }

    const reset = () => {
        
        playSound(4);
        setCBLUser([0]);
        setActiveGame(retrieveActiveGame(0));
        resetAchievementsUpdate(Achievements, setAchievements);

    }

    return (

        <div className = "screenLayout">

            <div className = "StatsBoard">

                <p>Number of colors blasted: {CBLUser[0]}</p>
                <p>  <span className="StatsGlitch"> Points earned: {CBLUser[0]*3} </span> </p>
    
            </div>

            {Achievements[0][0] === true ? (

                <p className = "largefont"> Congrats! You've won an achievement!</p>

            ) : (

                null

            )}

            {Player[0] >= ActiveGame[1] ? (

                <Link to = "/CBLgame" className = "generalbutton PlayAgain" onClick = {() => resetGame()}> 
                    <div className="buttonNameContainer">Play Again <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                </Link>

            ) : (

                <p className="largefont"> You don't have enough points to play again. </p>

            )} 

            <Link to = "/selection" className = "generalbutton ExitGame" onClick={() => reset()}> 
                <div className="buttonNameContainer"> Exit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

        </div>

    );

}


export default Summaryscreen;