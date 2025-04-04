import { Link } from 'react-router-dom';

import {playSound} from "../Helpers/helpers.js";

function ArcadeStartScreen (){

    return (

        <div className = "StartingScreenLayout">

            <h1 className = "headerwords">
                Welcome to The <span className = "headerwordsGlitch">Arcade</span>.
            </h1>

            <Link to="/rulesAndPoints" className = "generalbuttonGlitch" onClick = {() => {playSound(1)}}>
                Enter
            </Link>
            
        </div>

    );

}


export default ArcadeStartScreen;