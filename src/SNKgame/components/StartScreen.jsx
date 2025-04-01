import { Link } from 'react-router-dom';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {retrieveActiveGame} from '../../Helpers/helpers.js';

function StartScreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();

    return (

        <div className = "screenLayout">

            <h1 className = "headerwords">
                Welcome to <span className = "headerwordsGlitch">Snake.</span>
            </h1>

            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton" onClick={() => setActiveGame(retrieveActiveGame(1))}>
                    Exit Game
                </Link>

                <Link to="/SNKinstructions" className = "generalbuttonGlitch">
                    Enter
                </Link>

            </div>
            
        </div>

    );

}


export default StartScreen;