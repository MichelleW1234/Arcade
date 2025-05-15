import "./gameBoard.css"
import { useEffect, useState, useRef } from 'react';

import {aliensIncoming, alienKilled, checkButtonClicked, newWave} from "../../Helpers/THRhelpers.js";

function gameBoard({waveNumber, setWaveNumber, setThresholdBreached}) {

    const [laserValue, setLaserValue] = useState(14);
    const [laserBlasted, setLaserBlasted] = useState(-1);

    //15 x 27 (30x30 pieces moving around the screen)
    const gameBoardMatrix = Array.from({ length: 15 }, () => Array(27).fill(0));
    const [alienPositions, setAlienPositions] = useState(newWave);


    /*Listener for current alien positions*/
    const alienPositionsRef = useRef(alienPositions);
    useEffect(() => {
        alienPositionsRef.current = alienPositions;
    }, [alienPositions]);

    /*Listener for lasers being shot*/
    useEffect(() => {

        const interval = setInterval(() => {
            checkButtonClicked(laserBlasted, setLaserBlasted);
            alienKilled(laserBlasted, alienPositionsRef.current, setAlienPositions, setWaveNumber);
        }, 100);

        return () => clearInterval(interval);

    }, [laserBlasted]);


    /* Listener for wave rerendering */
    useEffect(() => {

        const interval = setInterval(() => {
            aliensIncoming(setAlienPositions, alienPositionsRef.current, setThresholdBreached);
        }, 2000/waveNumber);

        return () => clearInterval(interval);

    }, [waveNumber]);


    return (

        <div className = "THRgameContainer">

            <div className = "THRgameScreen"> 

                {gameBoardMatrix.map((row, rowIndex) => (
                    row.map((num, colIndex) => {

                        const isAlienHere = alienPositions.some(
                            ([alienRow, alienCol]) => alienRow === rowIndex && alienCol === colIndex
                        );

                        let isLaserHere;
                        if (laserBlasted != -1){

                            isLaserHere = laserValue === colIndex;

                        }
                          
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

            <button className = "THRFirebutton" onClick={() => setLaserBlasted(laserValue)}> Fire </button>

        </div>


    )

}
export default gameBoard