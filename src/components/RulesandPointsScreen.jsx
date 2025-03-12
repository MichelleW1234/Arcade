import React, { useState } from 'react';
import "./RulesandPointsScreen.css";

import { usePlayer} from '../Providers/PlayerProvider.jsx';

function RulesandPointsScreen (){

    const { Player, setPlayer } = usePlayer();

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> Arcade Rules: </h1>
            <p className = "largefont">  
                &gt; Do NOT use any of the browser naviation buttons to go backwards or forwards in the game, or you will break the arcade machine. <br/>
                &gt; You will be given 20 points to start with. <br/>
                &gt; For each game, if you win, you will gain points. If you lose, you will lose points.
                If it's a draw, you will neither gain nor lose points. <br/>
                &gt; In order to play a game, you must have the required amount of points in case you lose the game.<br/>
                &gt; Once you are below the minimum number of points to play any of the games, you will have to leave the arcade.<br/>
                &gt; Have fun! <br/>
            </p>

            <h1 className = "claimPointsSign"> Claim points: </h1>
            <button className = "generalbutton" onClick={() => setPlayer([20, 20])}>20 pts</button>

            {Player[0] === 20 && Player[1] === 20 ? 

                <a href = "/selection">
                <button className = "generalbutton"> Let's go! </button> 
                </a>

            : 

                null

            }
        
        </div>

    );

}


export default RulesandPointsScreen;