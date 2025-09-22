import { useNavigate, Link} from 'react-router-dom';
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";

import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { useCWMUser } from '../../Providers/CWMUserProvider.jsx';

import earth from "../../../Images/ArcadePrizeImages/Earth.svg";
import sun from "../../../Images/ArcadePrizeImages/Sun.svg";
import saturn from "../../../Images/ArcadePrizeImages/Saturn.svg";
import andromeda from "../../../Images/ArcadePrizeImages/Andromeda.svg";

import {resetGame, reset} from "../../Helpers/helpers.js";

function SpaceSummaryscreen (){

    const { Player} = usePlayer();
    const { ActiveGame} = useActiveGame();
    const { CWMUser, setCWMUser} = useCWMUser();

    const navigate = useNavigate();
    useKeyboardShortcut("Enter", () => {
        if (Player[0] >= ActiveGame[1]){
            resetGame(setCWMUser);
            navigate("/CWMspacegame");
        }
    },
        ".PlayAgain"
    );

    useKeyboardShortcut("Escape", () => {
        reset(setCWMUser);
        navigate("/CWMselection");
    },
        ".LeaveMachine"
    );

    return (

        <div className = "screenLayout">

            <div className = "StatsBoard">
                    
                {CWMUser[0] === 1 ? (

                    <>
                        <p> Congrats! You won an Andromeda Galaxy: </p>
                        <img className = "StatsImage" src = {andromeda} alt = "" />
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>


                ) : CWMUser[0] === 2 ? (

                    <>
                        <p> Congrats! You won a Sun: </p>
                        <img className = "StatsImage" src = {sun} alt = "" />
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : CWMUser[0] === 3 ? (

                    <>
                        <p> Congrats! You won a Saturn: </p>
                        <img className = "StatsImage" src = {saturn} alt = "" />
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : CWMUser[0] === 4 ? (

                    <>
                        <p> Congrats! You won an Earth:</p>
                        <img className = "StatsImage" src = {earth} alt = "" />
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : (

                    <>
                        <p> Sorry, you didn't win anything. </p>
                        <p> <span className="StatsGlitch"> Better luck next time! </span></p>
                    </>

                )}

            </div>

            {Player[0] >= ActiveGame[1] ? (

                <Link to = "/CWMspacegame" className = "generalbutton PlayAgain" onClick = {() => resetGame(setCWMUser)}> 
                    <div className="buttonNameContainer">Play Again<br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                </Link>

            ) : (

                <p className="largefont"> You don't have enough points to use the machine again. </p>

            )} 

            <Link to = "/CWMselection" className = "generalbutton LeaveMachine" onClick={() => reset(setCWMUser)}> 
                <div className="buttonNameContainer"> Leave Machine <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

        </div>

    );

}


export default SpaceSummaryscreen;