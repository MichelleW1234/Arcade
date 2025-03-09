import React, { useEffect, useState } from 'react';
import { useActiveGame } from '../Providers/ActiveGameProvider.jsx';
import {retrieveActiveGame} from "../Helpers/helpers.js";
import "./GameSelectionScreen.css";

function GameSelecionScreen (){

    const [activeButton, setActiveButton] = useState(1);
    const { ActiveGame, setActiveGame } = useActiveGame(); 
    const [currGamePath, setCurrGamePath] = useState(ActiveGame[0]);

    const handleClick = (index) => {
    
        setActiveButton(index);

        const currGameInfo = retrieveActiveGame(index);
        setActiveGame(currGameInfo);

    };

    useEffect(() => {
        setCurrGamePath(ActiveGame[0]); // Set currGamePath to the first element in ActiveGame
    }, [ActiveGame]); // Dependency on ActiveGame
    

    return (
        <div>

            <a href ="/arcadeStart">
                <button className = "generalbutton"> Leave Arcade </button>
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

                <a href={ActiveGame[0]}>
                    <button className = "generalbutton"> Go to game </button>
                </a>

            </div>
        </div>
        
    );

}


export default GameSelecionScreen;