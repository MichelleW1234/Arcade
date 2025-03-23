import React, { useState } from 'react';
import "./ArcadeStartScreen.css";

function ArcadeStartScreen (){

    return (

        <div className = "screenLayout">

            <h1 className = "headerwords">
                Welcome to The <span className = "headerwordsGlitch">Arcade</span>.
            </h1>

            <a href="/rulesAndPoints" className = "generalbutton">
                Enter
            </a>
            
        </div>

    );

}


export default ArcadeStartScreen;