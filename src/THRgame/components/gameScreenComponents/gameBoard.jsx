import "./gameBoard.css"
import { useEffect, useState } from 'react';

import {aliensIncoming, alienKilled, checkButtonClicked} from "../../Helpers/THRhelpers.js";

function gameBoard({setWaveNumber, setThresholdBreached}) {

    const [laserValue, setLaserValue] = useState(14);
    const [laserBlasted, setLaserBlasted] = useState(-1);

    //15 x 27 (30x30 pieces moving around the screen)
    const gameBoardMatrix = Array.from({ length: 15 }, () => Array(27).fill(0));
    const [alienPositions, setAlienPositions] = useState([[0,0], [0,5], [0,9], [0,15], [0, 20]]);

    /*Listener for lasers being shot*/
    useEffect(() => {

        const interval = setInterval(() => {
            checkButtonClicked(laserBlasted, setLaserBlasted);
            alienKilled(laserBlasted, alienPositions, setAlienPositions, setWaveNumber);

        }, 100);

        return () => clearInterval(interval);

    }, [laserBlasted, laserValue, alienPositions]);

    /* Wave rerendering */
    useEffect(() => {

        const interval = setInterval(() => {

            aliensIncoming(setAlienPositions, alienPositions, setThresholdBreached);

        }, 1000);

        return () => clearInterval(interval);

    }, [alienPositions]);


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