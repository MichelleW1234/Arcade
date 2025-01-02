import React, { useState } from 'react';
import "./GameSelectionScreen.css";

function GameSelecionScreen (){

    return (
        <div className = "selectionScreen">
            
            <h1 className = "intro">Choose a game: </h1>

            <a href="/start">
                <button className = "enterArcadeButton"> Go to game </button>
            </a>
        </div>
    );

}


export default GameSelecionScreen;