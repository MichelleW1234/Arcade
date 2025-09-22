import { useNavigate, Link} from 'react-router-dom';
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";

import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { useCWMUser } from '../../Providers/CWMUserProvider.jsx';

import blackCat from "../../../Images/ArcadePrizeImages/BlackCat.svg";
import orangeCat from "../../../Images/ArcadePrizeImages/OrangeCat.svg";
import siameseCat from "../../../Images/ArcadePrizeImages/SiameseCat.svg";
import britishShorthairCat from "../../../Images/ArcadePrizeImages/BritishShorthairCat.svg";

import {resetGame, reset} from "../../Helpers/helpers.js";

function CatSummaryscreen (){

    const { Player } = usePlayer();
    const { ActiveGame } = useActiveGame();
    const { CWMUser, setCWMUser} = useCWMUser();

    const navigate = useNavigate();
    useKeyboardShortcut("Enter", () => {
        if (Player[0] >= ActiveGame[1]){
            resetGame(setCWMUser);
            navigate("/CWMcatgame");
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
                        <p> Congrats! You won a black cat: </p>
                        <img className = "StatsImage" src = {blackCat} alt = "" />
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>


                ) : CWMUser[0] === 2 ? (

                    <>
                        <p> Congrats! You won a orange cat: </p>
                        <img className = "StatsImage" src = {orangeCat} alt = "" />
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : CWMUser[0] === 3 ? (

                    <>
                        <p> Congrats! You won a Siamese cat: </p>
                        <img className = "StatsImage" src = {siameseCat} alt = "" />
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : CWMUser[0] === 4 ? (

                    <>
                        <p> Congrats! You won a British Shorthair cat:</p>
                        <img className = "StatsImage" src = {britishShorthairCat} alt = "" />
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

                <Link to = "/CWMcatgame" className = "generalbutton PlayAgain" onClick = {() => resetGame(setCWMUser)}> 
                    <div className="buttonNameContainer"> Play Again<br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                </Link>

            ) : (

                <p className="largefont"> You don't have enough points to use the machine again. </p>

            )} 

            <Link to = "/CWMselection" className = "generalbutton LeaveMachine" onClick={() => reset(setCWMUser)}> 
                <div className="buttonNameContainer"> Leave Machine<br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

        </div>

    );

}


export default CatSummaryscreen;