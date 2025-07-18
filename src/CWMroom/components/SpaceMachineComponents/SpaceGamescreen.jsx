import { Link} from 'react-router-dom';
import React, { useState, useEffect, useRef} from "react";

import ClawBar from "../CWMGameComponents/ClawBar.jsx";
import ClawWindow from './SpaceGameComponents/SpaceClawWindow.jsx';

import {playSound} from "../../../Helpers/helpers.js";
import {changePosition, clawGrab, chooseSpaceElement} from "../../Helpers/helpers.js";

import { useCWMUser } from '../../Providers/CWMUserProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { usePrize} from '../../../Providers/PrizeProvider.jsx';

import "./SpaceGamescreen.css";

function Gamescreen (){

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

            return

        }

        const interval = setInterval(() => {

            changePosition(currentPositionRef.current, setCurrentPosition, directionRef.current, setDirection);

        }, 30);

        return () => clearInterval(interval);

    }, [buttonHit]);


    const claimPrize = () => {

        if (result == 1){

            const space = chooseSpaceElement();
            setCWMUser([space]);

            if (space == 1){

                setPrize(prev => {
                    const newArray = prev.map(row => [...row]); // Deep copy
                    newArray[9][0] = "X";                         // Update the value
                    newArray[9][1] -= 1;
                    return newArray;
                });

            } else if (space == 2){

                setPrize(prev => {
                    const newArray = prev.map(row => [...row]); // Deep copy
                    newArray[10][0] = "X";                      // Update the value
                    newArray[10][1] -= 1;
                    return newArray;
                });

            } else if (space == 3){

                setPrize(prev => {
                    const newArray = prev.map(row => [...row]); // Deep copy
                    newArray[11][0] = "X";                       // Update the value
                    newArray[11][1] -= 1;
                    return newArray;
                });

            } else {

                setPrize(prev => {
                    const newArray = prev.map(row => [...row]); // Deep copy
                    newArray[12][0] = "X";                       // Update the value
                    newArray[12][1] -= 1;
                    return newArray;
                });

            }

        }

        setPlayer(([current, prev]) => [current - ActiveGame[1], current]);
        playSound(2);

    }

    const exitGame = () => {
    
        playSound(4);
        setPlayer(([current, prev]) => [current - ActiveGame[1], current]);

    }


    return (

        <div>             
            
            <Link to="/CWMselection" className = "generalbutton" onClick={() => exitGame()}> Quit Machine </Link>

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
                            
                            <Link to="/CWMspacesummary" className ="CWMSpaceButton" onClick = {() => claimPrize()}> Check Prize Door </Link>

                        ) : (

                            <button className ="CWMSpaceButton">Grab</button>

                        )

                    ) : (

                        <button className ="CWMSpaceButton" onClick = {() => clawGrab(currentPosition, setResult, setButtonHit)}>Grab</button>
                
                    )}

    
                </div>

            </div>
        </div>

    );

}


export default Gamescreen;