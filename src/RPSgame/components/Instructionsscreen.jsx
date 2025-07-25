
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
        <div className= "screenLayout">
            <h1 className = "instructionsSign"> Instructions: </h1>
            <p className="largefont">
                &gt; A game has 10 rounds.<br/>
                &gt; In each round, you either win or lose to the computer. <br/>
                &gt; If you win, you get a point. <br/>
                &gt; If the computer wins, it gets a point.<br/>
                &gt; There will be a point summary at the end of the game, which will determine who wins overall (or if there is a winner). <br/>
                &gt; You can read about how different objects affect one another by clicking the "Move References" button while playing. <br/>
                &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
            </p>
            <p className="largefont">
                Good luck!
            </p>
            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton" onClick={() => exit()}>
                    Exit Game
                </Link>
                <Link to= "/RPSlevels" className = "generalbuttonGlitch" onClick={() => playSound(19)}>
                    Start Game
                </Link>

            </div>
        </div>
    );
}

export default Instructionsscreen;
