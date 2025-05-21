import { useState } from 'react';
import { Link } from 'react-router-dom';

import GameBoard from "./gameScreenM1Components/gameBoard.jsx"

import { useTHRUser } from '../../Providers/THRUserProvider.jsx';
import {unlockNextMission} from "../../helpers/THRhelpers.js"

import "./gameScreenM1.css"

function gameScreen() {

    const {THRUser, setTHRUser} = useTHRUser();

    const [waveNumber, setWaveNumber] = useState(1);
    const [thresholdBreached, setThresholdBreached] = useState(false);

    return (

        <div>

            {waveNumber <= 5 && thresholdBreached == false ? (

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

                            {thresholdBreached == true ? (

                                <h1> You died. </h1>

                            ) : (

                                <h1> You survived! Great job! </h1>

                            )}
                            
                        </div>
                        
                    </div>

                    {thresholdBreached == true ? (

                        <Link to="/THRsummary" className = "generalbutton">
                            View Game Summary
                        </Link>
                    
                    ) : (

                        <Link to="/THRmission" className = "generalbutton" onClick = {() => unlockNextMission(THRUser, setTHRUser)}>
                            Continue
                        </Link>

                    )}

                </div>

            )}

        </div>

    )

}

export default gameScreen