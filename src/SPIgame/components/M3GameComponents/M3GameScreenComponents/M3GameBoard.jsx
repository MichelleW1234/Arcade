import { useEffect, useState, useRef } from 'react';
import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut";

import alienNormal from '../../../../Images/image 8.svg';
import alienMutant from '../../../../Images/image 10.svg';
import laserBeamNormal from '../../../../Images/image 9.svg';
import laserBeamMutant from '../../../../Images/image 12.svg';

import { useSPIUser } from '../../../Providers/SPIUserProvider.jsx';

import "../../GameBoard.css";

import {aliensIncomingM1andM3, newWave, alienKilledM3, laserBlaster} from "../../../Helpers/helpers.js";
import { playSound } from '../../../../Helpers/helpers.js';


function M3GameBoard({waveNumber, setWaveNumber, gameOver}) {

    const gameBoardMatrix = Array.from({ length: 15 }, () => Array(27).fill(0));

    const {setSPIUser} = useSPIUser();

    const [laserValue, setLaserValue] = useState(14);
    const [laserPositions, setLaserPositions] = useState([[14, laserValue], [13, laserValue], [12, laserValue]]);
    const [alienPositions, setAlienPositions] = useState(newWave(3));
    const [mutantLaserOn, setMutantLaserOn] = useState(false);

    const laserSwitchButtonRef = useRef(null);
    useKeyboardShortcut("Shift", () => {
        if (gameOver === false){
            changeLaser();
        }
    },
        ".ChangeLaser"
    );

    useEffect(() => {
        laserSwitchButtonRef.current?.focus();
    }, []);

    useKeyboardShortcut("Enter", (event) => {
        if (gameOver === false){
            event.preventDefault();
        }
    });


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
            alienKilledM3(laserPositionsRef.current, alienPositionsRef.current, setAlienPositions, setWaveNumber, waveIncremented, mutantLaserOn);
        }, 60);

        return () => clearInterval(interval);

    }, [mutantLaserOn, gameOver]);


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



    const changeLaser = () => {

        if (mutantLaserOn === false) {

            setMutantLaserOn(true);

        } else {

            setMutantLaserOn(false);

        }

        playSound(22);

    }


    return (

        <div className = "SPIgameContainer">

            <div className = "SPIgameScreenM3"> 

                {gameBoardMatrix.map((row, rowIndex) => (
                    row.map((_, colIndex) => {


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

                            isLaserHere === true ? (

                                mutantLaserOn === true ? (

                                    <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM3">
                                        <img src={laserBeamMutant} alt = "" />
                                    </div>

                                ) : (

                                    <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM3">
                                        <img src={laserBeamNormal} alt = "" />
                                    </div>

                                )

                            ) : isAlienHere === true ? (
                                
                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM3">
                                    <img src={alienNormal} alt = "" />
                                </div>

                            ) : isMutantAlienHere === true ? (
                                
                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM3">
                                    <img src={alienMutant} alt = "" />
                                </div>
                                
                            ): (

                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM3">
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
                onPointerUp={() => laserSwitchButtonRef.current?.focus()}
                onPointerCancel={() => laserSwitchButtonRef.current?.focus()}
                onPointerLeave={() => laserSwitchButtonRef.current?.focus()}
            />

            <div className="largefont"> [&larr;] & [&rarr;]</div>

            <button ref = {laserSwitchButtonRef} className={mutantLaserOn === true ? "SPIlaserButtonMutant ChangeLaser" : "SPIlaserButtonNormal ChangeLaser"} onClick={() => changeLaser()}> 
                <div className="buttonNameContainer"> Change Laser <br/> <span className = "buttonKeyDescription"> [Shift] </span></div>
            </button>

        </div>


    )

}
export default M3GameBoard;