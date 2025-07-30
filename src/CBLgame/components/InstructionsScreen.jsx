import { Link } from 'react-router-dom';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {playSound, exitGame} from '../../Helpers/helpers.js';

function Instructionsscreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> <span className='signGlitch'>Instructions:</span></h1>
            <p className = "largefont">
                &gt; Click on a circle in the gameboard if it flashes the color that matches the light bordering the gameboard, 
                which can change throughout the game. <br/>
                &gt; There are four different colors: blue, yellow, pink, and green.<br/>
                &gt; For every correct color blasted, you gain 3 points. <br/>
                &gt; If you blast the wrong color, the game ends immediately. <br/>
                &gt; There are has 50 color instances in total (though not all of them guarantee points). <br/>
                &gt; It costs 10 points to play this game. <br/>
                &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
            </p>

            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton" onClick={() => exitGame(setActiveGame)}>
                    Exit Game
                </Link>

                <Link to="/CBLgame" className = "generalbuttonGlitch" onClick={() => playSound(19)}>
                    Start Game
                </Link>

            </div>
            
        </div>

    );

}


export default Instructionsscreen;