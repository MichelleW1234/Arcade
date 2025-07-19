import { Link } from 'react-router-dom';

import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { useCWMUser } from '../../Providers/CWMUserProvider.jsx';

import BlackCat from "../../../Images/ArcadePrizeImages/BlackCat.svg";
import OrangeCat from "../../../Images/ArcadePrizeImages/OrangeCat.svg";
import SiameseCat from "../../../Images/ArcadePrizeImages/SiameseCat.svg";
import BritishShorthairCat from "../../../Images/ArcadePrizeImages/BritishShorthairCat.svg";

import {resetGame, reset} from "../../Helpers/helpers.js";

import "../../../components/GameSummaryscreen.css";

function SpaceSummaryscreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { CWMUser, setCWMUser} = useCWMUser();

    return (

        <div className = "screenLayout">

            <div className = "StatsBoard">
                    
                {CWMUser[0] === 1 ? (

                    <>
                        <p> Congrats! You won a: </p>
                        <img className = "StatsImage" />
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>


                ) : CWMUser[0] === 2 ? (

                    <>
                        <p> Congrats! You won a : </p>
                        <img className = "StatsImage" />
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : CWMUser[0] === 3 ? (

                    <>
                        <p> Congrats! You won a : </p>
                        <img className = "StatsImage" />
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : CWMUser[0] === 4 ? (

                    <>
                        <p> Congrats! You won a :</p>
                        <img className = "StatsImage" />
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

                <Link to = "/CWMsportsgame" className = "generalbutton" onClick = {() => resetGame(setCWMUser)}> Play Again </Link>

            ) : (

                <h1 className="largefont"> You don't have enough points to use the machine again. </h1>

            )} 

            <Link to = "/CWMselection" className = "generalbutton" onClick={() => reset(setCWMUser)}> Leave Machine </Link>

        </div>

    );

}


export default SpaceSummaryscreen;