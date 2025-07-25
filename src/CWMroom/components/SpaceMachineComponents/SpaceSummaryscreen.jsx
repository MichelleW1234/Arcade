import { Link } from 'react-router-dom';

import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { useCWMUser } from '../../Providers/CWMUserProvider.jsx';

import Earth from "../../../Images/ArcadePrizeImages/Earth.svg";
import Sun from "../../../Images/ArcadePrizeImages/Sun.svg";
import Saturn from "../../../Images/ArcadePrizeImages/Saturn.svg";
import Andromeda from "../../../Images/ArcadePrizeImages/Andromeda.svg";

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
                        <p> Congrats! You won an Andromeda Galaxy: </p>
                        <img className = "StatsImage" src = {Andromeda}/>
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>


                ) : CWMUser[0] === 2 ? (

                    <>
                        <p> Congrats! You won a Sun: </p>
                        <img className = "StatsImage" src = {Sun}/>
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : CWMUser[0] === 3 ? (

                    <>
                        <p> Congrats! You won a Saturn: </p>
                        <img className = "StatsImage" src = {Saturn}/>
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : CWMUser[0] === 4 ? (

                    <>
                        <p> Congrats! You won an Earth:</p>
                        <img className = "StatsImage" src = {Earth}/>
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

                <Link to = "/CWMspacegame" className = "generalbutton" onClick = {() => resetGame(setCWMUser)}> Play Again </Link>

            ) : (

                <h1 className="largefont"> You don't have enough points to use the machine again. </h1>

            )} 

            <Link to = "/CWMselection" className = "generalbutton" onClick={() => reset(setCWMUser)}> Leave Machine </Link>

        </div>

    );

}


export default SpaceSummaryscreen;