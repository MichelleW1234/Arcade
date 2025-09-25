import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef} from "react";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut.js";
import { useExitPoints } from "../../hooks/useExitPoints.js";
import { storage } from "../../storage.js";

import InnerGameScreen from "./CHCGameComponents/InnerGamescreen.jsx";

import {trafficIncoming, newStreetCars, checkHit} from "../Helpers/helpers.js";

import {playSound, retrieveActiveGame, claimPoints, achievementsUpdate} from "../../Helpers/helpers.js";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useAchievements } from '../../Providers/AchievementsProvider.jsx';

import "./Gamescreen.css";

function Gamescreen(){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { setAchievements} = useAchievements();

    const [position, setPosition] = useState(5);
    const [streets, setStreets] = useState([[0, newStreetCars()], [2, newStreetCars()]]);
    const [stepsTaken, setStepsTaken] = useState(0);
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

        moveForwardRef.current = true;

        const newStepsTaken = stepsTaken + 1;
        setStepsTaken(newStepsTaken);
        if (newStepsTaken >= 100){

            setStepsLimitReached(true);

        }

        checkHit(positionRef.current, streetsRef.current, setCarCrash);

    }

    const movingLeft = () => {

        if (positionRef.current > 0){

            setPosition(prev => prev - 1);

        }

        checkHit(positionRef.current, streetsRef.current, setCarCrash);

    }

    const movingRight = () => {

        if (positionRef.current < 9){

            setPosition(prev => prev + 1);

        }

        checkHit(positionRef.current, streetsRef.current, setCarCrash);

    }

    const exitGame = () => {
        
        playSound(4);

        setPlayer(prev => [prev[0] - ActiveGame[1]]);
        setActiveGame(retrieveActiveGame(0));

    }

    const result = () => {
            
        //if statement goes here
        achievementsUpdate(setAchievements, 8);

        claimPoints(ActiveGame, Player, setPlayer, Math.floor(0));
    
    }
    


    return (

        <div>             
            
            <Link to="/selection" className = "generalbutton QuitGame" onClick={() => exitGame()}> 
                <div className="buttonNameContainer"> Quit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

            <div className = "gameScreenLayout">
                <div className = "OuterGameContainer">

                    {gameOver === false ? (

                        <>
                            <h1 className="sign"> <span className='signGlitch'> Timer: {timer} | Distance Traveled: {stepsTaken}</span></h1>

                            <InnerGameScreen
                                streets = {streets}
                                position = {position}
                                carCrash = {carCrash}
                            />

                            <div className = "ButtonContainer">
                                <button className = "ControlButton Left" onClick = {() => movingLeft()}> [A] </button>
                                <button className = "ControlButton Forward" onClick = {() => movingForward()}> [W] </button>
                                <button className = "ControlButton Right" onClick = {() => movingRight()}> [D] </button>
                            </div>
                        </>


                    ) : (

                        <>

                            <h1 className="sign"> <span className='signGlitch'> Game Over. </span></h1>

                            <div className = "EndingScreen">
                                <p> Game Over.</p>
                            </div>

                            <Link to="/CHCsummary" className = "DoneButton ViewResults" onClick = {() => result()}> 
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