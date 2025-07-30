import { Link } from 'react-router-dom';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {playSound, exitGame} from '../../Helpers/helpers.js';

function Instructionsscreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> <span className='signGlitch'>Instructions:</span></h1>

            <p className = "largefont">
                &gt; Press Stop when the yellow light lands on green.<br/>
                &gt; If you land it, you gain 5 points. If you miss, you lose 5 points.<br/>
                &gt; You get one attempt.<br/>
                &gt; It costs 5 points to play this game. <br/>
                &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
            </p>

            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton" onClick={() => exitGame(setActiveGame)}>
                    Exit Game
                </Link>

                <Link to="/ORBgame" className = "generalbuttonGlitch" onClick={() => playSound(19)}>
                    Start Game
                </Link>

            </div>
            
        </div>

    );

}


export default Instructionsscreen;