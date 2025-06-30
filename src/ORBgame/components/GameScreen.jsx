import { Link} from 'react-router-dom';
import React, { useState, useEffect} from "react";

import InnerGameScreen from "./gameScreenComponents/InnerGameScreen.jsx";

import {orbiting} from "../Helpers/helpers.js";

import {playSound} from '../../Helpers/helpers.js';

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import "./GameScreen.css";

function GameScreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();

    const [stop, setStop] = useState(false);
    const [success, setSuccess] = useState(false);

    const winner = [13, 9];
    const [currentSlot, setCurrentSlot] = useState(0);

    const circleTop = 
        Array.from({ length: 18 }, (_, i) => [1, i + 1]);
    const circleRight = 
        Array.from({ length: 13 }, (_, i) => [i + 1, 18]);
    const circleBottom = 
        Array.from({ length: 18 }, (_, i) => [13, 18 - i]);
    const circleLeft = 
        Array.from({ length: 13 }, (_, i) => [13 - i, 1]);

    const circle = [
        ...circleTop,
        ...circleRight,
        ...circleBottom,
        ...circleLeft,
    ];


    useEffect(() => {
    
        if (stop == true) {

            return;

        } else {

            const interval = setInterval(() => {

                orbiting(circle, currentSlot, setCurrentSlot);

            }, 30);

            return () => clearInterval(interval);

        }

    }, [currentSlot, stop]);


    const stopped = () => {

        setStop(true);

        if (circle[currentSlot][0] == winner[0] && circle[currentSlot][1] == winner[1]){

            setSuccess(true);

        }

    };

    const claimPoints = () => {

        if (circle[currentSlot][0] == winner[0] && circle[currentSlot][1] == winner[1]){

            setPlayer(([current, prev]) => [current + ActiveGame[1], current]);

        } else {

            setPlayer(([current, prev]) => [current - ActiveGame[1], current]);

        }

    }


    return (

        <div className = "gameScreenLayout">

            <div className = "ORBOuterGameContainer">

                {stop == false ? (

                    <div className = "ORBGameBoardLightContainer">
                        <div className = "ORBGameBoardLightGo">  </div>
                        <div className = "ORBGameBoardLightGo">  </div>
                        <div className = "ORBGameBoardLightGo">  </div>
                    </div>

                ) : (

                    <div className = "ORBGameBoardLightContainer">
                        <div className = "ORBGameBoardLightStop">  </div>
                        <div className = "ORBGameBoardLightStop">  </div>
                        <div className = "ORBGameBoardLightStop">  </div>
                    </div>

                )}

                <InnerGameScreen
                    circle = {circle}
                    currentSlot = {currentSlot}
                    winner = {winner}

                />

                {stop == false ? (

                    <button className = "ORBHitButton" onClick={stopped}> STOP </button>

                ) : (

                    <Link to="/ORBsummary" className = "ORBDoneButton" onClick={claimPoints}> View Result </Link>

                )}

            </div>
        </div>

    );

}


export default GameScreen;