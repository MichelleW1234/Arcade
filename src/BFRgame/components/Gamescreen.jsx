import { Link} from 'react-router-dom';
import React, { useState, useEffect, useRef} from "react";

import InnerGameScreen from "./BFRGameComponents/InnerGamescreen.jsx";

import {itemsShifting, checkHit} from "../Helpers/helpers.js";

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useBFRUser } from '../Providers/BFRUserProvider.jsx';

import "./Gamescreen.css";

function Gamescreen(){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const {BFRUser, setBFRUser} = useBFRUser();

    const [positions, setPositions] = useState([[19, 0]]);
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

        }, 50);

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
        setPlayer(([current, prev]) => [current - ActiveGame[1], current]);
        setActiveGame(retrieveActiveGame(1));

    }

    const claimPoints = () => {
        
        playSound(1);
        const difference = (Player[0] - ActiveGame[1]) + BFRUser[0]*2;
        setPlayer(([current, prev]) => [difference, current]);

    }


    return (

        <div>             
            
            <Link to="/selection" className = "generalbutton" onClick={() => exitGame()}> Quit Game </Link>

            <div className = "gameScreenLayout">
                <div className = "ORBOuterGameContainer">

                    <div> timer: {timer}</div>
                    <div> Balloon score: {BFRUser[0]}</div>

                    {gameOver === false ? (

                        <>
                            <InnerGameScreen
                            positions={positions}
                            laserBlast = {laserBlast}
                            />

                            <button className = "ORBHitButton" onClick = {() => laserBlasted()}>Blast</button>
                        </>


                    ) : (

                        <>
                            <div className = "BFREndingScreen">
                                <h1> Game over.</h1>
                            </div>

                            <Link to="/BFRsummary" className = "ORBDoneButton" onClick = {() => claimPoints()}> View Summary</Link>
                        </>

                    )}
    
                </div>

            </div>
        </div>

    );

}


export default Gamescreen;