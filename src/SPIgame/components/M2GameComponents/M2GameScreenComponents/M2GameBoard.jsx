import { useEffect, useState, useRef } from 'react';

import AlienNormal from '../../../../Images/image 8.svg';
import AlienShielded from '../../../../Images/image 11.svg';
import LaserBeam from '../../../../Images/image 9.svg';

import { useSPIUser } from '../../../Providers/SPIUserProvider.jsx';

import "../../GameBoard.css";

import {aliensIncomingM2, newWave, alienKilledM2, laserBlaster, getRandomElements} from "../../../Helpers/helpers.js";


function M2GameBoard({waveNumber, setWaveNumber}) {

    //15 x 27 (30x30 pieces moving around the screen)
    const gameBoardMatrix = Array.from({ length: 15 }, () => Array(27).fill(0));

    const {SPIUser, setSPIUser} = useSPIUser();

    const [laserValue, setLaserValue] = useState(14);
    const [laserPositions, setLaserPositions] = useState([[14, laserValue], [13, laserValue], [12, laserValue]]);
    const [alienPositions, setAlienPositions] = useState(newWave(2));
    const [shieldedAliens, setShieldedAliens] = useState(getRandomElements(alienPositions, 3));

    
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
    
    const shieldedAliensRef = useRef(shieldedAliens);
    useEffect(() => {
        shieldedAliensRef.current = shieldedAliens;
    }, [shieldedAliens]);


    /* Clear and restart their interval whenever anything in their dependency array changes
    so that callback always uses the current value */

    /*Listener for aliens being shot*/
    useEffect(() => {

        if (SPIUser[2] == true){

            return;

        }

        const interval = setInterval(() => {
            alienKilledM2(laserPositionsRef.current, alienPositionsRef.current, setAlienPositions, setWaveNumber, shieldedAliensRef.current, setShieldedAliens);
        }, 60);

        return () => clearInterval(interval);

    }, [SPIUser]);

    /* Listener for wave rerendering */
    useEffect(() => {

        if (SPIUser[2] == true){

            return;

        }

        const interval = setInterval(() => {
            aliensIncomingM2(setAlienPositions, alienPositionsRef.current, setSPIUser, setShieldedAliens);
        }, 2000 - 150*waveNumber);

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

            <div className = "SPIgameScreenM2"> 

                {gameBoardMatrix.map((row, rowIndex) => (
                    row.map((num, colIndex) => {

                        const isAlienHere = alienPositions.some(
                            ([alienRow, alienCol]) => 
                                alienRow === rowIndex && 
                                alienCol === colIndex && 
                                !shieldedAliens.some(
                                    ([shieldedRow, shieldedCol]) => shieldedRow === alienRow && shieldedCol === alienCol
                                )
                        );

                        const isShieldedAlienHere = alienPositions.some(
                            ([alienRow, alienCol]) => 
                                alienRow === rowIndex && 
                                alienCol === colIndex && 
                                shieldedAliens.some(
                                    ([shieldedRow, shieldedCol]) => shieldedRow === alienRow && shieldedCol === alienCol
                                )
                        );

                        const isLaserHere = laserPositions.some(
                            ([laserRow, laserCol]) =>
                                laserRow === rowIndex && laserCol === colIndex
                        );


                        return (

                            isLaserHere ? (

                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM2">
                                    <img src={LaserBeam} alt="LaserBeam" />
                                </div>

                            ) : isAlienHere ? (
                                
                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM2">
                                    <img src={AlienNormal} alt="AlienNormal" />
                                </div>

                            ) : isShieldedAlienHere ? (
                                
                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM2">
                                    <img src={AlienShielded} alt="AlienShielded" />
                                </div>
                                
                                
                            ): (

                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM2">
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
export default M2GameBoard