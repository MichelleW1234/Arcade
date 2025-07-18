import { Link } from 'react-router-dom';

import {playSound} from '../../Helpers/helpers.js';

function Startscreen (){

    return (

        <div className = "StartingScreenLayout">

            <div className = "EnterTitleGlow">
                <h1 className = "headerwords">
                    Welcome to the <span className = "headerwordsGlitch"> Claw Arcade</span>.
                </h1>
            </div>

            <Link to="/CWMinstructions" className = "generalbuttonGlitch" onClick = {() => playSound(24)}>
                Enter
            </Link>
            
        </div>

    );

}


export default Startscreen;