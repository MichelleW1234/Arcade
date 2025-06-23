import React, {useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import InnerGameBoard from "./InnerGameBoard.jsx";

import { useSNKUser } from '../../Providers/SNKUserProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';

import {playSound} from '../../../Helpers/helpers.js';

import {changeSnakeDirection} from "../../Helpers/SNKhelpers.js";

import "./GameBoard.css";


function GameBoard (){

    const gameboardHeight = 20;
    const gameboardWidth = 30;

    const [activeDirection, setActiveDirection] = useState(-1);
    const [snake, setSnake] = useState([[0, 0]]);
    const [appleLocation, setAppleLocation] = useState([
        Math.floor(Math.random() * gameboardHeight),
        Math.floor(Math.random() * gameboardWidth)
    ]);

    const [startButtonPressed, setStartButtonPressed] = useState(false);

    const { SNKUser, setSNKUser } = useSNKUser();
    const { Player, setPlayer } = usePlayer();
    const { ActiveGame, setActiveGame } = useActiveGame();


    // Use a ref to hold the current snake state, to prevent an infinite loop of updates
    const snakeRef = useRef(snake);

    useEffect(() => {
        snakeRef.current = snake;
    }, [snake]);

    useEffect(() => {

        const interval = setInterval(() => {

            changeSnakeDirection(setSNKUser, activeDirection, setSnake, snakeRef.current, appleLocation, setAppleLocation);

        }, 150);

        return () => clearInterval(interval);

    }, [startButtonPressed, activeDirection, appleLocation]);


    const buttonControls = (direction) => {

        if (startButtonPressed === false){

            playSound(3);
            setStartButtonPressed(true);

        } else {

            if (direction === 0 && activeDirection != 1){

                playSound(3);
                setActiveDirection(0);
    
            } else if (direction === 1 && activeDirection != 0){
    
                playSound(3);
                setActiveDirection(1);
    
            } else if (direction === 2 && activeDirection != 3){
    
                playSound(3);
                setActiveDirection(2);
    
            } else if (direction === 3 && activeDirection != 2){
    
                playSound(3);
                setActiveDirection(3);
    
            } else {

                playSound(5);

            }


        }


    }


    const transaction = () => {

        playSound(1);
        const difference = Player[0] + (SNKUser[1] * 2) - ActiveGame[1];
    
        if (difference >= 0){
    
            setPlayer(prev => [difference, prev[0]]);
    
        } else {
    
            setPlayer(prev => [0, prev[0]]);
    
        }

    }



    return (

        <div className = "SNKBoardcontainer">

            <div className = "SNKgameBoardSign"> Apples eaten: <span className = "SNKgameBoardSignGlitch">{SNKUser[1]}</span></div>

            <div className = "SNKinnercontainer">

                {startButtonPressed === false ? (

                    <div className="SNKendinggameboard">
                       Press any of the controls to begin.
                    </div>


                ) : SNKUser[0] === false && snake.length < 600 ? (

                    <InnerGameBoard
                        snake = {snake}
                        appleLocation = {appleLocation}
                    />
                
                ):(
            
                    <div className = "SNKendinggameboard">
                        Game Over.
                    </div>
                        
                )}
               
            </div>
            
            {SNKUser[0] === false && snake.length < 600 ? 

                <div className = "SNKbuttonsContainer">
                    
                    <button className = "SNKcontrolButton" onClick={() => buttonControls(0)}> {"\u2190"} </button>
                    <button className = "SNKcontrolButton" onClick={() => buttonControls(1)}> {"\u2192"} </button>
                    <button className = "SNKcontrolButton" onClick={() => buttonControls(2)}> {"\u2191"} </button>
                    <button className = "SNKcontrolButton" onClick={() => buttonControls(3)}> {"\u2193"} </button>

                </div>

            :

                <Link to= "/SNKresults" className = "generalbuttonGlitch" onClick = {transaction}>
                    View results
                </Link>   

            } 

        </div>

    );

}


export default GameBoard;