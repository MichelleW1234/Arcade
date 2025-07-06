import { Link} from 'react-router-dom';
import React, { useState, useEffect} from "react";

import InnerGameScreen from "./gameScreenComponents/InnerGameScreen.jsx";

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {useCBLUser} from "../Providers/CBLUserProvider.jsx";

import "./GameScreen.css";

function GameScreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const {CBLUser, setCBLUser} = useCBLUser();

    const [timer, setTimer] = useState(0);

    const exitGame = () => {
        
        playSound(4);
        setPlayer(([current, prev]) => [current - ActiveGame[1], current]);
        setActiveGame(retrieveActiveGame(1));

    }


    useEffect(() => {

        const interval = setInterval(() => {

            setTimer(prev => prev + 1);

        }, 1000);

        return () => clearInterval(interval);

    }, []);
    


    return (

        <div>             
            
            <Link to="/selection" className = "generalbutton" onClick={() => exitGame()}> Quit Game </Link>

            <div className = "gameScreenLayout">

                {timer < 30 ? (
            
                <div className = "CBLOuterGameContainer">

                    <div> Timer: {timer} </div>
                    <div> Colors Blasted: {CBLUser[0]} </div>

                    <InnerGameScreen/>
    
                </div>

                ) : (

                    <div className = "CBLOuterGameContainer">

                        <div> Timer: -- </div> 
                        <div> Colors Blasted: {CBLUser[0]} </div>

                        <p>Game Over.</p>

                        <Link to="/CBLsummary" className = "generalbutton"> View Results </Link>

                    </div>

                )}

            </div>
        </div>

    );

}


export default GameScreen;