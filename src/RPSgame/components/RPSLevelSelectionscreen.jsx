import React, { useState} from "react";
import { Link } from 'react-router-dom';

import { useRPSUser} from '../Providers/RPSUserProvider.jsx';
import { getInput, getReferences } from "../Helpers/RPShelpers.js";

import {playSound} from '../../Helpers/helpers.js';

import "./RPSLevelSelectionscreen.css";

function LevelSelectionscreen (){

    const [activeButton, setActiveButton] = useState(1);

    const { RPSUser, setRPSUser} = useRPSUser();

    const handleClick = (index) => {

        playSound(3);
        setActiveButton(index);

        const currLevelInput = getInput(index);
        const currLevelReferences = getReferences(index);
        setRPSUser([index, currLevelInput, currLevelReferences, 0, 0])

    };

    return (

        <div className = "screenLayout">

            <h1 className = "headerwords"> Variations: </h1>

            <div className = "RPSlevelsContainer">

                <div className = "RPSLevelsWindowContainer">

                    <div className = "RPSLevelsWindow"> 
                        <h2>Rock, Paper, Scissors</h2>
                    </div>
                    <button
                    className={`RPSLevelButton ${activeButton === 1 ? 'active' : ''}`}
                    onClick={() => handleClick(1)}
                    >
                        Select
                    </button>

                </div>   

                <div className = "RPSLevelsWindowContainer">

                    <div className = "RPSLevelsWindow"> 
                        <h2>Rock, Paper, Scissors, <span className="RPSLevelGlitch">Lizard, Spock</span></h2> 
                    </div>
                    <button
                    className={`RPSLevelButton ${activeButton === 2 ? 'active' : ''}`}
                    onClick={() => handleClick(2)}
                    >
                        Select
                    </button>

                </div>    

                <div className = "RPSLevelsWindowContainer">

                    <div className = "RPSLevelsWindow"> 
                        <h2>Rock, Paper, Scissors, Gun, Shield</h2>
                    </div>
                    <button
                    className={`RPSLevelButton ${activeButton === 3 ? 'active' : ''}`}
                    onClick={() => handleClick(3)}
                    >
                        Select
                    </button>

                </div>   

            </div>

            <Link to= "/RPSgame" className = "generalbuttonGlitch" onClick={() => playSound(18)}>
                Continue to Game
            </Link>
            
        </div>
        
    );
}

export default LevelSelectionscreen;