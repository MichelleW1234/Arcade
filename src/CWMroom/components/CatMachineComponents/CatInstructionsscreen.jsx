import { Link } from 'react-router-dom';

import {playSound} from '../../../Helpers/helpers.js';

function CatInstructionsscreen (){

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign">
                Instructions: 
            </h1>
            <p className = "largefont">
                &gt; The prizes that you can win from this machine are cats. <br/>
                &gt; The ranking of the prizes from least to most rare is: <br/>
                &nbsp; &nbsp; 1. Black cats <br/>
                &nbsp; &nbsp; 2. Orange cats <br/>
                &nbsp; &nbsp; 3. Siamese cats <br/>
                &nbsp; &nbsp; 4. British Shorthair cats<br/>
                &gt; NOTE: Beyond this point, you will lose points and win no prize if you quit in the middle of the game. <br/>
            </p>

            <Link to="/CWMcatgame" className = "generalbuttonGlitch" onClick={() => playSound(18)}>
                Continue
            </Link>
            
        </div>

    );

}


export default CatInstructionsscreen;