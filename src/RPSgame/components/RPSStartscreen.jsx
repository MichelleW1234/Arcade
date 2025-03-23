import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {retrieveActiveGame} from '../../Helpers/helpers.js';

function Startscreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();

    return (
        <div className = "screenLayout">
            <h1 className = "headerwords">
                Welcome to Rock-Paper-Scissor<span className = "headerwordsGlitch">s</span>
            </h1>
            
            <div className = "generalbuttonContainer">
                <a href="/selection" className = "generalbutton" onClick={() => setActiveGame(retrieveActiveGame(1))}> 
                    Go Back
                </a>
                <a href="/RPSinstructions" className = "generalbuttonGlitch">
                    Start Game
                </a>
            </div>
        </div>
    );

}


export default Startscreen;