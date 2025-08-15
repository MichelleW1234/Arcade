import { useEffect, useState, useRef } from 'react';
import useKeyboardShortcut from "../../../../hooks/useKeyboardShortcut";

import AlienNormal from '../../../../Images/image 8.svg';
import AlienMutant from '../../../../Images/image 10.svg';
import LaserBeamNormal from '../../../../Images/image 9.svg';
import LaserBeamMutant from '../../../../Images/image 12.svg';

import { useSPIUser } from '../../../Providers/SPIUserProvider.jsx';

import "../../GameBoard.css";

import {aliensIncomingM1andM3, newWave, alienKilledM3, laserBlaster} from "../../../Helpers/helpers.js";
import { playSound } from '../../../../Helpers/helpers.js';


function M3GameBoard({waveNumber, setWaveNumber}) {

    //15 x 27 (30x30 pieces moving around the screen)
    const gameBoardMatrix = Array.from({ length: 15 }, () => Array(27).fill(0));

    const {SPIUser, setSPIUser} = useSPIUser();

    const [laserValue, setLaserValue] = useState(14);
    const [laserPositions, setLaserPositions] = useState([[14, laserValue], [13, laserValue], [12, laserValue]]);
    const [alienPositions, setAlienPositions] = useState(newWave(3));
    const [mutantLaserOn, setMutantLaserOn] = useState(false);

    const LaserSwitchButtonRef = useRef(null);
    useKeyboardShortcut("Shift", () => {
        if (waveNumber <= 5 && SPIUser[2] == false){

            changeLaser();
        }
    },
        ".ChangeLaser"
    );

    useEffect(() => {
        LaserSwitchButtonRef.current?.focus();
    }, []);

    
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

    const waveIncremented = useRef(false);

    /* Clear and restart their interval whenever anything in their dependency array changes
    so that callback always uses the current value */

    /*Listener for aliens being shot*/
    useEffect(() => {

        if (SPIUser[2] == true){

            return;

        }

        const interval = setInterval(() => {
            alienKilledM3(laserPositionsRef.current, alienPositionsRef.current, setAlienPositions, setWaveNumber, waveIncremented, mutantLaserOn);
        }, 60);

        return () => clearInterval(interval);

    }, [mutantLaserOn, SPIUser]);

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

                                    <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM3">
                                        <img src={LaserBeamMutant} alt="LaserBeamMutant" />
                                    </div>

                                ) : (

                                    <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM3">
                                        <img src={LaserBeamNormal} alt="LaserBeamNormal" />
                                    </div>

                                )

                            ) : isAlienHere ? (
                                
                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM3">
                                    <img src={AlienNormal} alt="AlienNormal" />
                                </div>

                            ) : isMutantAlienHere ? (
                                
                                <div key={rowIndex + "," + colIndex} className="SPIemptySpaceM3">
                                    <img src={AlienMutant} alt="AlienMutant" />
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
                onPointerUp={() => LaserSwitchButtonRef.current?.focus()}
                onPointerCancel={() => LaserSwitchButtonRef.current?.focus()}
                onPointerLeave={() => LaserSwitchButtonRef.current?.focus()}
            />

            <button ref = {LaserSwitchButtonRef} className={mutantLaserOn ? "SPIlaserButtonMutant ChangeLaser" : "SPIlaserButtonNormal ChangeLaser"} onClick={() => changeLaser()}> 
                <div className="buttonNameContainer"> Change Laser <br/> <span className = "buttonKeyDescription"> [Shift] </span></div>
            </button>

        </div>


    )

}
export default M3GameBoard;