import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef} from "react";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import { useExitPoints } from "../../hooks/useExitPoints";

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


    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        exitGame();
        navigate("/selection");
    },
        ".QuitGame"
    );

    useKeyboardShortcut("Enter", () => {
        if (gameOver == true){
            document.querySelectorAll(".ViewResults").forEach(el => {
                el.classList.add("active");
                setTimeout(() => el.classList.remove("active"), 100);
            });
            document.querySelectorAll(".Activate").forEach(el => el.classList.remove("active"));

            claimPoints(ActiveGame, Player, setPlayer, (BFRUser[0]*2));
            navigate("/BFRsummary");
        } else {
            document.querySelectorAll(".Activate").forEach(el => {
                el.classList.add("active");
                setTimeout(() => el.classList.remove("active"), 100);
            });
            document.querySelectorAll(".ViewResults").forEach(el => el.classList.remove("active"));

            laserBlasted();
        }
    });



    useExitPoints(() => {
        const adjustedPoints = [Player[0] - ActiveGame[1]];
        localStorage.setItem("Player", JSON.stringify(adjustedPoints));
        setPlayer(adjustedPoints);
    });



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
        setPlayer([Player[0] - ActiveGame[1]]);
        setActiveGame(retrieveActiveGame(0));

    }


    return (

        <div>             
            
            <Link to="/selection" className = "generalbutton QuitGame" onClick={() => exitGame()}> 
                <div className="buttonNameContainer">Quit Game<br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

            <div className = "gameScreenLayout">
                <div className = "BFROuterGameContainer">

                    {gameOver === false ? (

                        <>
                            <h1 className="BFRsign"> <span className='signGlitch'> Timer: {timer} | Balloon Score: {BFRUser[0]}</span></h1>

                            <InnerGameScreen
                            positions={positions}
                            laserBlast = {laserBlast}
                            />

                            <button className = "BFRActivateButton Activate" onClick = {() => laserBlasted()}>
                                <div className="buttonNameContainer">Activate <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                            </button>
                        </>


                    ) : (

                        <>

                            <h1 className="BFRsign"> <span className='signGlitch'> Game Over. </span></h1>

                            <div className = "BFREndingScreen">
                                <p> Game Over.</p>
                            </div>

                            <Link to="/BFRsummary" className = "BFRDoneButton ViewResults" onClick = {() => claimPoints(ActiveGame, Player, setPlayer, (BFRUser[0]*2))}> 
                                <div className="buttonNameContainer"> View Results <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                            </Link>
                        </>

                    )}
    
                </div>

            </div>
        </div>

    );

}


export default Gamescreen;