import { Link } from 'react-router-dom';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

function Instructionsscreen (){

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
                &gt; Press the stop button when the yellow light lands on green.<br/>
                &gt; If you land it, you gain 10 points. If you miss, you lose 10 points.<br/>
                &gt; You only get one try.<br/>
                &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
            </p>

            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton" onClick={() => exit()}>
                    Exit Game
                </Link>

                <Link to="/ORBgame" className = "generalbuttonGlitch" onClick={() => playSound(19)}>
                    Go to Game
                </Link>

            </div>
            
        </div>

    );

}


export default Instructionsscreen;