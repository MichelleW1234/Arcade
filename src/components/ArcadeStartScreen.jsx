import { Link } from 'react-router-dom';
import { useContext} from 'react';

import {playSound} from "../Helpers/helpers.js";

import { MusicContext } from '../Providers/MusicProvider.jsx';

function ArcadeStartscreen (){

    const { audioRef } = useContext(MusicContext);

    return (

        <div className = "StartingScreenLayout">

            <div className = "EnterTitleGlow">
                <h1 className = "headerwords">
                    Welcome to the <span className = "headerwordsGlitch">Arcade</span>.
                </h1>
            </div>

            <Link to="/rulesAndPoints" className = "generalbuttonGlitch" onClick = {() => playSound(24)}>
                Enter
            </Link>
            
        </div>

    );

}


export default ArcadeStartscreen;