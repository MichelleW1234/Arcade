
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { usePlayer} from '../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../Providers/ActiveGameProvider.jsx';
import {retrieveActiveGame} from "../Helpers/helpers.js";

import "./GameSelectionScreen.css";


function GameSelectionScreen (){

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
        console.log(currGamePath);
    }, [ActiveGame]); 


    const resetPoints = () => {

        setPlayer([0,0]);
        setActiveGame(retrieveActiveGame(1));

    }
    

    return (
        <div>

            <Link to="/arcadeStart" className = "generalbutton" onClick ={() => resetPoints()}>
                Leave Arcade
            </Link>

            <div className = "gameScreenLayout">

                <h1 className = "pointsSign"> Your Points: <span className = "pointsSignGlitch">{Player[0]}</span></h1>
                
                <h1 className = "headerwords"> Choose a game: </h1>

                <div className = "ArcadeGameBoard">

                    <div className = "ArcadeGameContainer">

                        <div className = "ArcadeGame"> 
                            
                            <h2> Rock-Paper-Scissors</h2>
                            <h2><span className = "windowGlitch">(20 Points)</span></h2>
                            
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
                            <h2>(10 Points)</h2>
                            
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
                            
                            <h2> Snake </h2>
                            <h2> (5 Points) </h2>
                            
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

                    <Link to={currGamePath} className = "generalbuttonGlitch">
                        Go to game
                    </Link>
    
                ) : (

                    <p className = "largefont"> You don't have enough points to play this game.</p>

                )}

            </div>
        </div>
        
    );

}


export default GameSelectionScreen;
