import { Link } from 'react-router-dom';

import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { useCWMUser } from '../../Providers/CWMUserProvider.jsx';

import Basketball from "../../../Images/ArcadePrizeImages/Basketball.svg";
import Soccerball from "../../../Images/ArcadePrizeImages/Soccerball.svg";
import Paddle from "../../../Images/ArcadePrizeImages/Paddle.svg";
import Football from "../../../Images/ArcadePrizeImages/Football.svg";

import {resetGame, reset} from "../../Helpers/helpers.js";

function SportsSummaryscreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { CWMUser, setCWMUser} = useCWMUser();

    return (

        <div className = "screenLayout">

            <div className = "StatsBoard">
                    
                {CWMUser[0] === 1 ? (

                    <>
                        <p> Congrats! You won a football: </p>
                        <img className = "StatsImage" src = {Football}/>
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>


                ) : CWMUser[0] === 2 ? (

                    <>
                        <p> Congrats! You won a ping pong paddle: </p>
                        <img className = "StatsImage" src = {Paddle}/>
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : CWMUser[0] === 3 ? (

                    <>
                        <p> Congrats! You won a soccerball: </p>
                        <img className = "StatsImage" src = {Soccerball}/>
                        <p> <span className="StatsGlitch">Check your prize inventory</span></p>
                    </>

                ) : CWMUser[0] === 4 ? (

                    <>
                        <p> Congrats! You won a basketball:</p>
                        <img className = "StatsImage" src = {Basketball}/>
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

                <p className="largefont"> You don't have enough points to use the machine again. </p>

            )} 

            <Link to = "/CWMselection" className = "generalbutton" onClick={() => reset(setCWMUser)}> Leave Machine </Link>

        </div>

    );

}


export default SportsSummaryscreen;