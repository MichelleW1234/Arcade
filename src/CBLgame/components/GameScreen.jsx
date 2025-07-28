import { Link} from 'react-router-dom';
import React, { useState, useEffect} from "react";

import InnerGameScreen from "./CBLGameComponents/InnerGamescreen.jsx";

import {playSound, retrieveActiveGame, claimPoints} from "../../Helpers/helpers.js";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {useCBLUser} from "../Providers/CBLUserProvider.jsx";

import "./Gamescreen.css";

function Gamescreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const {CBLUser, setCBLUser} = useCBLUser();

    const [colorToBlast, setColorToBlast] = useState(Math.floor(Math.random() * 4));
    const [colorAppearances, setColorAppearances] = useState(0);

    const [wrongColorBlasted, setWrongColorBlasted] = useState(false);

    useEffect(() => {

        if (wrongColorBlasted == true) {

            return;

        }

        const interval = setInterval(() => {

            const newColor = Math.floor(Math.random() * 4);
            setColorToBlast(newColor);

        }, 3500);

        return () => clearInterval(interval);

    }, [wrongColorBlasted]);
    

    const exitGame = () => {
        
        playSound(4);

        setCBLUser([0]);
        setPlayer([Player[0] - ActiveGame[1]]);
        setActiveGame(retrieveActiveGame(1));

    }

    return (

        <div>             
            
            <Link to="/selection" className = "generalbutton" onClick={() => exitGame()}> Quit Game </Link>

            <div className = "gameScreenLayout">

                {colorAppearances < 50 && wrongColorBlasted == false ? (
            
                <div className = "CBLOuterGameContainer">

                    <h1 className="CBLsign"> <span className='signGlitch'>Colors Blasted: {CBLUser[0]} </span></h1>

                    <InnerGameScreen
                        setColorAppearances = {setColorAppearances}
                        colorToBlast = {colorToBlast}
                        setWrongColorBlasted = {setWrongColorBlasted}
                        wrongColorBlasted = {wrongColorBlasted}
                    />
    
                </div>

                ) : (

                    <div className = "CBLOuterGameContainer">

                        <h1 className="CBLsign"> <span className='signGlitch'> Game Over. </span></h1>

                        <div className = "CBLGameBoardEndingScreen">

                            {wrongColorBlasted ? (

                                <p> You blasted the wrong color. </p>

                            ) : (

                                <p> Game Over.</p>

                            )}
                            
                        </div>

                        <Link to="/CBLsummary" className = "CBLbutton" onClick = {() => claimPoints(ActiveGame, Player, setPlayer, CBLUser[0]*3)}> View Results </Link>

                    </div>

                )}

            </div>
        </div>

    );

}


export default Gamescreen;