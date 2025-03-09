import React, { useState } from 'react';

function Startscreen (){

    return (
        <div className = "screenLayout">
            <h1 className = "headerwords">
                Welcome to Rock-Paper-Scissor<span className = "headerwordsGlitch">s</span>
            </h1>
            <a href="/RPSinstructions">
                <button className = "generalbutton"> Start Game</button>
            </a>
        </div>
    );

}


export default Startscreen;