import { Link } from 'react-router-dom';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

function Startscreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();

    const leave = () => {
    
        playSound(1);
        setActiveGame(retrieveActiveGame(1));
    
    }

    return (

        <div className = "StartingScreenLayout">

            <div className = "EnterTitleGlow">
                <h1 className = "headerwords">
                    Welcome to the <span className = "headerwordsGlitch"> Claw Arcade</span>.
                </h1>
            </div>

            <div className="generalbuttonContainer">
                <Link to="/selection" className = "generalbutton" onClick = {() => leave()}>
                    Leave
                </Link>
                <Link to="/CWMinstructions" className = "generalbuttonGlitch" onClick = {() => playSound(24)}>
                    Enter
                </Link>
            </div>
            
        </div>

    );

}


export default Startscreen;