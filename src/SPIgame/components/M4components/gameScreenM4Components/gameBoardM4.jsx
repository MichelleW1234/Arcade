import { useEffect, useState} from 'react';

import bossDanger from '../../../../Images/image 14.svg';
import bossNormal from '../../../../Images/image 13.svg';

import { useSPIUser } from '../../../Providers/SPIUserProvider.jsx';

import "./gameBoardM4.css";

import {newBossState, bossHit, newBossPosition} from "../../../helpers/SPIhelpers.js";


function gameBoardM4({setBossDefeated}) {
    
    //5 x 9 (90x90 pieces moving around the screen)
    const gameBoardMatrix = Array.from({ length: 4 }, () => Array(9).fill(0));
    const healthBar = Array(50).fill(0);

    const {SPIUser, setSPIUser} = useSPIUser();

    const [bossHealth, setBossHealth] = useState(50);
    const [bossState, setBossState] = useState([newBossPosition(), false]);

    /* Listener for boss posiiton rerendering and determining boss state*/
    useEffect(() => {
        const interval = setInterval(() => {
            newBossState(setBossState);
        }, 850);

        return () => clearInterval(interval);
    }, []);


    return (

        <div className = "SPIgameContainerM4">

            <div className = "SPIgameScreenM4"> 

                {gameBoardMatrix.map((row, rowIndex) => (
                    row.map((num, colIndex) => {

                        const isBossHere =
                            bossState[0][0] === rowIndex && bossState[0][1] === colIndex;

                        return (

                            isBossHere ? (

                                bossState[1] == true ? (

                                    <div
                                        key={rowIndex + "," + colIndex}
                                        className= "SPIemptySpaceBossDanger"
                                        onClick={() => setSPIUser(prev => [prev[0], prev[1], true])}
                                    >
                                        <img src={bossDanger} alt="bossDanger"/>
                                    </div>

                                ) : (

                                    <div
                                        key={rowIndex + "," + colIndex}
                                        className= "SPIemptySpaceBossNormal"
                                        onClick={() => bossHit(bossHealth, setBossHealth, setBossDefeated)}
                                    >
                                        <img src={bossNormal} alt="bossNormal"/>
                                    </div>

                                )

                            ) : (

                                <div
                                    key={rowIndex + "," + colIndex}
                                    className="SPIemptySpaceM4"
                                >
                                </div>

                            )
    
                        )

                    })
                ))}
                
            </div>

            <div className = "largefont"> Boss health bar: </div>

            <div className = "SPIhealthbarContainer">  
                {healthBar.map((_, colIndex) => (

                    bossHealth >= colIndex ? (

                        <div
                        key={colIndex}
                        className="SPIhealthLeft"
                        >
                        </div>

                    ) : (

                        <div
                        key={colIndex}
                        className="SPIhealthGone"
                        >
                        </div>

                    )

                ))}
            </div>

        </div>


    )

}

export default gameBoardM4