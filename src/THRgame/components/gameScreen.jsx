import { useState } from 'react';

import GameBoard from "./gameScreenComponents/gameBoard.jsx"
import "./GameScreen.css"

function gameScreen() {

    const [waveNumber, setWaveNumber] = useState(0);
    const [thresholdBreached, setThresholdBreached] = useState(false);

    return (

        <div className = "screenLayout">

            <div className = "instructionsSign"> Wave Number: </div>

            {waveNumber < 10 && thresholdBreached == false ? (

                <div className="THRouterContainer">

                    <GameBoard
                        setWaveNumber = {setWaveNumber}
                        setThresholdBreached = {setThresholdBreached}
                    />
                    
                </div>

            ): (

                <div className="THRouterContainer">

                    <h1> Game over </h1>
                    
                </div>

            )}

        </div>

    )

}
export default gameScreen