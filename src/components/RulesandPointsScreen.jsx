
import { Link } from 'react-router-dom';
import React, {useState } from 'react';

import { usePlayer} from '../Providers/PlayerProvider.jsx';

import {playSound} from "../Helpers/helpers.js";

import "./RulesandPointsscreen.css";

function RulesandPointsscreen (){

    const { Player, setPlayer } = usePlayer();

    const [pointsClaimed, setPointsClaimed] = useState(false);

    const claimPoints = () => {

        playSound(2);
        setPlayer([20]);
        setPointsClaimed(true);

    }

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> <span className='signGlitch'>Arcade Rules:</span> </h1>
            <p className = "largefont">  
                &gt; Your goal is to earn points to win as many prizes as you can. <br/>
                &gt; You will receive 20 points initially. <br/>
                &gt; You must have the required amount of points that correspond to a game to play it.<br/>
                &gt; If you quit a game while it is actively playing, you will automatically lose points. <br/>
                &gt; You can purchase prizes at any point, however, it's your job to manage your points. <br/>
                &gt; Once you are below the minimum number of points to play any of the games, you cannot earn anymore. <br/>
            </p>

            <h1 className = "claimPointsSign"> Claim Points: </h1>

            {pointsClaimed == false ? (

                <button className = "generalbutton" onClick={() => claimPoints()}>20 pts</button>

            ) : (

                <div className = "pointsClaimedButton"> 20 pts </div>

            )}

            {Player[0] === 20 ? (

                <Link to= "/selection" className = "generalbuttonGlitch" onClick = {() => playSound(1)}>
                    Let's Go!
                </Link>
            
            ) : (

                null

            )}
        
        </div>

    );

}


export default RulesandPointsscreen;
