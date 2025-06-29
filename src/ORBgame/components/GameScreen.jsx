import { Link} from 'react-router-dom';
import React, { useState} from "react";

import InnerGameScreen from "./gameScreenComponents/InnerGameScreen.jsx";

import {playSound} from '../../Helpers/helpers.js';

import "./GameScreen.css";

function GameScreen (){

    const [roundNumber, setRoundNumber] = useState(1);

    return (

        <div className = "screenLayout">

            <div className = "ORBOuterGameContainer">

                {roundNumber <= 5 ? (

                    <InnerGameScreen

                        roundNumber = {roundNumber}
                    
                    />

                ) : (

                    <div className = "ORBEndingGameBoard">

                        This is the ending screen.
                
                    </div>


                )}
                
            </div>
            
        </div>

    );

}


export default GameScreen;