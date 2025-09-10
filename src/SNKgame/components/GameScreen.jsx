import {useNavigate, Link } from 'react-router-dom';
import {useRef, useEffect, useState } from 'react';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import { useExitPoints } from "../../hooks/useExitPoints";
import { storage } from "../../storage";

import InnerGameBoard from "./SNKGameComponents/InnerGameBoard.jsx";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useSNKUser } from '../Providers/SNKUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useAchievements } from '../../Providers/AchievementsProvider.jsx';

import {changeSnakeDirection} from "../Helpers/helpers.js";
import {claimPoints, playSound, retrieveActiveGame, achievementsUpdate} from '../../Helpers/helpers.js';

import "./Gamescreen.css";

function Gamesscreen(){

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { SNKUser, setSNKUser } = useSNKUser();
    const { Player, setPlayer} = usePlayer();
    const { setAchievements} = useAchievements();

    const gameboardHeight = 20;
    const gameboardWidth = 30;

    const [snake, setSnake] = useState([[0, 0]]);
    const [appleLocation, setAppleLocation] = useState([
        Math.floor(Math.random() * gameboardHeight),
        Math.floor(Math.random() * gameboardWidth)
    ]);

    const [startButtonPressed, setStartButtonPressed] = useState(false);


    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        reset();
        navigate("/selection");
    },
        ".QuitGame"
    );

    useKeyboardShortcut("Enter", () => {
        if (startButtonPressed === true){
            if(SNKUser[0] === true || snake.length >= 600){

                result();
                navigate("/SNKsummary");

            }
        }
    },
        ".ViewResults"
    );

    useKeyboardShortcut("ArrowUp", (event) => {
        if (SNKUser[0] === false && snake.length < 600 ){
            event.preventDefault();

            buttonControls(2);
        }
    },
        ".Up"
    );

    useKeyboardShortcut("ArrowDown", (event) => {
        if (SNKUser[0] === false && snake.length < 600 ){
            event.preventDefault();

            buttonControls(3);
        }
    },
        ".Down"
    );

    useKeyboardShortcut("ArrowLeft", (event) => {
        if (SNKUser[0] === false && snake.length < 600 ){
            event.preventDefault();

            buttonControls(0);
        }
    },
        ".Left"
    );

    useKeyboardShortcut("ArrowRight", (event) => {
        if (SNKUser[0] === false && snake.length < 600 ){
            event.preventDefault();

            buttonControls(1);
        }
    },
        ".Right"
    );


    useExitPoints(() => {
        const adjustedPoints = [Player[0] - ActiveGame[1]];
        storage.set("Player", adjustedPoints);
        setPlayer(adjustedPoints);
    });


    
    const snakeRef = useRef(snake);
    useEffect(() => {
        snakeRef.current = snake;
    }, [snake]);

    const appleLocationRef = useRef(appleLocation);
    useEffect(() => {
        appleLocationRef.current = appleLocation;
    }, [appleLocation]);

    const canChangeDirectionRef = useRef(true);
    const activeDirectionRef = useRef(-1);



    useEffect(() => {

        if (SNKUser[0] === true){

            return;

        }

        const interval = setInterval(() => {

            changeSnakeDirection(setSNKUser, activeDirectionRef.current, setSnake, snakeRef.current, appleLocationRef.current, setAppleLocation);
            canChangeDirectionRef.current = true;

        }, 150);

        return () => clearInterval(interval);

    }, [startButtonPressed, SNKUser]);


    const buttonControls = (direction) => {

        if (startButtonPressed === false){

            playSound(3);
            setStartButtonPressed(true);

        } else {

            if (!canChangeDirectionRef.current) return;

            if (direction === 0 && activeDirectionRef.current !== 1){

                playSound(3);
                activeDirectionRef.current = 0;
                canChangeDirectionRef.current = false;
    
            } else if (direction === 1 && activeDirectionRef.current !== 0){
    
                playSound(3);
                activeDirectionRef.current = 1;
                canChangeDirectionRef.current = false;
    
            } else if (direction === 2 && activeDirectionRef.current !== 3){
    
                playSound(3);
                activeDirectionRef.current = 2; 
                canChangeDirectionRef.current = false;
    
            } else if (direction === 3 && activeDirectionRef.current !== 2){
    
                playSound(3);
                activeDirectionRef.current = 3;
                canChangeDirectionRef.current = false;
    
            } else {

                playSound(5);

            }

        }

    }


    const reset = () => {
    
        playSound(4);
        
        setSNKUser([false, 0]);
        setPlayer(prev => [prev[0] - ActiveGame[1]]);
        setActiveGame(retrieveActiveGame(0));
    
    }


    const result = () => {

        if (SNKUser[1] >= 50){

            achievementsUpdate(setAchievements, 3);

        }

        claimPoints(ActiveGame, Player, setPlayer, (SNKUser[1] * 2));

    }


    return (

        <div>

            <Link to="/selection" className = "generalbutton QuitGame" onClick={() => reset()}>
                <div className="buttonNameContainer">Quit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

            <div className = "gameScreenLayout">

                <div className = "SNKBoardcontainer">

                    {startButtonPressed === false ? (

                        <>
                            <h1 className = "SNKgameBoardSign">  <span className = "signGlitch">Apples Eaten: {SNKUser[1]}</span></h1>

                            <div className="SNKgameboard">
                                <p>Press any of the controls to begin.</p>
                            </div>

                        </>

                    ) : SNKUser[0] === false && snake.length < 600 ? (

                        <>
                            <h1 className = "SNKgameBoardSign">  <span className = "signGlitch">Apples Eaten: {SNKUser[1]}</span></h1>

                            <InnerGameBoard
                                snake = {snake}
                                appleLocation = {appleLocation}
                            />

                        </>

                    ):(

                        <>
                        
                            <h1 className = "SNKgameBoardSign"> <span className = "signGlitch">Game Over.</span></h1>
                            
                            <div className = "SNKgameboard">
                                <p> Game Over.</p>
                            </div>
                                    
                        </>

                    )}
                    
                    {SNKUser[0] === false && snake.length < 600 ? 

                        <div className = "SNKbuttonsContainer">
                            
                            <button className = "SNKcontrolButton Left" onClick={() => buttonControls(0)}> [&larr;] </button>
                            <button className = "SNKcontrolButton Right" onClick={() => buttonControls(1)}> [&rarr;] </button>
                            <button className = "SNKcontrolButton Up" onClick={() => buttonControls(2)}> [&uarr;] </button>
                            <button className = "SNKcontrolButton Down" onClick={() => buttonControls(3)}> [&darr;] </button>

                        </div>

                    :

                        <Link to= "/SNKsummary" className = "SNKdonebutton ViewResults" onClick = {() => result()}>
                            <div className="buttonNameContainer"> View Results<br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                        </Link>   

                    } 

                </div>
                
            </div>

        </div>

    );

}


export default Gamesscreen;