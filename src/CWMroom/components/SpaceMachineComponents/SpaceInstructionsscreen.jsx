import { Link } from 'react-router-dom';

import {playSound} from '../../../Helpers/helpers.js';

function SpaceInstructionsscreen (){

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign">
                Instructions: 
            </h1>
            <p className = "largefont">
                &gt; The prizes that you can win from this machine are space elements. <br/>
                &gt; The ranking of the prizes from least to most rare is: <br/>
                &nbsp; &nbsp; 1.  <br/>
                &nbsp; &nbsp; 2.  <br/>
                &nbsp; &nbsp; 3.  <br/>
                &nbsp; &nbsp; 4.  <br/>
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