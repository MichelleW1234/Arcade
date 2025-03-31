import React, {useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import InnerGameBoard from "./InnerGameBoard.jsx";

import { useSNKUser } from '../../Providers/SNKUserProvider.jsx';

import {changeSnakeDirection} from "../../Helpers/SNKhelpers.js";

import "./GameBoard.css";



function GameBoard (){

    const [activeDirection, setActiveDirection] = useState(3);
    const [snake, setSnake] = useState([[0, 0]]);
    const [appleLocation, setAppleLocation] = useState([14, 26]);

    const { SNKUser, setSNKUser } = useSNKUser();

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

    }, [SNKUser, activeDirection, appleLocation]);

    
    const direction = (direction) => {

        if (direction === 0 && activeDirection != 1){

            setActiveDirection(0);

        } else if (direction === 1 && activeDirection != 0){

            setActiveDirection(1);

        } else if (direction === 2 && activeDirection != 3){

            setActiveDirection(2);

        } else if (direction === 3 && activeDirection != 2){

            setActiveDirection(3);

        }

    };



    return (

        <div className = "SNKBoardcontainer">

            <div className = "SNKinnercontainer">

                {SNKUser[0] === false && snake.length < 600 ? 

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

            {SNKUser[0] === false && snake.length < 600 ? 
                
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