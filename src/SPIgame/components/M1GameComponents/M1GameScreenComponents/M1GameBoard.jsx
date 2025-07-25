import { useEffect, useState, useRef } from 'react';

import AlienNormal from '../../../../Images/image 8.svg';
import LaserBeam from '../../../../Images/image 9.svg';

import { useSPIUser } from '../../../Providers/SPIUserProvider.jsx';

import "../../GameBoard.css"

import {aliensIncomingM1andM3, newWave, alienKilledM1, laserBlaster} from "../../../Helpers/helpers.js";

function M1GameBoard({waveNumber, setWaveNumber}) {

    //15 x 27 (30x30 pieces moving around the screen)
    const gameBoardMatrix = Array.from({ length: 15 }, () => Array(27).fill(0));

    const {SPIUser, setSPIUser} = useSPIUser();

    const [laserValue, setLaserValue] = useState(14);
    const [laserPositions, setLaserPositions] = useState([[14, laserValue], [13, laserValue], [12, laserValue]]);
    const [alienPositions, setAlienPositions] = useState(newWave(1));


    /* Refs avoid stale values and store the latest values for use inside 
    interval callbacks in useEffect without triggering re-renders*/

    const alienPositionsRef = useRef(alienPositions);
    useEffect(() => {
        alienPositionsRef.current = alienPositions;
    }, [alienPositions]);

    const laserPositionsRef = useRef(laserPositions);
    useEffect(() => {
        laserPositionsRef.current = laserPositions;
    }, [laserPositions]);

    const laserValueRef = useRef(laserValue);
    useEffect(() => {
        laserValueRef.current = laserValue;
    }, [laserValue]);


    /* Clear and restart their interval whenever anything in their dependency array changes
    so that callback always uses the current value */

    /*Listener for aliens being shot*/
    useEffect(() => {

        if (SPIUser[2] == true){

            return;

        }

        const interval = setInterval(() => {
            alienKilledM1(laserPositionsRef.current, alienPositionsRef.current, setAlienPositions, setWaveNumber);
        }, 50);

        return () => clearInterval(interval);

    }, [SPIUser]);


    /* Listener for wave rerendering */
    useEffect(() => {

        if (SPIUser[2] == true){

            return;

        }

        const interval = setInterval(() => {
            aliensIncomingM1andM3(setAlienPositions, alienPositionsRef.current, setSPIUser);
        }, 2000 - 200*waveNumber);

        return () => clearInterval(interval);

    }, [waveNumber, SPIUser]);

     /* Listener for laser rerendering */
    useEffect(() => {

        if (SPIUser[2] == true){

            return;

        }

        const interval = setInterval(() => {
            laserBlaster(laserPositionsRef.current, setLaserPositions, laserValueRef.current);
        }, 80);

        return () => clearInterval(interval);

    }, [SPIUser]);


    return (

        <div className = "SPIgameContainer">

            <div className = "SPIgameScreenM1"> 

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

                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM1">
                                    <img src={LaserBeam} alt="LaserBeam" />
                                </div>

                            ) : isAlienHere ? (

                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM1">
                                    <img src={AlienNormal} alt="Alien" />
                                </div>


                            ) : (

                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM1">
                                </div>
                    
                            )
                    
                        )

                    })
                ))}

                
            </div>

            <input className = "SPISlider"
                type="range"
                min="0"
                max="26"
                value={laserValue}
                onChange={(e) => setLaserValue(Number(e.target.value))}
            />

        </div>


    )

}
export default M1GameBoard;