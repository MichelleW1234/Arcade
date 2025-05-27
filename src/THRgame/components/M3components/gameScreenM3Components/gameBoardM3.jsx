import { useEffect, useState, useRef } from 'react';
import AlienNormal from '../../../../Images/image 8.svg';
import AlienMutant from '../../../../Images/image 10.svg';
import LaserBeamNormal from '../../../../Images/image 9.svg';
import LaserBeamMutant from '../../../../Images/image 12.svg';

import {aliensIncomingM1andM3, newWave, alienKilledM3, laserBlaster} from "../../../helpers/THRhelpers.js";

import "./gameBoardM3.css";

function gameBoardM3({waveNumber, setWaveNumber, setThresholdBreached}) {

    const [laserValue, setLaserValue] = useState(14);
    const [laserPositions, setLaserPositions] = useState([[14, laserValue], [13, laserValue], [12, laserValue]]);
    const [alienPositions, setAlienPositions] = useState(newWave(3));
    const [mutantLaserOn, setMutantLaserOn] = useState(false);

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
            alienKilledM3(laserPositionsRef.current, alienPositionsRef.current, setAlienPositions, setWaveNumber, mutantLaserOn);
        }, 60);

        return () => clearInterval(interval);

    }, [mutantLaserOn]);

    /* Listener for wave rerendering */
    useEffect(() => {

        const interval = setInterval(() => {
            aliensIncomingM1andM3(setAlienPositions, alienPositionsRef.current, setThresholdBreached);
        }, 2000 - 200*waveNumber);

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
                            ([alienRow, alienCol, type]) => alienRow === rowIndex && alienCol === colIndex && type === 0
                        );

                        const isMutantAlienHere = alienPositions.some(
                            ([alienRow, alienCol, type]) => alienRow === rowIndex && alienCol === colIndex && type === 1
                        );

                        const isLaserHere = laserPositions.some(
                            ([laserRow, laserCol]) =>
                                laserRow === rowIndex && laserCol === colIndex
                        );


                        return (

                            isLaserHere ? (

                                mutantLaserOn === true ? (

                                    <div key={rowIndex + "," + colIndex} className="THRemptySpaceM3">
                                        <img src={LaserBeamMutant} alt="LaserBeamMutant" />
                                    </div>

                                ) : (

                                    <div key={rowIndex + "," + colIndex} className="THRemptySpaceM3">
                                        <img src={LaserBeamNormal} alt="LaserBeamNormal" />
                                    </div>

                                )

                            ) : isAlienHere ? (
                                
                                <div key={rowIndex + "," + colIndex} className="THRemptySpaceM3">
                                    <img src={AlienNormal} alt="AlienNormal" />
                                </div>

                            ) : isMutantAlienHere ? (
                                
                                <div key={rowIndex + "," + colIndex} className="THRemptySpaceM3">
                                    <img src={AlienMutant} alt="AlienMutant" />
                                </div>
                                
                            ): (

                                <div key={rowIndex + "," + colIndex} className="THRemptySpaceM3">
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

            {mutantLaserOn === true ? (

                <button className = "THRlaserSwitchMutant" onClick={() => setMutantLaserOn(false)}> Change Laser </button>

            ) : (

                <button className = "THRlaserSwitchNormal" onClick={() => setMutantLaserOn(true)} > Change Laser </button>

            )}

        </div>


    )

}
export default gameBoardM3