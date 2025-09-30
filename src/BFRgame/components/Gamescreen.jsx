import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef} from "react";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import { useExitPoints } from "../../hooks/useExitPoints";
import { storage } from "../../storage";

import InnerGameScreen from "./BFRGameComponents/InnerGamescreen.jsx";

import {itemsShifting, incomingItem} from "../Helpers/helpers.js";

import {playSound, retrieveActiveGame, claimPoints, achievementsUpdate} from "../../Helpers/helpers.js";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useBFRUser } from '../Providers/BFRUserProvider.jsx';
import { useAchievements } from '../../Providers/AchievementsProvider.jsx';

import "./Gamescreen.css";

function Gamescreen(){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const {BFRUser, setBFRUser} = useBFRUser();
    const { setAchievements} = useAchievements();

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
        if (gameOver === true){
            result();
            navigate("/BFRsummary");
        }
    },
        ".ViewResults"
    );


    useKeyboardShortcut("Shift", () => {
        if (gameOver === false){
            laserBlasted();
        }
    },
        ".Activate"
    );

    


    useExitPoints(() => {
        const adjustedPoints = [Player[0] - ActiveGame[1]];
        storage.set("Player", adjustedPoints);
        setPlayer(adjustedPoints);
    });



    const positionsRef = useRef(positions);
    useEffect(() => {
        positionsRef.current = positions;
    }, [positions]);

    const laserTimeoutRef = useRef(null);

    
    useEffect(() => {

        if (gameOver === true){

            return;

        }

        const interval = setInterval(() => {

            itemsShifting(positionsRef.current, setPositions);

        }, 65);

        return () => clearInterval(interval);

    }, [gameOver]);

    
    useEffect(() => {

        if (gameOver === true){

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




    const checkHit = () => {

        let birdShot = false;
        let balloonPopped = false;

        for (const [r, c] of positions) {

            if (r === 8 && c === 0) {

                birdShot = true;

            } 

            if (r === 8 && c === 1) {

                balloonPopped = true;

            } 

            if (birdShot || balloonPopped) {
                
                break;

            }
            
        }

        if (birdShot === true) {

            playSound(28);

            if (BFRUser[0] > 0){

                setBFRUser(prev => [prev[0] - 1]);

            }

        }

        if (balloonPopped === true) {

            playSound(27);

            let newMatrix = positions.filter(position => !(position[0] === 8));
            setPositions(newMatrix);

            setBFRUser(prev => [prev[0] + 1]);

        }

        if (birdShot === false && balloonPopped === false){

            playSound(26);

        }

    }



    const laserBlasted = () => {

        checkHit();

        setLaserBlast(true);

        if (laserTimeoutRef.current === true) {
            clearTimeout(laserTimeoutRef.current);
        }

        laserTimeoutRef.current = setTimeout(() => {
            setLaserBlast(false);
            laserTimeoutRef.current = null;
        }, 100);

    };


    const exitGame = () => {
        
        playSound(4);

        setBFRUser([0]);
        setPlayer(prev => [prev[0] - ActiveGame[1]]);
        setActiveGame(retrieveActiveGame(0));

    }

    const result = () => {
        
        if (BFRUser[0] >= 15){

            achievementsUpdate(setAchievements, 7);

        }

        claimPoints(ActiveGame, Player, setPlayer, (BFRUser[0]*2));

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
                                <div className="buttonNameContainer">Activate <br/> <span className = "buttonKeyDescription"> [Shift] </span></div>
                            </button>
                        </>


                    ) : (

                        <>

                            <h1 className="BFRsign"> <span className='signGlitch'> Game Over. </span></h1>

                            <div className = "BFREndingScreen">
                                <p> Game Over.</p>
                            </div>

                            <Link to="/BFRsummary" className = "BFRDoneButton ViewResults" onClick = {() => result()}> 
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