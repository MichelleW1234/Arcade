import { useEffect, useState, useRef } from 'react';
import bossNormal from '../../../../Images/image 14.svg';
import bossDanger from '../../../../Images/image 13.svg';

import {bossMove, bossHit, newBossPosition} from "../../../helpers/THRhelpers.js";

import "./gameBoardM4.css";

function gameBoardM4({setBossDefeated, setKilled}) {

    const [bossPosition, setBossPosition] = useState(newBossPosition());
    const [bossHealth, setBossHealth] = useState(50);
    const [bossState, setBossState] = useState(false);
    
    //5 x 9 (90x90 pieces moving around the screen)
    const gameBoardMatrix = Array.from({ length: 5 }, () => Array(9).fill(0));
    const healthBar = Array(50).fill(0);

    /* Listener for boss posiiton rerendering and determining boss state*/
    useEffect(() => {
        const interval = setInterval(() => {
            bossMove(setBossPosition);

            const value = Math.floor(Math.random() * 5);
            if (value < 3){

                setBossState(false);

            } else {

                setBossState(true);

            }

        }, 800);

        return () => clearInterval(interval);
    }, []);


    return (

        <div className = "THRgameContainerM4">

            <div className = "THRgameScreenM4"> 

                {gameBoardMatrix.map((row, rowIndex) => (
                    row.map((num, colIndex) => {

                        const isBossHere = bossPosition[0] === rowIndex && bossPosition[1] === colIndex

                        return (

                            isBossHere ? (

                                bossState == true ? (

                                    <div
                                        key={rowIndex + "," + colIndex}
                                        className= "THRemptySpaceM4"
                                        onClick={() => setKilled(true)}
                                    >
                                        <img src={bossDanger} alt="bossDanger"/>
                                    </div>


                                ) : (

                                    <div
                                        key={rowIndex + "," + colIndex}
                                        className= "THRemptySpaceM4"
                                        onClick={() => bossHit(bossHealth, setBossHealth, setBossDefeated)}
                                    >
                                        <img src={bossNormal} alt="bossNormal"/>
                                    </div>


                                )

                            ) : (

                                <div
                                    key={rowIndex + "," + colIndex}
                                    className="THRemptySpaceM4"
                                >
                                </div>

                            )
    
                        )

                    })
                ))}
                
            </div>

            <div className = "largefont"> Boss health bar: </div>

            <div className = "THRhealthbarContainer">  
                {healthBar.map((_, colIndex) => (

                    bossHealth >= colIndex ? (

                        <div
                        key={colIndex}
                        className="THRhealthLeft"
                        >
                        </div>

                    ) : (

                        <div
                        key={colIndex}
                        className="THRhealthGone"
                        >
                        </div>

                    )

                ))}
            </div>

        </div>


    )

}

export default gameBoardM4