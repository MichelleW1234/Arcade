import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef} from "react";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import { useExitPoints } from "../../hooks/useExitPoints";

import InnerGameScreen from "./ORBGameComponents/InnerGamescreen.jsx";

import {orbiting} from "../Helpers/helpers.js";

import {playSound, retrieveActiveGame, pointsDistribution, achievementsUpdate} from "../../Helpers/helpers.js";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useORBUser } from '../Providers/ORBUserProvider.jsx';
import { useAchievements } from '../../Providers/AchievementsProvider.jsx';

import "./Gamescreen.css";

function Gamescreen(){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { ORBUser, setORBUser} = useORBUser();
    const { Achievements, setAchievements} = useAchievements();

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



    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        exitGame();
        navigate("/selection");
    },
        ".QuitGame"
    );

    useKeyboardShortcut("Enter", () => {
        if (stop == true){
            document.querySelectorAll(".ViewResults").forEach(el => {
                el.classList.add("active");
                setTimeout(() => el.classList.remove("active"), 100);
            });
            document.querySelectorAll(".Stop").forEach(el => el.classList.remove("active"));

            calculateWin();
            navigate("/ORBsummary");
        } else {
            document.querySelectorAll(".Stop").forEach(el => {
                el.classList.add("active");
                setTimeout(() => el.classList.remove("active"), 100);
            });
            document.querySelectorAll(".ViewResults").forEach(el => el.classList.remove("active"));

            stopped();
        }
    });


    useExitPoints(() => {
        const adjustedPoints = [Player[0] - ActiveGame[1]];
        localStorage.setItem("Player", JSON.stringify(adjustedPoints));
        setPlayer(adjustedPoints);
    });
    


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

    const calculateWin = () => {

        if (success === true){

            achievementsUpdate(setAchievements, 5);
            pointsDistribution(ActiveGame, 1, setPlayer, Player);
            setORBUser([true]);

        } else {

            pointsDistribution(ActiveGame, 0, setPlayer, Player);

        }

    }


    const exitGame = () => {
        
        playSound(4);
        setORBUser([false]);
        setPlayer([Player[0] - ActiveGame[1]]);
        setActiveGame(retrieveActiveGame(0));

    }


    return (

        <div>             
            
            <Link to="/selection" className = "generalbutton QuitGame" onClick={() => exitGame()}> 
                <div className="buttonNameContainer"> Quit Game  <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

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

                        <button className = "ORBHitButton Stop" onClick={() => stopped()}> 
                            <div className="buttonNameContainer">STOP<br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                        </button>

                    ) : (

                        <Link to="/ORBsummary" className = "ORBDoneButton ViewResults" onClick={()=> calculateWin()}> 
                            <div className="buttonNameContainer"> View Results <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                        </Link>

                    )}

                </div>
            </div>
        </div>

    );

}


export default Gamescreen;