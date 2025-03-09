import React, { useState } from 'react';
import "./GameSelectionScreen.css";

function GameSelecionScreen (){

    return (
        <div className = "screenLayout">
            
            <h1 className = "headerwords"> Choose a game: </h1>

            <div className = "ArcadeGameBoard">

                <div className = "ArcadeGameContainer">

                    <div className = "ArcadeGame"> 
                        
                        <h2> game 1 (placeholder)</h2>
                        <h3> game description: </h3> 
                        
                    </div>

                    <button > Select </button>
                    
                </div>

            </div>

            <a href="/RPSstart">
                <button className = "generalbutton"> Go to game </button>
            </a>
        </div>
    );

}


export default GameSelecionScreen;