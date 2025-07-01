import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { usePlayer} from '../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../Providers/ActiveGameProvider.jsx';
import { usePrize } from '../Providers/PrizeProvider.jsx';
import {playSound, retrieveActiveGame} from "../Helpers/helpers.js";

import PrizeInventory from './GameSelectionComponents/PrizeInventory.jsx';

import Bear from '../Images/image 1.svg';
import Bee from '../Images/image 2.svg';
import Heart from '../Images/image 3.svg';
import GameBoy from '../Images/image 4.svg';
import Robot from '../Images/image 5.svg';
import Alien from '../Images/image 6.svg';
import Spider from '../Images/image 7.svg';
import Whale from "../Images/image 19.svg";
import Carrot from "../Images/image 20.svg";

import "./GameSelectionScreen.css";


function GameSelectionScreen (){

    const { ActiveGame, setActiveGame } = useActiveGame(); 
    const { Player, setPlayer } = usePlayer(); 
    const { Prize, setPrize } = usePrize();


    const [activeButton, setActiveButton] = useState(1);
    const [currGamePath, setCurrGamePath] = useState(ActiveGame[0]);

    const [showInventory, setShowInventory] = useState(false);


    const handleClick = (index) => {
    
        playSound(3);
        setActiveButton(index);

        const currGameInfo = retrieveActiveGame(index);
        setActiveGame(currGameInfo);

    };

    useEffect(() => {
        setCurrGamePath(ActiveGame[0]); 
    }, [ActiveGame]); 


    const resetPoints = () => {

        playSound(4);
        setPlayer([0,0]);
        setActiveGame(retrieveActiveGame(1));
        setPrize([["Bear", 80, Bear], ["BumbleBee", 50, Bee], ["Valentine", 20, Heart], 
                    ["GameBoy", 100, GameBoy], ["Robot", 30, Robot], ["Alien", 20, Alien], 
                    ["Spider", 80, Spider], ["Carrot", 40, Carrot], ["Whale", 50, Whale]]);

    }

    const displayInventory = () => {

        playSound(3);
        setShowInventory(prevState => !prevState);

    }
    

    return (
        <div>

            <div className = "navbarContainer">
                <ul className = "navbarMenu">
                    
                    <li>
                        <Link to="/arcadeStart" className = "navBarButton" onClick ={() => resetPoints()}>
                            Leave Arcade
                        </Link>
                    </li>

                    <li>
                        <Link to="/prizeRoom" className = "navBarButton" onClick ={() =>  playSound(1)}>
                            Go to Prize Room
                        </Link>
                    </li>

                    <li>
                        <div className = "navBarButton" onClick ={displayInventory}>
                            View Prize Inventory
                        </div>
                    </li>

                </ul>
            </div>

            {showInventory && 
                (<PrizeInventory
                    Prize = {Prize}
            />)}

            <div className = "ArcadeGameScreenLayout">

                <h1 className = "pointsSign"> Your Points: <span className = "pointsSignGlitch">{Player[0]}</span></h1>
            
                <div className = "ArcadeGameBoard">

                    <div className = "ArcadeGameBoardInner">

                        <div className = "ArcadeGameContainer">

                            <div className = "ArcadeGame"> 
                                
                                Rock-Paper-Scissors
                                <span className = "windowGlitch">(20 Points)</span>
                                
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
                                
                                Tic-Tac-Toe <br/><br/>
                                (10 Points)
                                
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
                                
                                Snake <br/> <br/>
                                (5 Points)
                                
                            </div>

                            <button
                            className={`gameButton ${activeButton === 3 ? 'active' : ''}`}
                            onClick={() => handleClick(3)}
                            >
                                Select
                            </button>

                        </div>

                        <div className = "ArcadeGameContainer">

                            <div className = "ArcadeGame"> 
                                
                                Space Invasion <br/> <br/>
                                (15 Points)
                                
                            </div>

                            <button
                            className={`gameButton ${activeButton === 4 ? 'active' : ''}`}
                            onClick={() => handleClick(4)}
                            >
                                Select
                            </button>

                        </div>

                        <div className = "ArcadeGameContainer">

                            <div className = "ArcadeGame"> 
                                
                                Orbit <br/> <br/>
                                (10 Points)
                                
                            </div>

                            <button
                            className={`gameButton ${activeButton === 5 ? 'active' : ''}`}
                            onClick={() => handleClick(5)}
                            >
                                Select
                            </button>

                        </div>
                        

                    </div>

                </div>

                {Player[0] >= ActiveGame[1] ? (

                    <Link to={currGamePath} className = "generalbuttonGlitch" onClick = {() => {playSound(2)}}>
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

