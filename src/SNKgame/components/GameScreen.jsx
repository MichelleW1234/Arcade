import { Link } from 'react-router-dom';

import GameBoard from "./gameComponents/GameBoard.jsx";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useSNKUser } from '../Providers/SNKUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

function GamesScreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { SNKUser, setSNKUser } = useSNKUser();
    const { Player, setPlayer} = usePlayer();
    
    const reset = () => {
    
        playSound(4);
        setSNKUser([false, 0]);

        const difference = Player[0] - ActiveGame[1];
    
        if (difference >= 0){
    
            setPlayer(prev => [difference, prev[0]]);
    
        } else {
    
            setPlayer(prev => [0, prev[0]]);
    
        }

        setActiveGame(retrieveActiveGame(1))
    
    }

    return (

        <div>

            <Link to="/selection" className = "generalbutton" onClick={reset}>
                Quit Game
            </Link>

            <div className = "gameScreenLayout">

                <GameBoard/>
                
            </div>`

        </div>

    );

}


export default GamesScreen;