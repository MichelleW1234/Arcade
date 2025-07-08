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

    const [colorToBlast, setColorToBlast] = useState(Math.floor(Math.random() * 4));
    const [colorAppearances, setColorAppearances] = useState(0);

    const [wrongColorBlasted, setWrongColorBlasted] = useState(false);

    useEffect(() => {

        const interval = setInterval(() => {

            const newColor = Math.floor(Math.random() * 4);
            setColorToBlast(newColor);

        }, 4000);

        return () => clearInterval(interval);

    }, []);
    

    const exitGame = () => {
        
        playSound(4);
        setPlayer(([current, prev]) => [current - ActiveGame[1], current]);
        setActiveGame(retrieveActiveGame(1));

    }

    const claimPoints = () => {

        const difference = (Player[0] - ActiveGame[1]) + CBLUser[0]*3;
        setPlayer(([current, prev]) => [difference, current]);
        playSound(2);

    }

    return (

        <div>             
            
            <Link to="/selection" className = "generalbutton" onClick={() => exitGame()}> Quit Game </Link>

            <div className = "gameScreenLayout">

                {colorAppearances < 50 && wrongColorBlasted == false ? (
            
                <div className = "CBLOuterGameContainer">

                    <div className="CBLsign"> Colors Blasted: {CBLUser[0]} </div>

                    <InnerGameScreen
                        setColorAppearances = {setColorAppearances}
                        colorToBlast = {colorToBlast}
                        setWrongColorBlasted = {setWrongColorBlasted}
                    />
    
                </div>

                ) : (

                    <div className = "CBLOuterGameContainer">

                        <div className="CBLsign"> Colors Blasted: {CBLUser[0]} </div>

                        <div className = "CBLGameBoardEndingScreen">

                            {wrongColorBlasted ? (

                                <h1> You blasted the wrong color. </h1>

                            ) : (

                                <h1> Game Over.</h1>

                            )}
                            
                        </div>

                        <Link to="/CBLsummary" className = "CBLbutton" onClick = {() => claimPoints()}> View Results </Link>

                    </div>

                )}

            </div>
        </div>

    );

}


export default GameScreen;