import React, { useState } from 'react';
import "./ArcadeStartScreen.css";

function ArcadeStartScreen (){

    return (
        <div className = "startScreen">

            <h1 className = "intro">
                Hello. You are about to enter The Arcade. Are you <span className = "introGlitch">ready</span>?
            </h1>

            <a href="/selection">
                <button className = "enterArcadeButton"> Enter </button>
            </a>
            
        </div>
    );

}


export default ArcadeStartScreen;