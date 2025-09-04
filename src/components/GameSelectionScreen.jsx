import { useNavigate, Link } from 'react-router-dom';
import {useRef, useEffect, useState} from 'react';
import useKeyboardShortcut from "../hooks/useKeyboardShortcut.js";

import { usePlayer} from '../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../Providers/ActiveGameProvider.jsx';

import {playSound, retrieveActiveGame} from "../Helpers/helpers.js";

import PrizeInventory from './GameSelectionComponents/PrizeInventory.jsx';
import NavBar from './GameSelectionComponents/NavBar.jsx';
import Achievements from './GameSelectionComponents/Achievements.jsx';

import RPS from "../Images/ArcadeGameImages/RPS.svg";
import TTT from "../Images/ArcadeGameImages/TTT.svg";
import SNK from "../Images/ArcadeGameImages/SNK.svg";
import SPI from "../Images/ArcadeGameImages/SPI.svg";
import ORB from "../Images/ArcadeGameImages/ORB.svg";
import CBL from "../Images/ArcadeGameImages/CBL.svg";
import BFR from "../Images/ArcadeGameImages/BFR.svg";
import SMZ from "../Images/ArcadeGameImages/SMZ.svg";

import "./GameSelectionscreen.css";


function GameSelectionscreen (){

    const { ActiveGame, setActiveGame } = useActiveGame(); 
    const { Player } = usePlayer(); 

    const [activeButton, setActiveButton] = useState(0);
    const [currGamePath, setCurrGamePath] = useState(ActiveGame[0]);

    const [showInventory, setShowInventory] = useState(false);
    const [showAchievements, setShowAchievements] = useState(false);

    const totalButtons = 8;
    const itemRefs = useRef([]);

    useKeyboardShortcut("ArrowLeft", (event) => {
        event.preventDefault();

        if (showInventory === false && showAchievements === false) {
            setActiveButton(prev => (prev - 1 + totalButtons) % totalButtons);
            playSound(3);
        }
    });

    useKeyboardShortcut("ArrowRight", (event) => {
        event.preventDefault();

        if (showInventory === false && showAchievements === false){
            setActiveButton(prev => (prev + 1) % totalButtons);
            playSound(3);
        }
    });

    useEffect(() => {
        const currGameInfo = retrieveActiveGame(activeButton);
        setActiveGame(currGameInfo);

        // scroll the new element into view
        itemRefs.current[activeButton]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });
    }, [activeButton]);


    const navigate = useNavigate();
    useKeyboardShortcut("Enter", (event) => {

        event.preventDefault();
        event.stopPropagation();

        if (showInventory === false && showAchievements === false){
            if (Player[0] >= ActiveGame[1]){

                playSound(2);
                navigate(currGamePath);

            }
        }
    },
        ".GotoGame"
    );




    const handleClick = (index) => {
    
        playSound(3);
        setActiveButton(index);

        const currGameInfo = retrieveActiveGame(index);
        setActiveGame(currGameInfo);

    };


    useEffect(() => {
        setCurrGamePath(ActiveGame[0]); 
    }, [ActiveGame]); 

    return (
        <div>

            {showInventory && 
            <PrizeInventory
                setShowInventory = {setShowInventory}
            />}

            {showAchievements && 
            <Achievements
                setShowAchievements = {setShowAchievements}
            />}

            <NavBar
                showInventory = {showInventory}
                setShowInventory = {setShowInventory}
                showAchievements = {showAchievements}
                setShowAchievements = {setShowAchievements}
            />

            <div className = "gameScreenLayout">

                <h1 className = "instructionsSign"> Your Points: <span className = "signGlitch">{Player[0]}</span></h1>
            
                <div className = "ArcadeGameBoard">
                    
                    <p className='largefont'>[&larr;] [&rarr;]</p>

                    <div className = "ArcadeGameBoardInner">

                        <div className = "ArcadeGameContainer" 
                            ref={(el) => (itemRefs.current[0] = el)}>

                            <div className = "ArcadeGame"> 
                                
                                <p>Rock-Paper-Scissors</p>
                                <img className = "ArcadeGameImage" src = {RPS}/>
                                <p><span className = "windowGlitch">(20 Points)</span></p>
                                
                            </div>

                            <button
                            className={`gameButton ${activeButton === 0 ? 'active' : ''}`}
                            onClick={() => handleClick(0)}
                            >
                                Select

                            </button>
                            
                        </div>

                        <div className = "ArcadeGameContainer"
                            ref={(el) => (itemRefs.current[1] = el)}>

                            <div className = "ArcadeGame"> 
                                
                                <p>Tic-Tac-Toe</p>
                                <img className = "ArcadeGameImage" src = {TTT}/>
                                <p>(10 Points)</p>
                                
                            </div>

                            <button
                            className={`gameButton ${activeButton === 1 ? 'active' : ''}`}
                            onClick={() => handleClick(1)}
                            >
                                Select
                            </button>
                            
                        </div>

                        <div className = "ArcadeGameContainer"
                            ref={(el) => (itemRefs.current[2] = el)}>

                            <div className = "ArcadeGame"> 
                                
                                <p>Snake</p>
                                <img className = "ArcadeGameImage" src = {SNK}/>
                                <p>(5 Points)</p>
                                
                            </div>

                            <button
                            className={`gameButton ${activeButton === 2 ? 'active' : ''}`}
                            onClick={() => handleClick(2)}
                            >
                                Select
                            </button>

                        </div>

                        <div className = "ArcadeGameContainer"
                            ref={(el) => (itemRefs.current[3] = el)}>

                            <div className = "ArcadeGame"> 
                                
                                <p>Space Invasion </p>
                                <img className = "ArcadeGameImage" src = {SPI}/>
                                <p>(15 Points)</p>
                                
                            </div>

                            <button
                            className={`gameButton ${activeButton === 3 ? 'active' : ''}`}
                            onClick={() => handleClick(3)}
                            >
                                Select
                            </button>

                        </div>

                        <div className = "ArcadeGameContainer"
                            ref={(el) => (itemRefs.current[4] = el)}>

                            <div className = "ArcadeGame"> 
                                
                                <p>Orbit</p>
                                <img className = "ArcadeGameImage" src = {ORB}/>
                                <p>(5 Points)</p>
                                
                            </div>

                            <button
                            className={`gameButton ${activeButton === 4 ? 'active' : ''}`}
                            onClick={() => handleClick(4)}
                            >
                                Select
                            </button>

                        </div>

                        <div className = "ArcadeGameContainer"
                             ref={(el) => (itemRefs.current[5] = el)}>

                            <div className = "ArcadeGame"> 
                                
                                <p>Color Blast</p>
                                <img className = "ArcadeGameImage" src = {CBL}/>
                                <p>(10 Points)</p>
                                
                            </div>

                            
                            <button
                            className={`gameButton ${activeButton === 5 ? 'active' : ''}`}
                            onClick={() => handleClick(5)}
                            >
                                Select
                            </button>

                        </div>

                        <div className = "ArcadeGameContainer"
                             ref={(el) => (itemRefs.current[6] = el)}>

                            <div className = "ArcadeGame"> 
                                
                                <p>Balloon Frenzy</p>
                                <img className = "ArcadeGameImage" src = {BFR}/>
                                <p>(10 Points)</p>
                                
                            </div>

                            
                            <button
                            className={`gameButton ${activeButton === 6 ? 'active' : ''}`}
                            onClick={() => handleClick(6)}
                            >
                                Select
                            </button>

                        </div>

                        <div className = "ArcadeGameContainer"
                             ref={(el) => (itemRefs.current[7] = el)}>

                            <div className = "ArcadeGame"> 
                                
                                <p>Sky Maze</p>
                                <img className = "ArcadeGameImage" src = {SMZ}/>
                                <p>(15 Points)</p>
                            
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

                    <Link to={currGamePath} className = "generalbuttonGlitch GotoGame" onClick = {() => playSound(2)}>
                        <div className="buttonNameContainer">  Go to Game <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                    </Link>
    
                ) : (

                    <p className = "largefont"> You don't have enough points to play this game.</p>

                )}

            </div>
        </div>
        
    );

}


export default GameSelectionscreen;

