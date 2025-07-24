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
                &gt; Press the button to shoot balloons that pass through the red line. <br/>
                &gt; Every balloon that is shot is worth 2 points. <br/>
                &gt; However, you will lose the same amount of points for every bird that is hit. <br/>
                &gt; Shoot as many balloons as you can within the 30 second time limit. <br/>
                &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
            </p>

            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton" onClick={() => exit()}>
                    Exit Game
                </Link>

                <Link to="/BFRgame" className = "generalbuttonGlitch" onClick={() => playSound(19)}>
                    Start Game
                </Link>

            </div>
            
        </div>

    );

}


export default Instructionsscreen;