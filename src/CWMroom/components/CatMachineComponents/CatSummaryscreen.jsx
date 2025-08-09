import { useNavigate, Link} from 'react-router-dom';
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";

import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { useCWMUser } from '../../Providers/CWMUserProvider.jsx';

import BlackCat from "../../../Images/ArcadePrizeImages/BlackCat.svg";
import OrangeCat from "../../../Images/ArcadePrizeImages/OrangeCat.svg";
import SiameseCat from "../../../Images/ArcadePrizeImages/SiameseCat.svg";
import BritishShorthairCat from "../../../Images/ArcadePrizeImages/BritishShorthairCat.svg";

import {resetGame, reset} from "../../Helpers/helpers.js";

function CatSummaryscreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { CWMUser, setCWMUser} = useCWMUser();

    const navigate = useNavigate();
    useKeyboardShortcut("Enter", () => {
        if (Player[0] >= ActiveGame[1]){
            resetGame(setCWMUser);
            navigate("/CWMcatgame");
        }
    });

    useKeyboardShortcut("Escape", () => {
        reset(setCWMUser);
        navigate("/CWMselection");
    });

    return (

        <div className = "screenLayout">

            <div className = "StatsBoard">
                    
                {CWMUser[0] === 1 ? (

                    <>
                        <p> Congrats! You won a black cat: </p>
                        <img className = "StatsImage" src = {BlackCat}/>
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>


                ) : CWMUser[0] === 2 ? (

                    <>
                        <p> Congrats! You won a orange cat: </p>
                        <img className = "StatsImage" src = {OrangeCat}/>
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : CWMUser[0] === 3 ? (

                    <>
                        <p> Congrats! You won a Siamese cat: </p>
                        <img className = "StatsImage" src = {SiameseCat}/>
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : CWMUser[0] === 4 ? (

                    <>
                        <p> Congrats! You won a British Shorthair cat:</p>
                        <img className = "StatsImage" src = {BritishShorthairCat}/>
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

                <Link to = "/CWMcatgame" className = "generalbutton" onClick = {() => resetGame(setCWMUser)}> Play Again </Link>

            ) : (

                <p className="largefont"> You don't have enough points to use the machine again. </p>

            )} 

            <Link to = "/CWMselection" className = "generalbutton" onClick={() => reset(setCWMUser)}> Leave Machine </Link>

        </div>

    );

}


export default CatSummaryscreen;