import { useEffect, useState, useRef } from 'react';
import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut";

import alienNormal from '../../../../Images/image 8.svg';
import laserBeam from '../../../../Images/image 9.svg';

import { useSPIUser } from '../../../Providers/SPIUserProvider.jsx';

import "../../GameBoard.css"

import {aliensIncomingM1andM3, newWave, alienKilledM1, laserBlaster} from "../../../Helpers/helpers.js";

function M1GameBoard({waveNumber, setWaveNumber, gameOver}) {

    const gameBoardMatrix = Array.from({ length: 15 }, () => Array(27).fill(0));

    const {setSPIUser} = useSPIUser();

    const [laserValue, setLaserValue] = useState(14);
    const [laserPositions, setLaserPositions] = useState([[14, laserValue], [13, laserValue], [12, laserValue]]);
    const [alienPositions, setAlienPositions] = useState(newWave(1));


    useKeyboardShortcut("ArrowLeft", (event) => {
        if (gameOver === false){
            if (laserValue > 0){
                event.preventDefault();
                setLaserValue(prev => prev-1);
            }
        }
    },
        ".SPISlider"
    );

    
    useKeyboardShortcut("ArrowRight", (event) => {
        if (gameOver === false){
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

    const waveIncremented = useRef(false);


    useEffect(() => {

        if (gameOver === true){

            return;

        }

        const interval = setInterval(() => {
            alienKilledM1(laserPositionsRef.current, alienPositionsRef.current, setAlienPositions, setWaveNumber, waveIncremented);
        }, 50);

        return () => clearInterval(interval);

    }, [gameOver]);


    useEffect(() => {

        if (gameOver === true){

            return;

        }

        const interval = setInterval(() => {
            aliensIncomingM1andM3(setAlienPositions, alienPositionsRef.current, setSPIUser);
        }, 2000 - 200*waveNumber);

        return () => clearInterval(interval);

    }, [waveNumber, gameOver]);

    
    useEffect(() => {

        if (gameOver === true){

            return;

        }

        const interval = setInterval(() => {
            laserBlaster(laserPositionsRef.current, setLaserPositions, laserValueRef.current);
        }, 80);

        return () => clearInterval(interval);

    }, [gameOver]);


    return (

        <div className = "SPIgameContainer">

            <div className = "SPIgameScreenM1"> 

                {gameBoardMatrix.map((row, rowIndex) => (
                    row.map((_, colIndex) => {

                        const isAlienHere = alienPositions.some(
                            ([alienRow, alienCol]) => alienRow === rowIndex && alienCol === colIndex
                        );

                        const isLaserHere = laserPositions.some(
                            ([laserRow, laserCol]) => laserRow === rowIndex && laserCol === colIndex
                        );

                        return (

                            isLaserHere === true ? (

                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM1">
                                    <img src={laserBeam} alt = "" />
                                </div>

                            ) : isAlienHere === true ? (

                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM1">
                                    <img src={alienNormal} alt = "" />
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

            <div className="largefont"> [&larr;] & [&rarr;]</div>

        </div>


    )

}
export default M1GameBoard;