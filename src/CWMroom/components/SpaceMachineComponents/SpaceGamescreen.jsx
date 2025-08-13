import { useNavigate, Link} from 'react-router-dom';
import { useState, useEffect, useRef} from "react";
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";

import ClawBar from "../CWMGameComponents/ClawBar.jsx";
import ClawWindow from './SpaceGameComponents/SpaceClawWindow.jsx';

import {changePosition, clawGrab, claimPrize, exitGame} from "../../Helpers/helpers.js";

import { useCWMUser } from '../../Providers/CWMUserProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { usePrize} from '../../../Providers/PrizeProvider.jsx';

import "./SpaceGamescreen.css";

function SpaceGamescreen (){

    const { CWMUser, setCWMUser} = useCWMUser();
    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Prize, setPrize } = usePrize();

    const [buttonHit, setButtonHit] = useState(false);
    const [result, setResult] = useState(0);

    const [currentPosition, setCurrentPosition] = useState(0);
    const [direction, setDirection] = useState(1);

    const [clawWentDown, setClawWentDown] = useState(false);

    const navigate = useNavigate();
    useKeyboardShortcut("Enter", () => {
        if (buttonHit == false){
            document.querySelectorAll(".Grab").forEach(el => {
                    el.classList.add("active");
                    setTimeout(() => el.classList.remove("active"), 100);
            });
            document.querySelectorAll(".CheckPrizeDoor").forEach(el => el.classList.remove("active"));
            
            clawGrab(currentPosition, setResult, setButtonHit);

        } else if (clawWentDown == true){
            document.querySelectorAll(".CheckPrizeDoor").forEach(el => {
                el.classList.add("active");
                setTimeout(() => el.classList.remove("active"), 100);
            });
            document.querySelectorAll(".Grab").forEach(el => el.classList.remove("active"));

            claimPrize(result, setCWMUser, setPrize, Player, setPlayer, ActiveGame[1], [17, 18, 19, 20]);
            navigate("/CWMspacesummary");
        }
    });

    useKeyboardShortcut("Escape", () => {
        exitGame(Player, setPlayer, ActiveGame[1], setCWMUser);
        navigate("/CWMselection");
    },
        ".QuitMachine"
    );





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

            return;

        }

        const interval = setInterval(() => {

            changePosition(currentPositionRef.current, setCurrentPosition, directionRef.current, setDirection);

        }, 30);

        return () => clearInterval(interval);

    }, [buttonHit]);


    return (

        <div>             
            
            <Link to="/CWMselection" className = "generalbutton QuitMachine" onClick={() => exitGame(Player, setPlayer, ActiveGame[1], setCWMUser)}> 
                <div className="buttonNameContainer">Quit Machine <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

            <div className = "gameScreenLayout">
            
                <div className = "CWMSpaceOuterGameContainer">

                    <ClawBar
                        setButtonHit = {setButtonHit}
                        setResult = {setResult}
                        currentPosition = {currentPosition}
                    />

                    <div className="CWMSpaceGameBoardScreen">

                        <ClawWindow
                            buttonHit = {buttonHit}
                            clawWentDown = {clawWentDown}
                            setClawWentDown = {setClawWentDown}
                            currentPosition = {currentPosition}
                        />

                    </div>

                    {buttonHit == true ? (

                        clawWentDown == true ? (
                            
                            <Link to="/CWMspacesummary" className ="CWMSpaceButton CheckPrizeDoor" onClick = {() => claimPrize(result, setCWMUser, setPrize, Player, setPlayer, ActiveGame[1], [17, 18, 19, 20])}> 
                                <div className="buttonNameContainer">Check Prize Door<br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                            </Link>

                        ) : (

                            <button className ="CWMSpaceButtonGrabbed">
                                <div className="buttonNameContainer">Grab<br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                            </button>

                        )

                    ) : (

                        <button className ="CWMSpaceButton Grab" onClick = {() => clawGrab(currentPosition, setResult, setButtonHit)}>
                            <div className="buttonNameContainer">Grab<br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                        </button>
                
                    )}

                </div>

            </div>
            
        </div>

    );

}


export default SpaceGamescreen;