import { useNavigate, Link } from 'react-router-dom';
import { useContext} from 'react';
import useKeyboardShortcut from "../hooks/useKeyboardShortcut.js";

import {playSound} from "../Helpers/helpers.js";

import { MusicContext } from '../Providers/MusicProvider.jsx';

function Continuationscreen (){

    const { audioRef } = useContext(MusicContext);
    
    const navigate = useNavigate();
    useKeyboardShortcut("Enter", () => {
        playSound(24);
        navigate("/selection");
        
    },
        ".Enter"
    );
    

    return (

        <div className = "StartingScreenLayout">

            <div className = "EnterTitleGlow">
                <h1 className = "headerwords">
                    <span className = "headerwordsGlitch">Welcome Back.</span>
                </h1>
            </div>

            <Link to="/selection" className = "generalbuttonGlitch Enter" onClick = {() => playSound(24)}>
                <div className="buttonNameContainer">Continue <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
            </Link>
            
        </div>

    );

}


export default Continuationscreen;