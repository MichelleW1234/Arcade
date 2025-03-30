
import { Link } from 'react-router-dom';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {retrieveActiveGame} from '../../Helpers/helpers.js';

function Startscreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();

    return (
        <div className = "screenLayout">
            
            <h1 className = "headerwords">
                Welcome to Rock-Paper-Scissor<span className = "headerwordsGlitch">s</span>
            </h1>
            
            <div className = "generalbuttonContainer">

                <Link to= "/selection" className = "generalbuttonGlitch" onClick={() => setActiveGame(retrieveActiveGame(1))}>
                    Exit Game
                </Link>
                <Link to="/RPSinstructions" className = "generalbuttonGlitch">
                    Start Game
                </Link>
                
            </div>
        </div>
    );

}


export default Startscreen;
