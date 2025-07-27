import { Link } from 'react-router-dom';

import GameBoard from "./SNKGameComponents/GameBoard.jsx";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useSNKUser } from '../Providers/SNKUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

function Gamesscreen(){

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { SNKUser, setSNKUser } = useSNKUser();
    const { Player, setPlayer} = usePlayer();
    
    const reset = () => {
    
        playSound(4);
        
        setSNKUser([false, 0]);
        setPlayer([Player[0] - ActiveGame[1]]);
        setActiveGame(retrieveActiveGame(1))
    
    }

    return (

        <div>

            <Link to="/selection" className = "generalbutton" onClick={() => reset()}>
                Quit Game
            </Link>

            <div className = "gameScreenLayout">

                <GameBoard/>
                
            </div>

        </div>

    );

}


export default Gamesscreen;