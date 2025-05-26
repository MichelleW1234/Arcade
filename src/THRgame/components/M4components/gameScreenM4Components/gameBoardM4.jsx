import { useEffect, useState, useRef } from 'react';
import bossDanger from '../../../../Images/image 14.svg';
import bossNormal from '../../../../Images/image 13.svg';

import {newBossState, bossHit, newBossPosition} from "../../../helpers/THRhelpers.js";

import "./gameBoardM4.css";

function gameBoardM4({setBossDefeated, setKilled}) {

    const [bossHealth, setBossHealth] = useState(50);
    const [bossState, setBossState] = useState([newBossPosition(), false]);
    
    //5 x 9 (90x90 pieces moving around the screen)
    const gameBoardMatrix = Array.from({ length: 5 }, () => Array(9).fill(0));
    const healthBar = Array(50).fill(0);

    /* Listener for boss posiiton rerendering and determining boss state*/
    useEffect(() => {
        const interval = setInterval(() => {
            newBossState(setBossState);
        }, 850);

        return () => clearInterval(interval);
    }, []);


    return (

        <div className = "THRgameContainerM4">

            <div className = "THRgameScreenM4"> 

                {gameBoardMatrix.map((row, rowIndex) => (
                    row.map((num, colIndex) => {

                        const isBossHere =
                            bossState[0][0] === rowIndex && bossState[0][1] === colIndex;

                        return (

                            isBossHere ? (

                                bossState[1] == true ? (

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