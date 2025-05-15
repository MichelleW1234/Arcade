import { useState } from 'react';
import { Link } from 'react-router-dom';

import GameBoard from "./gameScreenComponents/gameBoard.jsx"
import "./GameScreen.css"

function gameScreen() {

    const [waveNumber, setWaveNumber] = useState(1);
    const [thresholdBreached, setThresholdBreached] = useState(false);

    return (

        <div>

            {waveNumber <= 10 && thresholdBreached == false ? (

                <div className = "screenLayout">

                    <div className="THRouterContainer">

                        <div className = "THRgameBoardSign"> Wave Number: {waveNumber}</div>

                        <GameBoard
                            waveNumber = {waveNumber}
                            setWaveNumber = {setWaveNumber}
                            setThresholdBreached = {setThresholdBreached}
                        />
                        
                    </div>

                </div>

            ): (

                <div className = "screenLayout">

                    <div className="THRouterContainer">

                        <div className = "THRgameBoardSign"> Game Over </div>

                        <div className = "THRendingScreen">
                            <h1> Game over!! </h1>
                        </div>

                        <Link to="/THRsummary" className = "generalbutton">
                            View Results
                        </Link>
                        
                    </div>

                </div>

            )}

        </div>

    )

}
export default gameScreen