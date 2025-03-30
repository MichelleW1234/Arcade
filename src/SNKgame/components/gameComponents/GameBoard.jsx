import React, {useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import InnerGameBoard from "./InnerGameBoard.jsx";

import { useSNKUser } from '../../Providers/SNKUserProvider.jsx';

import {bumpChecker, changeSnakeDirection, increaseSnakeLength, newApple} from "../../Helpers/SNKhelpers.js";

import "./GameBoard.css";



function GameBoard (){

    const [activeDirection, setActiveDirection] = useState(3);

    const [snake, setSnake] = useState([[0, 0]])
    const [appleLocation, setAppleLocation] = useState([20,30]);

    const [completed, setCompleted] = useState(false);

    const { SNKUser, setSNKUser } = useSNKUser();


    

    // Use a ref to hold the current snake state, to prevent an infinite loop of updates
    const snakeRef = useRef(snake);

    useEffect(() => {
        snakeRef.current = snake;
    }, [snake]);

    useEffect(() => {
   
        const interval = setInterval(() => {

            changeSnakeDirection(activeDirection, setSnake);

            let bumped = bumpChecker(snake);
            setSNKUser(prevMatrix => {

                const newMatrix = [...prevMatrix];
                newMatrix[0] = bumped;
    
                return newMatrix;
    
            });
                
                

            // Make sure to use the latest snake state by referring to the ref
            const [headX, headY] = snakeRef.current[snakeRef.current.length - 1];
            const [appleX, appleY] = appleLocation;
    
            if (headX === appleX && headY === appleY) {

                increaseSnakeLength(snakeRef.current, setSnake, appleLocation);
                newApple(snakeRef.current, setAppleLocation);

            }

        }, 1000); // May tweak for better reaction time
        
        return () => clearInterval(interval);

    }, [activeDirection, appleLocation]);







    
    const direction = (direction) => {

        if (direction === 0){

            setActiveDirection(0);

        } else if (direction === 1){

            setActiveDirection(1);

        } else if (direction === 2){

            setActiveDirection(2);

        } else {

            setActiveDirection(3);

        }


    };














    return (

        <div className = "SNKBoardcontainer">

            <div className = "SNKinnercontainer">

                {SNKUser[0] === false && completed === false ? 

                    <InnerGameBoard
                        snake = {snake}
                        appleLocation = {appleLocation}
                    />
                
                :
            
                    <div>
                        <h1 className = "SNKendinggameboard"> Game Over.</h1>
                    </div>
                        
                }
               
            </div>

            {SNKUser[0] === false && completed === false ? 
                
                <div className = "SNKbuttonsContainer">
                    
                    <button className = "SNKcontrolButton" onClick={() => direction(0)}> {"\u2190"} </button>
                    <button className = "SNKcontrolButton" onClick={() => direction(1)}> {"\u2192"} </button>
                    <button className = "SNKcontrolButton" onClick={() => direction(2)}> {"\u2191"} </button>
                    <button className = "SNKcontrolButton" onClick={() => direction(3)}> {"\u2193"} </button>

                </div>

            :

                <Link to= "/SNKresults" className = "generalbuttonGlitch">
                    View results
                </Link>   

            } 

        </div>

    );

}


export default GameBoard;