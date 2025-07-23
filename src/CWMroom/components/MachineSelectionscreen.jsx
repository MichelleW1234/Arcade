import { Link } from 'react-router-dom';
import React, {useState} from 'react';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../Providers/PlayerProvider.jsx';

import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

import CatMachine from "../../Images/image 27.svg";
import SportsMachine from "../../Images/image 28.svg";
import SpaceMachine from "../../Images/image 29.svg";

import "./MachineSelectionscreen.css";

function MachineSelectionscreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer } = usePlayer(); 

    const [activeButton, setActiveButton] = useState(1);
    const [currGamePath, setCurrGamePath] = useState("/CWMcatinstructions");

    const exit = () => {

        playSound(24);
        setActiveGame(retrieveActiveGame(1));

    }

    const handleClick = (index) => {
    
        playSound(3);
        setActiveButton(index);

        if (index == 1){

            setCurrGamePath("/CWMcatinstructions");

        } else if (index == 2){

            setCurrGamePath("/CWMsportsinstructions");

        } else if (index == 3){

            setCurrGamePath("/CWMspaceinstructions");

        }

    };

    return (

        <div>
            <Link to="/selection" className = "generalbutton" onClick={() => exit()}>
                Leave Claw Arcade
            </Link>
            <div className = "gameScreenLayout">

                <h1 className = "pointsSign"> Your Points: <span className = "pointsSignGlitch">{Player[0]}</span></h1>

                <div className = "CWMGameSelectionBoard">

                    <div className = "CWMGameSelectionBoardInner">

                        <div className = "CWMMachineOptionContainer">

                            <div className = "CWMMachine"> 
                                
                                Cats
                                <img className= "CWMMachineImages" src = {CatMachine}/>
                                
                            </div>

                            <button
                            className={`CWMMachineButton ${activeButton === 1 ? 'active' : ''}`}
                            onClick={() => handleClick(1)}
                            >
                                Select
                            </button>

                        </div>

                        <div className = "CWMMachineOptionContainer">

                            <div className = "CWMMachine"> 
                                
                                Sports
                                <img className = "CWMMachineImages" src={SportsMachine}/>
                                
                            </div>

                            <button
                            className={`CWMMachineButton ${activeButton === 2 ? 'active' : ''}`}
                            onClick={() => handleClick(2)}
                            >
                                Select
                            </button>
                            
                        </div>

                        <div className = "CWMMachineOptionContainer">

                            <div className = "CWMMachine"> 
                                
                                Space
                                <img className= "CWMMachineImages" src = {SpaceMachine}/>
                               
                            </div>

                            <button
                            className={`CWMMachineButton ${activeButton === 3 ? 'active' : ''}`}
                            onClick={() => handleClick(3)}
                            >
                                Select
                            </button>
                            
                        </div>

                    </div>

                </div>

                {Player[0] >= ActiveGame[1] ? (
                
                    <Link to={currGamePath} className = "generalbuttonGlitch" onClick = {() => playSound(19)}>
                        Go to game
                    </Link>

                ) : (

                    <p className = "largefont"> You don't have enough points to use this machine.</p>

                )}
                
            </div>
        </div>

    );

}


export default MachineSelectionscreen;