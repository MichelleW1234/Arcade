import { useEffect, useState, useRef } from 'react';
import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut";

import alienNormal from '../../../../Images/image 8.svg';
import alienShielded from '../../../../Images/image 11.svg';
import laserBeam from '../../../../Images/image 9.svg';

import { useSPIUser } from '../../../Providers/SPIUserProvider.jsx';

import "../../GameBoard.css";

import {aliensIncomingM2, newWave, alienKilledM2, laserBlaster, getRandomElements} from "../../../Helpers/helpers.js";


function M2GameBoard({waveNumber, setWaveNumber}) {

    const gameBoardMatrix = Array.from({ length: 15 }, () => Array(27).fill(0));

    const {SPIUser, setSPIUser} = useSPIUser();

    const [laserValue, setLaserValue] = useState(14);
    const [laserPositions, setLaserPositions] = useState([[14, laserValue], [13, laserValue], [12, laserValue]]);
    const [alienPositions, setAlienPositions] = useState(newWave(2));
    const [shieldedAliens, setShieldedAliens] = useState(getRandomElements(alienPositions, 3));

    
    useKeyboardShortcut("ArrowLeft", (event) => {
        if ( waveNumber <= 5 && SPIUser[2] === false){
            if (laserValue > 0){
                event.preventDefault();
                setLaserValue(prev => prev-1);
            }
        }
    },
        ".SPISlider"
    );

    
    useKeyboardShortcut("ArrowRight", (event) => {
        if ( waveNumber <= 5 && SPIUser[2] === false ){
            if (laserValue < 26){
                event.preventDefault();
                setLaserValue(prev => prev + 1);
            }
        }
    },
        ".SPISlider"
    );


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

    const waveIncremented = useRef(false);


    useEffect(() => {

        if (SPIUser[2] === true){

            return;

        }

        const interval = setInterval(() => {
            alienKilledM2(laserPositionsRef.current, alienPositionsRef.current, setAlienPositions, setWaveNumber, shieldedAliensRef.current, setShieldedAliens, waveIncremented);
        }, 60);

        return () => clearInterval(interval);

    }, [SPIUser]);


    useEffect(() => {

        if (SPIUser[2] === true){

            return;

        }

        const interval = setInterval(() => {
            aliensIncomingM2(setAlienPositions, alienPositionsRef.current, setSPIUser, setShieldedAliens);
        }, 2000 - 150*waveNumber);

        return () => clearInterval(interval);

    }, [waveNumber, SPIUser]);


    useEffect(() => {

        if (SPIUser[2] === true){

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
                    row.map((_, colIndex) => {

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

                            isLaserHere === true ? (

                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM2">
                                    <img src={laserBeam} alt = "" />
                                </div>

                            ) : isAlienHere === true ? (
                                
                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM2">
                                    <img src={alienNormal} alt = "" />
                                </div>

                            ) : isShieldedAlienHere === true ? (
                                
                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM2">
                                    <img src={alienShielded} alt = "" />
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

            <div className="largefont"> [&larr;] & [&rarr;]</div>

        </div>


    )

}
export default M2GameBoard