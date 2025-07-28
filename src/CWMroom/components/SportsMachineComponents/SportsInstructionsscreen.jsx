import { Link } from 'react-router-dom';

import {playSound} from '../../../Helpers/helpers.js';

function SportsInstructionsscreen (){

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> <span className='signGlitch'>Instructions:</span></h1>
            
            <p className = "largefont">
                &gt; The prizes that you can win from this machine are sports equipment. <br/>
                &gt; The ranking of the prizes from least to most rare is: <br/>
                &nbsp; &nbsp; 1. Football <br/>
                &nbsp; &nbsp; 2. Paddle <br/>
                &nbsp; &nbsp; 3. Soccerball<br/>
                &nbsp; &nbsp; 4. Basketball<br/>
                &gt; NOTE: Beyond this point, you will lose points and win no prize if you quit in the middle of the game. <br/>
            </p>

            <div className="generalbuttonContainer">
                <Link to="/CWMselection" className = "generalbutton" onClick={() => playSound(4)}>
                    Leave Machine
                </Link>
                <Link to="/CWMsportsgame" className = "generalbuttonGlitch" onClick={() => playSound(18)}>
                    Continue
                </Link>
            </div>
            
        </div>

    );

}


export default SportsInstructionsscreen;