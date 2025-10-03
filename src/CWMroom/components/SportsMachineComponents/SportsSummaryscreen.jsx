import { useNavigate, Link} from 'react-router-dom';
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";

import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { useAchievements } from '../../../Providers/AchievementsProvider.jsx';
import { useCWMUser } from '../../Providers/CWMUserProvider.jsx';

import basketball from "../../../Images/ArcadePrizeImages/Basketball.svg";
import soccerball from "../../../Images/ArcadePrizeImages/Soccerball.svg";
import paddle from "../../../Images/ArcadePrizeImages/Paddle.svg";
import football from "../../../Images/ArcadePrizeImages/Football.svg";

import {resetGame, reset} from "../../Helpers/helpers.js";

function SportsSummaryscreen (){

    const { Player } = usePlayer();
    const { ActiveGame } = useActiveGame();
    const { CWMUser, setCWMUser} = useCWMUser();
    const { Achievements, setAchievements} = useAchievements();

    const navigate = useNavigate();
    useKeyboardShortcut("Enter", () => {
        if (Player[0] >= ActiveGame[1]){
            resetGame(setCWMUser, Achievements, setAchievements);
            navigate("/CWMsportsgame");
        }
    },
        ".PlayAgain"
    );

    useKeyboardShortcut("Escape", () => {
        reset(setCWMUser, Achievements, setAchievements);
        navigate("/CWMselection");
    },
        ".LeaveMachine"
    );


    return (

        <div className = "screenLayout">

            <div className = "StatsBoard">
                    
                {CWMUser[0] === 1 ? (

                    <>
                        <p> Congrats! You won a football: </p>
                        <img className = "StatsImage" src = {football} alt = "" />
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>


                ) : CWMUser[0] === 2 ? (

                    <>
                        <p> Congrats! You won a ping pong paddle: </p>
                        <img className = "StatsImage" src = {paddle} alt = "" />
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : CWMUser[0] === 3 ? (

                    <>
                        <p> Congrats! You won a soccerball: </p>
                        <img className = "StatsImage" src = {soccerball} alt = "" />
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : CWMUser[0] === 4 ? (

                    <>
                        <p> Congrats! You won a basketball:</p>
                        <img className = "StatsImage" src = {basketball} alt = "" />
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : (

                    <>
                        <p> Sorry, you didn't win anything. </p>
                        <p> <span className="StatsGlitch"> Better luck next time! </span></p>
                    </>

                )}

            </div>

            {Achievements[0][0] === true ? (

                <p className = "largefont"> Congrats! You've won an achievement!</p>

            ) : (

                null

            )}

            {Player[0] >= ActiveGame[1] ? (

                <Link to = "/CWMsportsgame" className = "generalbutton PlayAgain" onClick = {() => resetGame(setCWMUser, Achievements, setAchievements)}> 
                    <div className="buttonNameContainer"> Play Again <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                </Link>

            ) : (

                <p className="largefont"> You don't have enough points to use the machine again. </p>

            )} 

            <Link to = "/CWMselection" className = "generalbutton LeaveMachine" onClick={() => reset(setCWMUser, Achievements, setAchievements)}> 
                <div className="buttonNameContainer">Leave Machine <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

        </div>

    );

}


export default SportsSummaryscreen;