import { Link} from 'react-router-dom';
import React, { useState, useEffect, useRef} from "react";

import ClawBar from "./CWMGameComponents/ClawBar.jsx";

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";
import {changePosition, clawGrab, chooseCat} from "../Helpers/helpers.js";

import { useCWMUser } from '../Providers/CWMUserProvider.jsx';
import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import "./Gamescreen.css";

function Gamescreen (){

    const { CWMUser, setCWMUser} = useCWMUser();
    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();

    const [buttonHit, setButtonHit] = useState(false);
    const [result, setResult] = useState(0);

    const [currentPosition, setCurrentPosition] = useState(0);
    const [direction, setDirection] = useState(1);

    const currentPositionRef = useRef(currentPosition);
    useEffect(() => {
        currentPositionRef.current = currentPosition;
    }, [currentPosition]);

    const directionRef = useRef(direction);
    useEffect(() => {
        directionRef.current = direction;
    }, [direction]);


    useEffect(() => {

        if (buttonHit == true){

            return

        }

        const interval = setInterval(() => {

            changePosition(currentPositionRef.current, setCurrentPosition, directionRef.current, setDirection);
            console.log(currentPosition);

        }, 30);

        return () => clearInterval(interval);

    }, [buttonHit]);


    const claimPrize = () => {

        if (result == 1){

            const cat = chooseCat();
            setCWMUser(cat);

        }

        setPlayer(([current, prev]) => [current - ActiveGame[1], current]);
        playSound(2);

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
            
                <div className = "CBLOuterGameContainer">

                    <ClawBar
                        setButtonHit = {setButtonHit}
                        setResult = {setResult}
                        currentPosition = {currentPosition}
                    />

                    <div className="CWMGameBoardScreen">

                        <div className = "CWMWindow">
                            <img/>
                        </div>

                    </div>

                    {buttonHit == true ? (

                        <Link to="/CWMsummary" className ="CWMButton" onClick = {() => claimPrize()}> Check Prize Door </Link>

                    ) : (

                        <button className ="CWMButton" onClick = {() => clawGrab(currentPosition, setResult, setButtonHit)}>Grab</button>

                    )}

    
                </div>

            </div>
        </div>

    );

}


export default Gamescreen;