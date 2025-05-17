import "./gameBoard.css"
import { useEffect, useState, useRef } from 'react';

import {aliensIncoming, alienKilled, newWave, laserBlaster} from "../../Helpers/THRhelpers.js";

function gameBoard({waveNumber, setWaveNumber, setThresholdBreached}) {

    const [laserValue, setLaserValue] = useState(14);
    const [laserPositions, setLaserPositions] = useState([[14, laserValue], [13, laserValue], [12, laserValue]]);
    const [alienPositions, setAlienPositions] = useState(newWave());

    //15 x 27 (30x30 pieces moving around the screen)
    const gameBoardMatrix = Array.from({ length: 15 }, () => Array(27).fill(0));


    /*Listener for current alien positions*/
    const alienPositionsRef = useRef(alienPositions);
    useEffect(() => {
        alienPositionsRef.current = alienPositions;
    }, [alienPositions]);

    /*Listener for current laser positions*/
    const laserPositionsRef = useRef(laserPositions);
    useEffect(() => {
        laserPositionsRef.current = laserPositions;
    }, [laserPositions]);

     /*Listener for current laser positions*/
    const laserValueRef = useRef(laserValue);
    useEffect(() => {
        laserValueRef.current = laserValue;
    }, [laserValue]);


    /*Listener for aliens being shot*/
    useEffect(() => {

        const interval = setInterval(() => {
            alienKilled(laserPositionsRef.current, alienPositionsRef.current, setAlienPositions, setWaveNumber);
        }, 50);

        return () => clearInterval(interval);

    }, []);


    /* Listener for wave rerendering */
    useEffect(() => {

        const interval = setInterval(() => {
            aliensIncoming(setAlienPositions, alienPositionsRef.current, setThresholdBreached);
        }, 3000/waveNumber);

        return () => clearInterval(interval);

    }, [waveNumber]);

     /* Listener for laser rerendering */
    useEffect(() => {

        const interval = setInterval(() => {
            laserBlaster(laserPositionsRef.current, setLaserPositions, laserValueRef.current);
        }, 80);

        return () => clearInterval(interval);

    }, []);


    return (

        <div className = "THRgameContainer">

            <div className = "THRgameScreen"> 

                {gameBoardMatrix.map((row, rowIndex) => (
                    row.map((num, colIndex) => {

                        const isAlienHere = alienPositions.some(
                            ([alienRow, alienCol]) => alienRow === rowIndex && alienCol === colIndex
                        );

                        const isLaserHere = laserPositions.some(
                            ([laserRow, laserCol]) => laserRow === rowIndex && laserCol === colIndex
                        );

                        return (

                            isLaserHere ? (

                                <div key={rowIndex + "," + colIndex} className="THRlaserSpace">

                                </div>

                            ) : isAlienHere ? (

                                <div key={rowIndex + "," + colIndex} className="THRalienSpace">

                                </div>


                            ) : (

                                <div key={rowIndex + "," + colIndex} className="THRemptySpace">

                                </div>
                    
                            )
                    
                        )

                    })
                ))}

                
            </div>

            <input className = "THRSlider"
                type="range"
                min="0"
                max="26"
                value={laserValue}
                onChange={(e) => setLaserValue(Number(e.target.value))}
            />

        </div>


    )

}
export default gameBoard