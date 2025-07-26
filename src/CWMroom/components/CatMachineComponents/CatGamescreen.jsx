import { Link} from 'react-router-dom';
import React, { useState, useEffect, useRef} from "react";

import ClawBar from "../CWMGameComponents/ClawBar.jsx";
import ClawWindow from './CatGameComponents/CatClawWindow.jsx';

import {changePosition, clawGrab, claimPrize, exitGame} from "../../Helpers/helpers.js";

import { useCWMUser } from '../../Providers/CWMUserProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { usePrize} from '../../../Providers/PrizeProvider.jsx';

import "./CatGamescreen.css";

function CatGamescreen (){

    const { CWMUser, setCWMUser} = useCWMUser();
    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Prize, setPrize } = usePrize();

    const [buttonHit, setButtonHit] = useState(false);
    const [result, setResult] = useState(0);

    const [currentPosition, setCurrentPosition] = useState(0);
    const [direction, setDirection] = useState(1);

    const [clawWentDown, setClawWentDown] = useState(false);

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
            
            <Link to="/CWMselection" className = "generalbutton" onClick={() => exitGame(setPlayer, ActiveGame[1], setCWMUser)}> Quit Machine </Link>

            <div className = "gameScreenLayout">
            
                <div className = "CWMCatOuterGameContainer">

                    <ClawBar
                        setButtonHit = {setButtonHit}
                        setResult = {setResult}
                        currentPosition = {currentPosition}
                    />

                    <div className="CWMCatGameBoardScreen">

                        <ClawWindow
                            buttonHit = {buttonHit}
                            clawWentDown = {clawWentDown}
                            setClawWentDown = {setClawWentDown}
                            currentPosition = {currentPosition}
                        />

                    </div>

                    {buttonHit == true ? (

                        clawWentDown == true ? (
                            
                            <Link to="/CWMcatsummary" className ="CWMCatButton" onClick = {() => claimPrize(result, setCWMUser, setPrize, setPlayer, ActiveGame[1], [9, 10, 11, 12])}> Check Prize Door </Link>

                        ) : (

                            <button className ="CWMCatButton">Grab</button>

                        )

                    ) : (


                        <button className ="CWMCatButton" onClick = {() => clawGrab(currentPosition, setResult, setButtonHit)}>Grab</button>
                
                    )}

    
                </div>

            </div>
            
        </div>

    );

}


export default CatGamescreen;