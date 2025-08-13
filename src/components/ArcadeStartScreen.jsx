import { useNavigate, Link } from 'react-router-dom';
import { useContext} from 'react';
import useKeyboardShortcut from "../hooks/useKeyboardShortcut";

import {playSound} from "../Helpers/helpers.js";

import { MusicContext } from '../Providers/MusicProvider.jsx';

function ArcadeStartscreen (){

    const { audioRef } = useContext(MusicContext);
    
    const navigate = useNavigate();
    useKeyboardShortcut("Enter", () => {
        playSound(24);
        navigate("/rulesAndPoints");
        
    },
        ".Enter"
    );
    

    return (

        <div className = "StartingScreenLayout">

            <div className = "EnterTitleGlow">
                <h1 className = "headerwords">
                    Welcome to the <span className = "headerwordsGlitch">Arcade</span>.
                </h1>
            </div>

            <Link to="/rulesAndPoints" className = "generalbuttonGlitch Enter" onClick = {() => playSound(24)}>
                <div className="buttonNameContainer">Enter <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
            </Link>
            
        </div>

    );

}


export default ArcadeStartscreen;