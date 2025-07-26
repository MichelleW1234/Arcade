import { Link} from 'react-router-dom';
import React, { useState, useEffect, useRef} from "react";

import InnerGameScreen from "./BFRGameComponents/InnerGamescreen.jsx";

import {itemsShifting, checkHit, incomingItem} from "../Helpers/helpers.js";

import {playSound, retrieveActiveGame, claimPoints} from "../../Helpers/helpers.js";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useBFRUser } from '../Providers/BFRUserProvider.jsx';

import "./Gamescreen.css";

function Gamescreen(){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const {BFRUser, setBFRUser} = useBFRUser();

    const [positions, setPositions] = useState([[16, incomingItem()]]);
    const [laserBlast, setLaserBlast] = useState(false);
    const [timer, setTimer] = useState(1);
    const [gameOver, setGameOver] = useState(false);

    const positionsRef = useRef(positions);
    useEffect(() => {
        positionsRef.current = positions;
    }, [positions]);

    const laserTimeoutRef = useRef(null);

    
    useEffect(() => {

        if (gameOver == true){

            return;

        }

        const interval = setInterval(() => {

            itemsShifting(positionsRef.current, setPositions);

        }, 65);

        return () => clearInterval(interval);

    }, [gameOver]);

    
    useEffect(() => {

        if (gameOver == true){

            return;

        }

        const interval = setInterval(() => {

            setTimer(prev => prev + 1);

        }, 1000);

        return () => clearInterval(interval);

    }, [gameOver]);


    useEffect(() => {

        if (timer >= 30) {

            playSound(6);
            setGameOver(true);

        }

    }, [timer]);


    const laserBlasted = () => {

        checkHit(positions, setPositions, setBFRUser, BFRUser);

        setLaserBlast(true);

        if (laserTimeoutRef.current) {
            clearTimeout(laserTimeoutRef.current);
        }

        laserTimeoutRef.current = setTimeout(() => {
            setLaserBlast(false);
            laserTimeoutRef.current = null; // Clean up ref
        }, 100);

    };


    const exitGame = () => {
        
        playSound(4);

        setBFRUser([0]);
        setPlayer(([current, prev]) => [current - ActiveGame[1], current]);
        setActiveGame(retrieveActiveGame(1));

    }


    return (

        <div>             
            
            <Link to="/selection" className = "generalbutton" onClick={() => exitGame()}> Quit Game </Link>

            <div className = "gameScreenLayout">
                <div className = "BFROuterGameContainer">

                    <div className="BFRsigns"> Timer: {timer} | Balloon Score: {BFRUser[0]}</div>

                    {gameOver === false ? (

                        <>
                            <InnerGameScreen
                            positions={positions}
                            laserBlast = {laserBlast}
                            />

                            <button className = "BFRActivateButton" onClick = {() => laserBlasted()}>Activate</button>
                        </>


                    ) : (

                        <>
                            <div className = "BFREndingScreen">
                                <h1> Game over.</h1>
                            </div>

                            <Link to="/BFRsummary" className = "BFRDoneButton" onClick = {() => claimPoints(ActiveGame, Player, setPlayer, (BFRUser[0]*2))}> View Summary</Link>
                        </>

                    )}
    
                </div>

            </div>
        </div>

    );

}


export default Gamescreen;