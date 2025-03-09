import React, { useState} from "react";
import { useLevel } from '../Providers/RPSLevelProvider.jsx';
import { useInput } from '../Providers/RPSInputProvider.jsx';
import { useReference } from '../Providers/RPSReferenceProvider.jsx';
import { getInput, getReferences } from "../Helpers/RPShelpers.js";

import "./RPSLevelSelectionscreen.css";

function LevelSelectionscreen (){

    const [activeButton, setActiveButton] = useState(1);
    const { level, setLevel } = useLevel();
    const { input, setInput } = useInput();
    const {reference, setReference} = useReference();

    const handleClick = (index) => {

        setActiveButton(index);
        setLevel(index);

        const currLevelInput = getInput(index);
        setInput(currLevelInput);

        const currLevelReferences = getReferences(index);
        setReference(currLevelReferences);

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
            
            <a href = "/RPSgame">
                <button className = "generalbutton"> Continue to Game </button>
            </a>
        </div>
    );
}

export default LevelSelectionscreen;