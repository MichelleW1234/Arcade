import React, { useState} from "react";
import { Link } from 'react-router-dom';


import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useRPSUser} from '../Providers/RPSUserProvider.jsx';

import { resetLevel, getInput, getReferences } from "../Helpers/helpers.js";
import {playSound, retrieveActiveGame, pointsDistribution} from "../../Helpers/helpers.js";

import "./LevelSelectionscreen.css";

function LevelSelectionscreen (){

    const [activeButton, setActiveButton] = useState(1);

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { RPSUser, setRPSUser} = useRPSUser();
    const {Player, setPlayer} = usePlayer();

    const handleClick = (index) => {

        playSound(3);
        setActiveButton(index);

        const currLevelInput = getInput(index);
        const currLevelReferences = getReferences(index);
        setRPSUser([index, currLevelInput, currLevelReferences, 0, 0])

    };

    const exitGame = () => {

        playSound(4);
        resetLevel(setRPSUser);
        pointsDistribution(ActiveGame, 0, setPlayer);
        setActiveGame(retrieveActiveGame(1));

    }

    return (

        <div>

            <Link to= "/selection" className = "generalbutton" onClick ={() => exitGame()}>
                Quit Game
            </Link>

            <div className = "gameScreenLayout">

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

        </div>
        
    );
}

export default LevelSelectionscreen;