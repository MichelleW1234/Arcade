
import { Link } from 'react-router-dom';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

function StartScreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();

    const exit = () => {

        playSound(4);
        setActiveGame(retrieveActiveGame(1));

    }

    return (
        <div className = "StartingScreenLayout">
            
            <h1 className = "headerwords">
                Welcome to Space <span className = "headerwordsGlitch">Invasion</span>
            </h1>
            
            <div className = "generalbuttonContainer">

                <Link to= "/selection" className = "generalbutton" onClick={exit}>
                    Exit Game
                </Link>
                <Link to="/THRinstructions" className = "generalbuttonGlitch" onClick={() => playSound(1)}>
                    Start Game
                </Link>
                
            </div>
        </div>
    );

}


export default StartScreen;