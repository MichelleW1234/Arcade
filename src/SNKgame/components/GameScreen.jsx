import {useNavigate, Link } from 'react-router-dom';
import {useRef, useEffect, useState } from 'react';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import InnerGameBoard from "./SNKGameComponents/InnerGameBoard.jsx";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useSNKUser } from '../Providers/SNKUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {changeSnakeDirection} from "../Helpers/helpers.js";
import {claimPoints, playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

import "./Gamescreen.css";

function Gamesscreen(){

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { SNKUser, setSNKUser } = useSNKUser();
    const { Player, setPlayer} = usePlayer();

    const gameboardHeight = 20;
    const gameboardWidth = 30;

    const [activeDirection, setActiveDirection] = useState(-1);
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
    });

    useKeyboardShortcut("Enter", () => {
        if (startButtonPressed === true && SNKUser[0] === true || snake.length >= 600 ){
            claimPoints(ActiveGame, Player, setPlayer, (SNKUser[1] * 2));
            navigate("/SNKsummary");
        }
    });

    useKeyboardShortcut("ArrowUp", () => {
        buttonControls(2);
    });

    useKeyboardShortcut("ArrowDown", () => {
        buttonControls(3);
    });

    useKeyboardShortcut("ArrowLeft", () => {
        buttonControls(0);
    });

    useKeyboardShortcut("ArrowRight", () => {
        buttonControls(1);
    });




    /* Refs avoid stale values and store the latest values for use inside 
    interval callbacks in useEffect without triggering re-renders*/

    const snakeRef = useRef(snake);
    useEffect(() => {
        snakeRef.current = snake;
    }, [snake]);

    const appleLocationRef = useRef(appleLocation);
    useEffect(() => {
        appleLocationRef.current = appleLocation;
    }, [appleLocation]);

    const activeDirectionRef = useRef(activeDirection);
    useEffect(() => {
        activeDirectionRef.current = activeDirection;
    }, [activeDirection]);

    const canChangeDirectionRef = useRef(true);


    /* Clear and restart their interval whenever anything in their dependency array changes
    so that callback always uses the current value */

    useEffect(() => {

        if (SNKUser[0] == true){

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

            if (direction === 0 && activeDirectionRef.current != 1){

                playSound(3);
                setActiveDirection(0);
                canChangeDirectionRef.current = false;
    
            } else if (direction === 1 && activeDirectionRef.current != 0){
    
                playSound(3);
                setActiveDirection(1);
                canChangeDirectionRef.current = false;
    
            } else if (direction === 2 && activeDirectionRef.current != 3){
    
                playSound(3);
                setActiveDirection(2);
                canChangeDirectionRef.current = false;
    
            } else if (direction === 3 && activeDirectionRef.current != 2){
    
                playSound(3);
                setActiveDirection(3);
                canChangeDirectionRef.current = false;
    
            } else {

                playSound(5);

            }

        }

    }


    const reset = () => {
    
        playSound(4);
        
        setSNKUser([false, 0]);
        setPlayer([Player[0] - ActiveGame[1]]);
        setActiveGame(retrieveActiveGame(0));
    
    }

    return (

        <div>

            <Link to="/selection" className = "generalbutton" onClick={() => reset()}>
                Quit Game
            </Link>

            <div className = "gameScreenLayout">

                <div className = "SNKBoardcontainer">

                    {startButtonPressed === false ? (

                        <>
                            <h1 className = "SNKgameBoardSign">  <span className = "signGlitch">Apples Eaten: {SNKUser[1]}</span></h1>

                            <div className = "SNKinnercontainer">

                                <div className="SNKgameboard">
                                    <p>Press any of the controls to begin.</p>
                                </div>

                            </div>
                        </>

                    ) : SNKUser[0] === false && snake.length < 600 ? (

                        <>
                            <h1 className = "SNKgameBoardSign">  <span className = "signGlitch">Apples Eaten: {SNKUser[1]}</span></h1>

                            <div className = "SNKinnercontainer">

                                <InnerGameBoard
                                    snake = {snake}
                                    appleLocation = {appleLocation}
                                />

                            </div>

                        </>

                    ):(

                        <>
                        <h1 className = "SNKgameBoardSign"> <span className = "signGlitch">Game Over.</span></h1>

                        <div className = "SNKinnercontainer">
                        
                            <div className = "SNKgameboard">
                                <p> Game Over.</p>
                            </div>
                                    
                        </div>
                        </>

                    )}
                    
                    {SNKUser[0] === false && snake.length < 600 ? 

                        <div className = "SNKbuttonsContainer">
                            
                            <button className = "SNKcontrolButton" onClick={() => buttonControls(0)}> {"\u2190"} </button>
                            <button className = "SNKcontrolButton" onClick={() => buttonControls(1)}> {"\u2192"} </button>
                            <button className = "SNKcontrolButton" onClick={() => buttonControls(2)}> {"\u2191"} </button>
                            <button className = "SNKcontrolButton" onClick={() => buttonControls(3)}> {"\u2193"} </button>

                        </div>

                    :

                        <Link to= "/SNKsummary" className = "generalbuttonGlitch" onClick = {() => claimPoints(ActiveGame, Player, setPlayer, (SNKUser[1] * 2))}>
                            View Results
                        </Link>   

                    } 

                </div>
                
            </div>

        </div>

    );

}


export default Gamesscreen;