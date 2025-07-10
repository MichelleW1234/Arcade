
import { Link } from 'react-router-dom';

import { usePlayer} from '../Providers/PlayerProvider.jsx';

import {playSound} from "../Helpers/helpers.js";

import "./RulesandPointsscreen.css";

function RulesandPointsscreen (){

    const { Player, setPlayer } = usePlayer();

    const claimPoints = () => {

        playSound(2);
        setPlayer([20, 20]);

    }

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> Arcade Rules: </h1>
            <p className = "largefont">  
                &gt; Your goal is to earn points to win as many prizes as you can. <br/>
                &gt; You will receive 20 points initially. <br/>
                &gt; You must have the required amount of points that correspond to a game to play it.<br/>
                &gt; If you quit a game while it is actively playing, you will automatically lose points. <br/>
                &gt; You can purchase prizes at any point, however, it's your job to manage your points. <br/>
                &gt; Once you are below the minimum number of points to play any of the games, you cannot earn anymore. <br/>
            </p>

            <h1 className = "claimPointsSign"> Claim points: </h1>
            <button className = "generalbutton" onClick={() => claimPoints()}>20 pts</button>

            {Player[0] === 20 && Player[1] === 20 ? (

                <Link to= "/selection" className = "generalbuttonGlitch" onClick = {() => playSound(1)}>
                    Let's go!
                </Link>
            
            ) : (

                null

            )}
        
        </div>

    );

}


export default RulesandPointsscreen;
