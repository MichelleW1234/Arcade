import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef} from "react";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import { useExitPoints } from "../../hooks/useExitPoints";
import { storage } from "../../storage";

import InnerGameScreen from "./SMZComponents/InnerGamescreen.jsx";

import {birdFlyingForward, wallHeight, checkHit} from "../Helpers/helpers.js";

import {playSound, retrieveActiveGame, claimPoints, achievementsUpdate} from "../../Helpers/helpers.js";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useSMZUser} from '../Providers/SMZUserProvider.jsx';
import { useAchievements } from '../../Providers/AchievementsProvider.jsx';

import "./Gamescreen.css";

function Gamescreen(){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { SMZUser, setSMZUser} = useSMZUser();
    const { Achievements, setAchievements} = useAchievements();

    const [wallPositions, setWallPositions] = useState([wallHeight(16)]);
    const [birdPosition, setBirdPosition] = useState([5,5]);
    const [distance, setDistance] = useState(0);
    const [fullDistanceTraveled, setFullDistanceTraveled] = useState(false);
    const [wallHit, setWallHit] = useState(false);

    const [startButtonClicked, setStartButtonClicked] = useState(false);
    const [gameOver, setGameOver] = useState(false);


    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        exitGame();
        navigate("/selection");
    },
        ".QuitGame"
    );

    useKeyboardShortcut("Enter", () => {
        if (gameOver == true){
            result();
            navigate("/SMZsummary");
        }
    },
        ".ViewResults"
    );

    useKeyboardShortcut("ArrowUp", (event) => {

        if (gameOver == false){
            event.preventDefault();

            birdFlyingUpwards();
        }
    
    },
        ".Up"
    );

    useKeyboardShortcut("ArrowDown", (event) => {

        if (gameOver == false){
            event.preventDefault();

            birdFlyingDownwards();
        }
    },
        ".Down"
    );



    useExitPoints(() => {
        const adjustedPoints = [Player[0] - ActiveGame[1]];
        storage.set("Player", adjustedPoints);
        setPlayer(adjustedPoints);
    });



    const wallPositionsRef = useRef(wallPositions);
    useEffect(() => {
        wallPositionsRef.current = wallPositions;
    }, [wallPositions]);

    const birdPositionRef = useRef(birdPosition);
    useEffect(() => {
        birdPositionRef.current = birdPosition;
    }, [birdPosition]);
    
    useEffect(() => {

        if (startButtonClicked == false || gameOver == true){

            return;

        }

        const interval = setInterval(() => {

            birdFlyingForward(wallPositionsRef.current, setWallPositions);

        }, 85);

        return () => clearInterval(interval);

    }, [gameOver, startButtonClicked]);


    useEffect(() => {

        if (startButtonClicked == false || gameOver == true){

            return;

        }

        const interval = setInterval(() => {

            let newDistance;

            setDistance(prev => {
                newDistance = prev + 1;
                return newDistance;
            });

            if (newDistance > 1000) {
                setFullDistanceTraveled(true);
            }

        }, 100);

        return () => clearInterval(interval);

    }, [gameOver, startButtonClicked]);

    useEffect(() => {

        if (startButtonClicked == false || gameOver == true){

            return;

        }

        const interval = setInterval(() => {

            checkHit(setWallHit, birdPositionRef.current, wallPositionsRef.current);

        }, 50);

        return () => clearInterval(interval);

    }, [gameOver, startButtonClicked]);


    useEffect(() => {

        if (wallHit == true || fullDistanceTraveled == true) {

            playSound(6);
            setGameOver(true);
            setSMZUser([distance]);

        }

    }, [wallHit, fullDistanceTraveled]);


    const birdFlyingUpwards = () => {

        if (startButtonClicked == false){

            setStartButtonClicked(true);
            playSound(3);

        } else {

            if (birdPosition[0] > 0){

                playSound(3);
                setBirdPosition(prev => [prev[0] - 1, prev[1]]);

            } else {

                playSound(5);

            }

        }

    }



    const birdFlyingDownwards = () => {

        if (startButtonClicked == false){

            setStartButtonClicked(true);
            playSound(3);

        } else {

            if (birdPosition[0] < 9){

                playSound(3);
                setBirdPosition(prev => [prev[0] + 1, prev[1]]);

            } else {

                playSound(5);

            }

        }

    }


    const exitGame = () => {
        
        playSound(4);

        setSMZUser([0]);
        setPlayer([Player[0] - ActiveGame[1]]);
        setActiveGame(retrieveActiveGame(0));

    }

    const result = () => {
            
        if (distance >= 500){
    
            achievementsUpdate(setAchievements, 8);
    
        }

        claimPoints(ActiveGame, Player, setPlayer, Math.floor(distance / 5));
    
    }
    


    return (

        <div>             
            
            <Link to="/selection" className = "generalbutton QuitGame" onClick={() => exitGame()}> 
                <div className="buttonNameContainer"> Quit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

            <div className = "gameScreenLayout">
                <div className = "SMZOuterGameContainer">

                    {gameOver === false ? (

                        <>
                            <h1 className="SMZsign"> <span className='signGlitch'> Distance Traveled: {distance} meters</span></h1>

                            <InnerGameScreen
                            wallPositions={wallPositions}
                            birdPosition = {birdPosition}
                            startButtonClicked = {startButtonClicked}
                            />

                            <div className = "SMZButtonContainer">
                                <button className = "SMZControlButton Up" onClick = {() => birdFlyingUpwards()}> [&uarr;] </button>
                                <button className = "SMZControlButton Down" onClick = {() => birdFlyingDownwards()}> [&darr;] </button>
                            </div>
                        </>


                    ) : (

                        <>

                            <h1 className="SMZsign"> <span className='signGlitch'> Game Over. </span></h1>

                            <div className = "SMZEndingScreen">
                                <p> Game Over.</p>
                            </div>

                            <Link to="/SMZsummary" className = "SMZDoneButton ViewResults" onClick = {() => result()}> 
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