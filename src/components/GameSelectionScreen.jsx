import React, { useEffect, useState } from 'react';

import { usePlayer} from '../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../Providers/ActiveGameProvider.jsx';
import {retrieveActiveGame} from "../Helpers/helpers.js";


import "./GameSelectionScreen.css";

function GameSelecionScreen (){

    const { ActiveGame, setActiveGame } = useActiveGame(); 
    const { Player, setPlayer } = usePlayer();

    const [activeButton, setActiveButton] = useState(1);
    const [currGamePath, setCurrGamePath] = useState(ActiveGame[0]);


    const handleClick = (index) => {
    
        setActiveButton(index);

        const currGameInfo = retrieveActiveGame(index);
        setActiveGame(currGameInfo);

    };

    useEffect(() => {
        setCurrGamePath(ActiveGame[0]); 
    }, [ActiveGame]); 


    const resetPoints = () => {

        setPlayer([0,0]);
        setActiveGame(retrieveActiveGame(1));

    }
    

    return (
        <div>

            <a href ="/arcadeStart">
                <button className = "generalbutton" onClick ={() => resetPoints()}> Leave Arcade </button>
            </a>

            <div className = "screenLayout">
                
                <h1 className = "headerwords"> Choose a game: </h1>

                <div className = "ArcadeGameBoard">

                    <div className = "ArcadeGameContainer">

                        <div className = "ArcadeGame"> 
                            
                            <h2> Rock-Paper-Scissors</h2>
                            
                        </div>

                        <button
                        className={`gameButton ${activeButton === 1 ? 'active' : ''}`}
                        onClick={() => handleClick(1)}
                        >
                            Select
                        </button>
                        
                    </div>

                    <div className = "ArcadeGameContainer">

                        <div className = "ArcadeGame"> 
                            
                            <h2> Tic-Tac-Toe </h2>
                            
                        </div>

                        <button
                        className={`gameButton ${activeButton === 2 ? 'active' : ''}`}
                        onClick={() => handleClick(2)}
                        >
                            Select
                        </button>
                        
                    </div>

                    <div className = "ArcadeGameContainer">

                        <div className = "ArcadeGame"> 
                            
                            <h2> Coming soon... </h2>
                            
                        </div>

                        <button
                        className={`gameButton ${activeButton === 3 ? 'active' : ''}`}
                        onClick={() => handleClick(3)}
                        >
                            Select
                        </button>

                    </div>

                </div>

                {Player[0] >= ActiveGame[1] ? (

                    <a href={currGamePath}>
                        <button className = "generalbutton"> Go to game </button>
                    </a>

                ) : (

                    <p className = "largefont"> You don't have enough points to play this game.</p>

                )}

            </div>
        </div>
        
    );

}


export default GameSelecionScreen;