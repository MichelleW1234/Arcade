import { Link } from 'react-router-dom';

import { useSPIUser } from '../Providers/SPIUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../Providers/PlayerProvider.jsx';

import "./Summaryscreen.css"

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";


function Summaryscreen() {

    const {SPIUser, setSPIUser} = useSPIUser();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer } = usePlayer();


    const resetGame = () => {

        playSound(19);
        setSPIUser([[],[1, "/SPIM1Instructions"], false]);

    }

    const reset = () => {

        playSound(4);
        setSPIUser([[],[1, "/SPIM1Instructions"], false]);
        setActiveGame(retrieveActiveGame(1));

    }

    return (

        <div className = "screenLayout">

            <div className = "SPIResultsBoard">
                <h1> <span className='SPIWordsGlitch'>Missions Completed: {SPIUser[0].length}</span></h1>
                <h1>Points Earned: {SPIUser[0].length * ActiveGame[1]}</h1>
            </div>

            {Player[0] >= ActiveGame[1] ? (

                <Link to="/SPImission" className = "generalbutton" onClick = {()=> resetGame()}>
                    Play Again
                </Link>

            ) : (

                <p className = "largefont"> You don't have enough points to play this game again.</p>

            )}

            <Link to="/selection" className = "generalbutton" onClick={()=> reset()}>
                Exit Game
            </Link>

        </div>

    )

}
export default Summaryscreen