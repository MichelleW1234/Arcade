import { useEffect, useState} from 'react';

import bossDanger from '../../../../Images/image 14.svg';
import bossNormal from '../../../../Images/image 13.svg';

import { useSPIUser } from '../../../Providers/SPIUserProvider.jsx';

import "./M4GameBoard.css";

import {newBossState, bossHit, newBossPosition} from "../../../Helpers/helpers.js";

import {playSound} from '../../../../Helpers/helpers.js';

function M4GameBoard({setBossDefeated, setBlownUp}) {
    
    //5 x 9 (90x90 pieces moving around the screen)
    const gameBoardMatrix = Array.from({ length: 5 }, () => Array(7).fill(0));
    const healthBar = Array(50).fill(0);

    const {SPIUser, setSPIUser} = useSPIUser();

    const [bossHealth, setBossHealth] = useState(50);
    const [bossState, setBossState] = useState([newBossPosition(), false]);

  
    /* Clear and restart their interval whenever anything in their dependency array changes
    so that callback always uses the current value */

    /* Listener for boss position rerendering and determining boss state*/
    useEffect(() => {

        if (SPIUser[2] == true){

            return;

        }

        const interval = setInterval(() => {
            newBossState(setBossState);
        }, 850);

        return () => clearInterval(interval);
    }, [SPIUser]);

    const exploded = () =>  {

        setSPIUser(prev => [prev[0], prev[1], true]);
        setBlownUp(true);
        playSound(11);

    }

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
                                        onClick={() => exploded()}
                                    >
                                        <img src={bossDanger} alt="bossDanger"/>
                                    </div>

                                ) : (

                                    <div
                                        key={rowIndex + "," + colIndex}
                                        className= "SPIemptySpaceBossNormal"
                                        onClick={() => bossHit(setBossHealth, setBossDefeated)}
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

            <div className = "largefont"> Queen HP Bar: </div>

            <div className = "SPIhealthbarContainer">  
                {healthBar.map((_, colIndex) => (

                    bossHealth > colIndex ? (

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

export default M4GameBoard;