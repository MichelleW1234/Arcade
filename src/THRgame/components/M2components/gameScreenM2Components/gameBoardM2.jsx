import { useEffect, useState, useRef } from 'react';
import AlienNormal from '../../../../Images/image 8.svg';
import AlienMutant from '../../../../Images/image 10.svg';
import LaserBeam from '../../../../Images/image 9.svg';


import {aliensIncoming, newWave, alienKilledM2, laserBlasterM2} from "../../../helpers/THRhelpers.js";

import "./gameBoardM2.css";

function gameBoardM2({waveNumber, setWaveNumber, setThresholdBreached}) {

    const [laserValue, setLaserValue] = useState(14);
    const [laserPositions, setLaserPositions] = useState([[[14, laserValue], [13, laserValue], [12, laserValue], []]]);
    const [alienPositions, setAlienPositions] = useState(newWave(2));

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
            alienKilledM2(laserPositionsRef.current, alienPositionsRef.current, setLaserPositions, setAlienPositions, setWaveNumber);
        }, 60);

        return () => clearInterval(interval);

    }, []);

    /* Listener for wave rerendering */
    useEffect(() => {

        const interval = setInterval(() => {
            aliensIncoming(setAlienPositions, alienPositionsRef.current, setThresholdBreached);
        }, 3500/waveNumber);

        return () => clearInterval(interval);

    }, [waveNumber]);

     /* Listener for laser rerendering */
    useEffect(() => {

        const interval = setInterval(() => {
            laserBlasterM2(laserPositionsRef.current, setLaserPositions, laserValueRef.current);
        }, 80);

        return () => clearInterval(interval);

    }, []);


    return (

        <div className = "THRgameContainer">

            <div className = "THRgameScreen"> 

                {gameBoardMatrix.map((row, rowIndex) => (
                    row.map((num, colIndex) => {

                        const isAlienNormalHere = alienPositions.some(
                            ([alienRow, alienCol, hitCount, type]) => alienRow === rowIndex && alienCol === colIndex && type === 1
                        );

                        const isAlienMutantHere = alienPositions.some(
                            ([alienRow, alienCol, hitCount, type]) => alienRow === rowIndex && alienCol === colIndex && type === 2
                        );

                        const isLaserHere = laserPositions.some(laser =>
                            laser.some(element => 
                                element.length === 2 &&   
                                element[0] === rowIndex && 
                                element[1] === colIndex
                            )
                        );

                        return (

                            isLaserHere ? (

                                <div key={rowIndex + "," + colIndex} className="THRemptySpace">
                                    <img src={LaserBeam} alt="LaserBeam" />
                                </div>

                            ) : isAlienNormalHere ? (

                                
                                <div key={rowIndex + "," + colIndex} className="THRemptySpace">
                                    <img src={AlienNormal} alt="AlienNormal" />
                                </div>


                            ) : isAlienMutantHere ? (

                                <div key={rowIndex + "," + colIndex} className="THRemptySpace">
                                    <img src={AlienMutant} alt="AlienMutant" />
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
export default gameBoardM2