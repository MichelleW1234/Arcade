import { Link } from 'react-router-dom';
import { useContext} from 'react';

import {playSound} from "../Helpers/helpers.js";

import { MusicContext } from '../Providers/MusicProvider.jsx';


function ArcadeStartScreen (){

    const { audioRef } = useContext(MusicContext);

    return (

        <div className = "StartingScreenLayout">

            <h1 className = "headerwords">
                Welcome to The <span className = "headerwordsGlitch">Arcade</span>.
            </h1>

            <Link to="/rulesAndPoints" className = "generalbuttonGlitch" onClick = {() => playSound(1)}>
                Enter
            </Link>
            
        </div>

    );

}


export default ArcadeStartScreen;