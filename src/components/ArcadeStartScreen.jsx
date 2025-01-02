import React, { useState } from 'react';
import "./ArcadeStartScreen.css";

function ArcadeStartScreen (){

    return (
        <div className = "startScreen">

            <h1 className = "intro">
                Welcome to The <span className = "introGlitch">Arcade</span>.
            </h1>

            <a href="/selection">
                <button className = "startButton"> Enter </button>
            </a>
            
        </div>
    );

}


export default ArcadeStartScreen;