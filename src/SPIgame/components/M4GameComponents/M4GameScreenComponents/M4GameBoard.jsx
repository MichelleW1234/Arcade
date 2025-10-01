import { useEffect, useState} from 'react';

import bossDanger from '../../../../Images/image 14.svg';
import bossNormal from '../../../../Images/image 13.svg';

import { useSPIUser } from '../../../Providers/SPIUserProvider.jsx';

import "./M4GameBoard.css";

import {newBossState, newBossPosition} from "../../../Helpers/helpers.js";

import {playSound} from '../../../../Helpers/helpers.js';

function M4GameBoard({setBossDefeated, setBlownUp, gameOver}) {
    
    const gameBoardMatrix = Array.from({ length: 5 }, () => Array(7).fill(0));
    const healthBar = Array(50).fill(0);

    const {setSPIUser} = useSPIUser();

    const [bossHealth, setBossHealth] = useState(50);
    const [bossState, setBossState] = useState([newBossPosition(), false]);

  
    
    useEffect(() => {

        if (gameOver === true){

            return;

        }

        const interval = setInterval(() => {
            newBossState(setBossState);
        }, 850);

        return () => clearInterval(interval);

    }, [gameOver]);



    const bossHit = () =>  {

        setBossHealth(prev => prev - 1);

    }


    useEffect(() => {

        if (bossHealth <= 0) {

            setBossDefeated(true);
            playSound(20);

        } else if (bossHealth < 50){

            playSound(8);

        }

    }, [bossHealth]);


    const exploded = () =>  {

        setSPIUser(prev => [prev[0], prev[1], true]);
        setBlownUp(true);
        playSound(11);

    }

    return (

        <div className = "SPIgameContainer">

            <div className = "SPIgameScreenM4"> 

                {gameBoardMatrix.map((row, rowIndex) => (
                    row.map((_, colIndex) => {

                        const isBossHere = bossState[0][0] === rowIndex && bossState[0][1] === colIndex;

                        return (

                            isBossHere === true ? (

                                bossState[1] === true ? (

                                    <div
                                        key={rowIndex + "," + colIndex}
                                        className= "SPIemptySpaceBossDanger"
                                        onClick={() => exploded()}
                                    >
                                        <img src={bossDanger} alt = ""/>
                                    </div>

                                ) : (

                                    <div
                                        key={rowIndex + "," + colIndex}
                                        className= "SPIemptySpaceBossNormal"
                                        onClick={() => bossHit()}
                                    >
                                        <img src={bossNormal} alt = ""/>
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

                    <div
                    key={colIndex}
                    className={bossHealth > colIndex ? "SPIhealthLeft" : "SPIhealthGone"}
                    >
                    </div>

                ))}
            </div>

        </div>


    )

}

export default M4GameBoard;