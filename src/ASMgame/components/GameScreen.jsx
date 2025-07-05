import { Link} from 'react-router-dom';
import React, { useState, useEffect} from "react";

import InnerGameScreen from "./gameScreenComponents/InnerGameScreen.jsx";

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import "./GameScreen.css";

function GameScreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();

    const [numAliens, setNumAliens] = useState(0);

    const exitGame = () => {
        
        playSound(4);
        setPlayer(([current, prev]) => [current - ActiveGame[1], current]);
        setActiveGame(retrieveActiveGame(1));

    }


    return (

        <div>             
            
            <Link to="/selection" className = "generalbutton" onClick={() => exitGame()}> Quit Game </Link>

            <div className = "gameScreenLayout">

                <div className = "ASMOuterGameContainer">

                    {numAliens <= 10 ? (

                        <InnerGameScreen
                            setNumAliens={setNumAliens}
                        />

                    ) : (

                        <p>Game Over.</p>

                    )}
    
                </div>
            </div>
        </div>

    );

}


export default GameScreen;