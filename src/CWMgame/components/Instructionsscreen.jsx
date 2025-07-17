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
                &gt; In this game, rather than earning points, you can win prizes, which get added to your inventory. <br/>
                &gt; Press the Grab button for the claw to grab. <br/>
                &gt; The bar at the top of the window will indicate to you when it is the best time to press Grab. <br/>
                &gt; The closer the green circle gets to red, the higher the likelihood that you'll win something. <br/>
                &gt; The ranking of the prizes (cats) from least to most rare is: 1. Black cats 2. Orange cats 3. Siamese cats 4. British ShortHair cats<br/>
                &gt; NOTE: Beyond this point, you will lose points and win no prize if you quit in the middle of the game. <br/>
            </p>

            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton" onClick={() => exit()}>
                    Exit Game
                </Link>

                <Link to="/CWMgame" className = "generalbuttonGlitch" onClick={() => playSound(19)}>
                    Start Game
                </Link>

            </div>
            
        </div>

    );

}


export default Instructionsscreen;