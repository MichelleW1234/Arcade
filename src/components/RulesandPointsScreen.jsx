
import { Link } from 'react-router-dom';

import "./RulesandPointsScreen.css";

import { usePlayer} from '../Providers/PlayerProvider.jsx';

function RulesandPointsScreen (){

    const { Player, setPlayer } = usePlayer();

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> Arcade Rules: </h1>
            <p className = "largefont">  
                &gt; Do NOT use any of your browser navigation buttons. <br/>
                &gt; You will receive 20 points initially. <br/>
                &gt; For each game, if you win, you will gain points. If you lose, you will lose points.
                If it's a draw, you will neither gain nor lose points. <br/>
                &gt; You must have the required amount of points that correspond to a game to play it.<br/>
                &gt; If you quit a game while it is actively playing, you will automatically lose points. <br/>
                &gt; Once you are below the minimum number of points to play any of the games, you must leave the arcade.<br/>
            </p>

            <h1 className = "claimPointsSign"> Claim points: </h1>
            <button className = "generalbutton" onClick={() => setPlayer([20, 20])}>20 pts</button>

            {Player[0] === 20 && Player[1] === 20 ? (

                <Link to= "/selection" className = "generalbuttonGlitch">
                    Let's go!
                </Link>
            
            ) : (

                null

            )}
        
        </div>

    );

}


export default RulesandPointsScreen;
