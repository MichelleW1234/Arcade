import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef} from "react";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut.js";
import { useExitPoints } from "../../hooks/useExitPoints.js";
import { storage } from "../../storage.js";

import InnerGameScreen from "./CHCGameComponents/InnerGamescreen.jsx";

import {trafficIncoming, newStreetCars, checkHit} from "../Helpers/helpers.js";

import {playSound, retrieveActiveGame, claimPoints, achievementsUpdate} from "../../Helpers/helpers.js";

import { useCHCUser } from '../Providers/CHCUserProvider.jsx';
import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useAchievements } from '../../Providers/AchievementsProvider.jsx';

import "./Gamescreen.css";

function Gamescreen(){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { setAchievements} = useAchievements();
    const { CHCUser, setCHCUser } = useCHCUser();

    const [position, setPosition] = useState(5);
    const [streets, setStreets] = useState([[0, newStreetCars()], [2, newStreetCars()]]);
    const [timer, setTimer] = useState(0);
    const [carCrash, setCarCrash] = useState(false);
    const [gameOver, setGameOver] = useState(false);


    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        exitGame();
        navigate("/selection");
    },
        ".QuitGame"
    );

    useKeyboardShortcut("Enter", () => {
        if (gameOver === true){
            result();
            navigate("/CHCsummary");
        }
    },
        ".ViewResults"
    );

    useKeyboardShortcut("a", () => {

        if (gameOver === false){

            movingLeft();

        }
    
    },
        ".Left"
    );

    useKeyboardShortcut("w", () => {

        if (gameOver === false){

            movingForward();

        }
    },
        ".Forward"
    );

    useKeyboardShortcut("d", () => {

        if (gameOver === false){

            movingRight();

        }
    
    },
        ".Right"
    );



    useExitPoints(() => {
        const adjustedPoints = [Player[0] - ActiveGame[1]];
        storage.set("Player", adjustedPoints);
        setPlayer(adjustedPoints);
    });

    const positionRef = useRef(position);
    useEffect(() => {
        positionRef.current = position;
    }, [position]);

    const streetsRef = useRef(streets);
    useEffect(() => {
        streetsRef.current = streets;
    }, [streets]);

    const moveForwardRef = useRef(false);


    
    useEffect(() => {

        if (gameOver === true){

            return;

        }

        const interval = setInterval(() => {

           trafficIncoming(streetsRef.current, setStreets, moveForwardRef);

        }, 160);

        return () => clearInterval(interval);

    }, [gameOver]);

    useEffect(() => {

        if (gameOver === true){

            return;

        }

        const interval = setInterval(() => {

           checkHit(positionRef.current, streetsRef.current, setCarCrash);

        }, 50);

        return () => clearInterval(interval);

    }, [gameOver]);


    useEffect(() => {

        if (gameOver === true){

            return;

        }

        const interval = setInterval(() => {

            setTimer(prev => prev + 1);

        }, 1000);

        return () => clearInterval(interval);

    }, [gameOver]);


    useEffect(() => {

        if (carCrash === true || timer >= 30) {

            playSound(6);
            setGameOver(true);

        }

    }, [carCrash, timer]);




    const movingForward = () => {

        playSound(3);

        moveForwardRef.current = true;
        setCHCUser(prev => [prev[0] + 1]);
        checkHit(positionRef.current, streetsRef.current, setCarCrash);

    }

    const movingLeft = () => {

        playSound(3);

        if (positionRef.current > 0){

            setPosition(prev => prev - 1);

        }

        checkHit(positionRef.current, streetsRef.current, setCarCrash);

    }

    const movingRight = () => {

        playSound(3);

        if (positionRef.current < 9){

            setPosition(prev => prev + 1);

        }

        checkHit(positionRef.current, streetsRef.current, setCarCrash);

    }

    const exitGame = () => {
        
        playSound(4);
        setCHCUser([0]);
        setPlayer(prev => [prev[0] - ActiveGame[1]]);
        setActiveGame(retrieveActiveGame(0));

    }

    const result = () => {
            
        if (CHCUser[0] >= 50){

            achievementsUpdate(setAchievements, 9);

        }

        claimPoints(ActiveGame, Player, setPlayer, CHCUser[0]);
    
    }
    


    return (

        <div>             
            
            <Link to="/selection" className = "generalbutton QuitGame" onClick={() => exitGame()}> 
                <div className="buttonNameContainer"> Quit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

            <div className = "gameScreenLayout">
                <div className = "CHCOuterGameContainer">

                    {gameOver === false ? (

                        <>
                            <h1 className="CHCsign"> <span className='signGlitch'> Timer: {timer} | Distance Traveled: {CHCUser[0]} Steps</span></h1>

                            <InnerGameScreen
                                streets = {streets}
                                position = {position}
                                carCrash = {carCrash}
                            />

                            <div className = "CHCButtonContainer">
                                <button className = "CHCControlButton Left" onClick = {() => movingLeft()}> [A] </button>
                                <button className = "CHCControlButton Forward" onClick = {() => movingForward()}> [W] </button>
                                <button className = "CHCControlButton Right" onClick = {() => movingRight()}> [D] </button>
                            </div>
                        </>


                    ) : (

                        <>

                            <h1 className="CHCsign"> <span className='signGlitch'> Game Over. </span></h1>

                            <div className = "CHCEndingScreen">
                                <p> Game Over.</p>
                            </div>

                            <Link to="/CHCsummary" className = "CHCDoneButton ViewResults" onClick = {() => result()}> 
                                <div className="buttonNameContainer"> View Results <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                            </Link>
                        </>

                    )}

                    
                </div>

            </div>
        </div>

    );

}


export default Gamescreen;