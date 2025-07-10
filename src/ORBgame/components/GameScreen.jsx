import { Link} from 'react-router-dom';
import React, { useState, useEffect, useRef} from "react";

import InnerGameScreen from "./ORBGameComponents/InnerGamescreen.jsx";

import {orbiting} from "../Helpers/helpers.js";

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import "./Gamescreen.css";

function Gamescreen(){

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


    const currentSlotRef = useRef(currentSlot);
    
    useEffect(() => {
        currentSlotRef.current = currentSlot;
    }, [currentSlot]);

    useEffect(() => {
    
        if (stop == true) {

            return;

        } else {

            const interval = setInterval(() => {

                orbiting(circle, currentSlotRef.current, setCurrentSlot);

            }, 30);

            return () => clearInterval(interval);

        }

    }, [stop]);

    const stopped = () => {

        setStop(true);
        playSound(6);

        if (circle[currentSlot][0] == winner[0] && circle[currentSlot][1] == winner[1]){

            setSuccess(true);

        }

    };

    const claimPoints = () => {

        playSound(2);

        if (circle[currentSlot][0] == winner[0] && circle[currentSlot][1] == winner[1]){

            setPlayer(([current, prev]) => [current + ActiveGame[1], current]);

        } else {

            setPlayer(([current, prev]) => [current - ActiveGame[1], current]);

        }

    }


    const exitGame = () => {
        
        playSound(4);
        setPlayer(([current, prev]) => [current - ActiveGame[1], current]);
        setActiveGame(retrieveActiveGame(1));

    }


    return (

        <div>             
            
            <Link to="/selection" className = "generalbutton" onClick={() => exitGame()}> Quit Game </Link>

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

                        <button className = "ORBHitButton" onClick={() => stopped()}> STOP </button>

                    ) : (

                        <Link to="/ORBsummary" className = "ORBDoneButton" onClick={()=> claimPoints()}> View Result </Link>

                    )}

                </div>
            </div>
        </div>

    );

}


export default Gamescreen;