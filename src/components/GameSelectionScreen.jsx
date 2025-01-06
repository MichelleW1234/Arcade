import React, { useState } from 'react';
import "./GameSelectionScreen.css";

function GameSelecionScreen (){

    return (
        <div className = "ArcadeselectionScreen">
            
            <h1 className = "intro"> Choose a game: </h1>


            <div className = "ArcadeGameBoard">

                <div className = "ArcadeGameContainer">

                    <div className = "ArcadeGame"> 
                        
                        <h2> game 1 (placeholder)</h2>
                        <h3> game description: </h3> 
                        
                    </div>

                    <button> Select </button>

                </div>

            </div>

            <a href="/start">
                <button > Go to game </button>
            </a>
        </div>
    );

}


export default GameSelecionScreen;