import React, { useState } from 'react';
import "./Startscreen.css";

function Startscreen (){

    return (
        <div className = "startScreen">
            <h1 className = "intro">
                Hello. You are about to start. Are you <span className = "introGlitch">ready</span>?
            </h1>
            <a href="/instructions">
                <button className = "startButton"> Start Game</button>
            </a>
        </div>
    );

}


export default Startscreen;