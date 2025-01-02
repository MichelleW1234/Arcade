import React, { useState } from 'react';
import "./GameSelectionScreen.css";

function GameSelecionScreen (){

    return (
        <div className = "selectionScreen">
            
            <h1>Choose a game: </h1>

            <a href="/start">
                <button > Go to game </button>
            </a>
        </div>
    );

}


export default GameSelecionScreen;