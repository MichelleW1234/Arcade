import { Link } from 'react-router-dom';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

function InstructionsScreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();

    const exit = () => {

        playSound(4);
        setActiveGame(retrieveActiveGame(1));

    }

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign">
                Instructions: 
            </h1>
            <p className = "largefont">
                &gt; There are four different colors: blue, yellow, pink, and green.<br/>
                &gt; Click on a circle in the gameboard if it flashes the correct color.<br/>
                &gt; The correct color to blast matches that of the light that borders the gameboard, 
                which can change throughout the game. <br/>
                &gt; For every correct color blasted, you gain 3 points. <br/>
                &gt; However, if you blast the wrong color, the game terminates immediately. <br/>
                &gt; A complete game has 50 color instances (though not all of them guarantee points). <br/>
                &gt; Good luck!
            </p>

            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton" onClick={() => exit()}>
                    Exit Game
                </Link>

                <Link to="/CBLgame" className = "generalbuttonGlitch" onClick={() => playSound(19)}>
                    Go to Game
                </Link>

            </div>
            
        </div>

    );

}


export default InstructionsScreen;