import { Link } from 'react-router-dom';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

function Startscreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();

    const exit = () => {

        playSound(4);
        setActiveGame(retrieveActiveGame(1));

    }

    return (

        <div className = "StartingScreenLayout">

            <div className = "header-glow-box">
                <span class="header-border top"></span>
                <span class="header-border right"></span>
                <span class="header-border bottom"></span>
                <span class="header-border left"></span>
                <h1 className = "headerwords">
                    Loading <span className = "headerwordsGlitch">Orbit</span>...
                </h1>
            </div>

            <div className = "generalbuttonContainer">

                <Link to="/selection" className = "generalbutton" onClick={() => exit()}>
                    Exit Game
                </Link>

                <Link to="/ORBinstructions" className = "generalbuttonGlitch" onClick = {() => playSound(1)}>
                    Continue
                </Link>

            </div>
            
        </div>

    );

}


export default Startscreen;