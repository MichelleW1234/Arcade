import { useNavigate, Link} from 'react-router-dom';
import { useState, useEffect, useRef} from "react";
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";

import ClawBar from "../CWMGameComponents/ClawBar.jsx";
import ClawWindow from './SportsGameComponents/SportsClawWindow.jsx';

import {changePosition, clawGrab, claimPrize, exitGame} from "../../Helpers/helpers.js";

import { useCWMUser } from '../../Providers/CWMUserProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { usePrize} from '../../../Providers/PrizeProvider.jsx';

import "./SportsGamescreen.css";

function SportsGamescreen (){

    const { CWMUser, setCWMUser} = useCWMUser();
    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Prize, setPrize } = usePrize();

    const [buttonHit, setButtonHit] = useState(false);
    const [result, setResult] = useState(0);

    const [currentPosition, setCurrentPosition] = useState(0);
    const [direction, setDirection] = useState(1);

    const [clawWentDown, setClawWentDown] = useState(false);


    const clawGrabRef = useRef(null);
    useKeyboardShortcut("Enter", () => {
        clawGrabRef.current?.click();
    });


    const navigate = useNavigate();
    useKeyboardShortcut("Enter", () => {
        if (clawWentDown == true){
            claimPrize(result, setCWMUser, setPrize, Player, setPlayer, ActiveGame[1], [13, 14, 15, 16]);
            navigate("/CWMsportssummary");
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
            
                <div className = "CWMSportsOuterGameContainer">

                    <ClawBar
                        setButtonHit = {setButtonHit}
                        setResult = {setResult}
                        currentPosition = {currentPosition}
                    />

                    <div className="CWMSportsGameBoardScreen">

                        <ClawWindow
                            buttonHit = {buttonHit}
                            clawWentDown = {clawWentDown}
                            setClawWentDown = {setClawWentDown}
                            currentPosition = {currentPosition}
                        />

                    </div>

                    {buttonHit == true ? (

                        clawWentDown == true ? (
                            
                            <Link to="/CWMsportssummary" className ="CWMSportsButton" onClick = {() => claimPrize(result, setCWMUser, setPrize, Player, setPlayer, ActiveGame[1], [13, 14, 15, 16])}> Check Prize Door </Link>

                        ) : (

                            <button className ="CWMSportsButton">Grab</button>

                        )

                    ) : (


                        <button ref = {clawGrabRef} className ="CWMSportsButton" onClick = {() => clawGrab(currentPosition, setResult, setButtonHit)}>Grab</button>
                

                    )}
    
                </div>

            </div>
            
        </div>

    );

}


export default SportsGamescreen;