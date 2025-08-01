import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { usePlayer} from '../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../Providers/ActiveGameProvider.jsx';
import { usePrize } from '../Providers/PrizeProvider.jsx';
import {playSound, retrieveActiveGame} from "../Helpers/helpers.js";

import PrizeInventory from './GameSelectionComponents/PrizeInventory.jsx';

import Bear from '../Images/ArcadePrizeImages/Bear.svg';
import Bee from '../Images/ArcadePrizeImages/Bee.svg';
import Heart from '../Images/ArcadePrizeImages/Valentine.svg';
import GameBoy from '../Images/ArcadePrizeImages/GameBoy.svg';
import Robot from '../Images/ArcadePrizeImages/Robot.svg';
import Alien from '../Images/ArcadePrizeImages/Alien.svg';
import Spider from '../Images/ArcadePrizeImages/Spider.svg';
import Whale from "../Images/ArcadePrizeImages/Whale.svg";
import Carrot from "../Images/ArcadePrizeImages/Carrot.svg";
import Hippo from "../Images/ArcadePrizeImages/Hippo.svg";
import Cow from "../Images/ArcadePrizeImages/Cow.svg";

import BlackCat from "../Images/ArcadePrizeImages/BlackCat.svg";
import OrangeCat from "../Images/ArcadePrizeImages/OrangeCat.svg";
import SiameseCat from "../Images/ArcadePrizeImages/SiameseCat.svg";
import BritishShorthairCat from "../Images/ArcadePrizeImages/BritishShorthairCat.svg";

import Basketball from "../Images/ArcadePrizeImages/Basketball.svg";
import Soccerball from "../Images/ArcadePrizeImages/Soccerball.svg";
import Paddle from "../Images/ArcadePrizeImages/Paddle.svg";
import Football from "../Images/ArcadePrizeImages/Football.svg";

import Earth from "../Images/ArcadePrizeImages/Earth.svg";
import Sun from "../Images/ArcadePrizeImages/Sun.svg";
import Saturn from "../Images/ArcadePrizeImages/Saturn.svg";
import Andromeda from "../Images/ArcadePrizeImages/Andromeda.svg";

import RPS from "../Images/ArcadeGameImages/RPS.svg";
import TTT from "../Images/ArcadeGameImages/TTT.svg";
import SNK from "../Images/ArcadeGameImages/SNK.svg";
import SPI from "../Images/ArcadeGameImages/SPI.svg";
import ORB from "../Images/ArcadeGameImages/ORB.svg";
import CBL from "../Images/ArcadeGameImages/CBL.svg";
import BFR from "../Images/ArcadeGameImages/BFR.svg";

import "./GameSelectionscreen.css";


function GameSelectionscreen (){

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

        playSound(24);
        setPlayer([0]);
        setActiveGame(retrieveActiveGame(1));
        setPrize([["Bear", 80, Bear], ["BumbleBee", 50, Bee], ["Valentine", 20, Heart], 
                    ["GameBoy", 100, GameBoy], ["Robot", 30, Robot], ["Alien", 20, Alien], 
                    ["Spider", 80, Spider], ["Carrot", 40, Carrot], ["Whale", 70, Whale],
                    ["Black Cat", 0, BlackCat], ["Orange Cat", 0, OrangeCat], ["Siamese Cat", 0, SiameseCat],
                    ["British Shorthair Cat", 0, BritishShorthairCat], ["Football", 0, Football], ["Ping Pong Paddle", 0, Paddle], 
                    ["Soccerball", 0, Soccerball], ["Basketball", 0, Basketball], ["Andromeda Galaxy", 0, Andromeda], ["Sun", 0, Sun], 
                    ["Saturn", 0, Saturn], ["Earth", 0, Earth], ["Cow", 40, Cow], ["Hippo", 40, Hippo]]);

    }

    const displayInventory = () => {

        playSound(25);
        setShowInventory(prevState => !prevState);

    }

    const goToClawArcade = () => {

        playSound(1);
        const currGameInfo = retrieveActiveGame(0);
        setActiveGame(currGameInfo);

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
                        <Link to="/prizeRoom" className = "navBarButton" onClick ={() =>  playSound(24)}>
                            Visit Prize Room
                        </Link>
                    </li>

                    <li>
                        <div className = "navBarButton" onClick ={() => displayInventory()}>
                            View Prize Inventory
                        </div>
                    </li>

                    <li>
                        <Link to="/CWMstart" className = "navBarButton" onClick ={() => goToClawArcade()}>
                            Go to Claw Arcade
                        </Link>
                    </li>

                </ul>
            </div>

            {showInventory && 
            <PrizeInventory
                setShowInventory = {setShowInventory}
            />}

            <div className = "gameScreenLayout">

                <h1 className = "pointsSign"> Your Points: <span className = "signGlitch">{Player[0]}</span></h1>
            
                <div className = "ArcadeGameBoard">

                    <div className = "ArcadeGameBoardInner">

                        <div className = "ArcadeGameContainer">

                            <div className = "ArcadeGame"> 
                                
                                <p>Rock-Paper-Scissors</p>
                                <img className = "ArcadeGameImage" src = {RPS}/>
                                <p><span className = "windowGlitch">(20 Points)</span></p>
                                
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
                                
                                <p>Tic-Tac-Toe</p>
                                <img className = "ArcadeGameImage" src = {TTT}/>
                                <p>(10 Points)</p>
                                
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
                                
                                <p>Snake</p>
                                <img className = "ArcadeGameImage" src = {SNK}/>
                                <p>(5 Points)</p>
                                
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
                                
                                <p>Space Invasion </p>
                                <img className = "ArcadeGameImage" src = {SPI}/>
                                <p>(15 Points)</p>
                                
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
                                
                                <p>Orbit</p>
                                <img className = "ArcadeGameImage" src = {ORB}/>
                                <p>(5 Points)</p>
                                
                            </div>

                            <button
                            className={`gameButton ${activeButton === 5 ? 'active' : ''}`}
                            onClick={() => handleClick(5)}
                            >
                                Select
                            </button>

                        </div>

                        <div className = "ArcadeGameContainer">

                            <div className = "ArcadeGame"> 
                                
                                <p>Color Blast</p>
                                <img className = "ArcadeGameImage" src = {CBL}/>
                                <p>(10 Points)</p>
                                
                            </div>

                            
                            <button
                            className={`gameButton ${activeButton === 6 ? 'active' : ''}`}
                            onClick={() => handleClick(6)}
                            >
                                Select
                            </button>

                        </div>

                        <div className = "ArcadeGameContainer">

                            <div className = "ArcadeGame"> 
                                
                                <p>Balloon Frenzy</p>
                                <img className = "ArcadeGameImage" src = {BFR}/>
                                <p>(10 Points)</p>
                                
                            </div>

                            
                            <button
                            className={`gameButton ${activeButton === 7 ? 'active' : ''}`}
                            onClick={() => handleClick(7)}
                            >
                                Select
                            </button>

                        </div>


                    </div>

                </div>

                {Player[0] >= ActiveGame[1] ? (

                    <Link to={currGamePath} className = "generalbuttonGlitch" onClick = {() => playSound(2)}>
                        Go to Game
                    </Link>
    
                ) : (

                    <p className = "largefont"> You don't have enough points to play this game.</p>

                )}

            </div>
        </div>
        
    );

}


export default GameSelectionscreen;

