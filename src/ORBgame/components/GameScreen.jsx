import { Link } from 'react-router-dom';

import {playSound} from '../../Helpers/helpers.js';

function GameScreen (){

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign">
                Instructions: 
            </h1>
            <p className = "largefont">
                &gt; Instructions go here.
            </p>
            
        </div>

    );

}


export default GameScreen;