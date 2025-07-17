import { Link } from 'react-router-dom';

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useCWMUser } from '../Providers/CWMUserProvider.jsx';

import BlackCat from "../../Images/ArcadePrizeImages/BlackCat.svg";
import OrangeCat from "../../Images/ArcadePrizeImages/OrangeCat.svg";
import SiameseCat from "../../Images/ArcadePrizeImages/SiameseCat.svg";
import BritishShorthairCat from "../../Images/ArcadePrizeImages/BritishShorthairCat.svg";

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

import "./Summaryscreen.css";

function Summaryscreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { CWMUser, setCWMUser} = useCWMUser();

    const resetGame = () => {
        
        playSound(19);
        setCWMUser([0]);

    }

    const reset = () => {
        
        playSound(4);
        setCWMUser([0]);
        setActiveGame(retrieveActiveGame(1));

    }

    return (

        <div className = "screenLayout">

            {CWMUser[0] === 1 ? (

                <div className = "CBLResultsBoard">
                    <h1 className = "CBLResultsWords"> 
                        Congrats! You won a black cat:
                    </h1>
                    <img className = "CWMPrizeImage" src = {BlackCat}/>
                    <h1>Check your prize inventory</h1>
                </div>


            ) : CWMUser[0] === 2 ? (

                <div className = "CBLResultsBoard">
                    <h1 className = "CBLResultsWords"> 
                        Congrats! You won a orange cat:
                    </h1>
                    <img className = "CWMPrizeImage" src = {OrangeCat}/>
                    <h1>Check your prize inventory</h1>
                </div>

            ) : CWMUser[0] === 3 ? (

                <div className = "CBLResultsBoard">
                    <h1 className = "CBLResultsWords"> 
                        Congrats! You won a Siamese cat:
                    </h1>
                    <img className = "CWMPrizeImage" src = {SiameseCat}/>
                    <h1>Check your prize inventory</h1>
                </div>

            ) : CWMUser[0] === 4 ? (

                <div className = "CBLResultsBoard">
                    <h1 className = "CBLResultsWords"> 
                        Congrats! You won a British Shorthair cat:
                    </h1>
                    <img className = "CWMPrizeImage" src = {BritishShorthairCat}/>
                    <h1>Check your prize inventory</h1>
                </div>

            ) : (

                <div className = "CBLResultsBoard">
                    <h1 className = "CBLResultsWords"> 
                        Sorry, you didn't win anything.
                    </h1>
                    <h1 className = "CBLResultsWords"> 
                        Better luck next time!
                    </h1>
                </div>


            )}

            {Player[0] >= ActiveGame[1] ? (

                <Link to = "/CWMgame" className = "generalbutton" onClick = {() => resetGame()}> Play Again </Link>

            ) : (

                <h1 className="largefont"> You don't have enough points to play again. </h1>

            )} 

            <Link to = "/selection" className = "generalbutton" onClick={() => reset()}> Exit Game</Link>

        </div>

    );

}


export default Summaryscreen;