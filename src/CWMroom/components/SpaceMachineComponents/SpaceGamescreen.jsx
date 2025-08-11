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
            clawGrab(currentPosition, setResult, setButtonHit);

        } else if (clawWentDown == true){
            claimPrize(result, setCWMUser, setPrize, Player, setPlayer, ActiveGame[1], [17, 18, 19, 20]);
            navigate("/CWMspacesummary");
        }
    });

    useKeyboardShortcut("Escape", () => {
        exitGame(Player, setPlayer, ActiveGame[1], setCWMUser);
        navigate("/CWMselection");
    });





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
            
            <Link to="/CWMselection" className = "generalbutton" onClick={() => exitGame(Player, setPlayer, ActiveGame[1], setCWMUser)}> Quit Machine </Link>

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
                            
                            <Link to="/CWMspacesummary" className ="CWMSpaceButton" onClick = {() => claimPrize(result, setCWMUser, setPrize, Player, setPlayer, ActiveGame[1], [17, 18, 19, 20])}> Check Prize Door </Link>

                        ) : (

                            <button className ="CWMSpaceButtonGrabbed">Grab</button>

                        )

                    ) : (

                        <button className ="CWMSpaceButton" onClick = {() => clawGrab(currentPosition, setResult, setButtonHit)}>Grab</button>
                
                    )}

                </div>

            </div>
            
        </div>

    );

}


export default SpaceGamescreen;