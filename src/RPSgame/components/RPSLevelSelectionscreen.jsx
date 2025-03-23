import React, { useState} from "react";

import { useRPSUser} from '../Providers/RPSUserProvider.jsx';
import { getInput, getReferences } from "../Helpers/RPShelpers.js";

import "./RPSLevelSelectionscreen.css";

function LevelSelectionscreen (){

    const [activeButton, setActiveButton] = useState(1);

    const { RPSUser, setRPSUser} = useRPSUser();

    const handleClick = (index) => {

        setActiveButton(index);

        const currLevelInput = getInput(index);
        const currLevelReferences = getReferences(index);
        setRPSUser([index, currLevelInput, currLevelReferences, 0, 0])

    };

    return (
        <div className = "screenLayout">

            <h1 className = "headerwords"> Choose a level: </h1>

            <div className = "RPSlevelsContainer">

                <div className = "RPSLevelsWindowContainer">

                    <div className = "RPSLevelsWindow"> 
                        <h2>Level 1</h2>
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
                        <h2><span className="RPSLevelGlitch">Level</span> 2</h2> 
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
                        <h2>Level 3</h2>
                    </div>
                    <button
                    className={`RPSLevelButton ${activeButton === 3 ? 'active' : ''}`}
                    onClick={() => handleClick(3)}
                    >
                        Select
                    </button>

                </div>   

            </div>
            
            <a href = "/RPSgame" className = "generalbutton">
                Continue to Game
            </a>
        </div>
    );
}

export default LevelSelectionscreen;