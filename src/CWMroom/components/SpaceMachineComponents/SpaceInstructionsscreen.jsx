import { Link } from 'react-router-dom';

import {playSound} from '../../../Helpers/helpers.js';

function SpaceInstructionsscreen (){

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> <span className='signGlitch'>Instructions:</span></h1>
            
            <p className = "largefont">
                &gt; The prizes that you can win from this machine are celestial bodies. <br/>
                &gt; The ranking of the prizes from least to most rare is: <br/>
                &nbsp; &nbsp; 1. Andromeda Galaxy <br/>
                &nbsp; &nbsp; 2. Sun <br/>
                &nbsp; &nbsp; 3. Saturn <br/>
                &nbsp; &nbsp; 4. Earth <br/>
                &gt; NOTE: Beyond this point, you will lose points and win no prize if you quit in the middle of the game. <br/>
            </p>

            <div className="generalbuttonContainer">
                <Link to="/CWMselection" className = "generalbutton" onClick={() => playSound(4)}>
                    Leave Machine
                </Link>
                <Link to="/CWMspacegame" className = "generalbuttonGlitch" onClick={() => playSound(18)}>
                    Continue
                </Link>
            </div>
            
        </div>

    );

}


export default SpaceInstructionsscreen;