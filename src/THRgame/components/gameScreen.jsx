import { useState } from 'react';
import { Link } from 'react-router-dom';

import GameBoard from "./gameScreenComponents/gameBoard.jsx"
import "./GameScreen.css"

function gameScreen() {

    const [waveNumber, setWaveNumber] = useState(1);
    const [thresholdBreached, setThresholdBreached] = useState(false);

    return (

        <div className = "screenLayout">

            <div className = "instructionsSign"> Wave Number: {waveNumber}</div>

            {waveNumber <= 10 && thresholdBreached == false ? (

                <div className="THRouterContainer">

                    <GameBoard
                        setWaveNumber = {setWaveNumber}
                        setThresholdBreached = {setThresholdBreached}
                    />
                    
                </div>

            ): (

                <div className="THRouterContainer">

                    <div className = "THRendingScreen">
                        <h1> Game over </h1>
                    </div>

                    <Link to="/THRsummary" className = "generalbutton">
                        View Results
                    </Link>
                    
                </div>

            )}

        </div>

    )

}
export default gameScreen