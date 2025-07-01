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
                &gt; Your goal is to use the controls to guide the snake to eat the apples. <br/>
                &gt; By pressing the corresponding buttons, you can guide the snake to move it up, down, left, and right. <br/>
                &gt; However, the snake cannot immediately move in the opposite direction that it is traveling in
                at any given time and must be turned around with the necessary controls.<br/>
                &gt; For every apple that is eaten, you will gain 2 points. <br/>
                &gt; You will automatically give up 5 points by playing this game. <br/>
                &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
            </p>

            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton" onClick={exit}>
                    Exit Game
                </Link>

                <Link to="/SNKgame" className = "generalbuttonGlitch" onClick={() => playSound(19)}>
                    Go to Game
                </Link>

            </div>
            
        </div>

    );

}


export default InstructionsScreen;