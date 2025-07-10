import { useState } from 'react';
import { Link } from 'react-router-dom';

import GameBoardM1 from "./M1GameScreenComponents/M1GameBoard.jsx";

import { useSPIUser } from '../../Providers/SPIUserProvider.jsx';
import {unlockNextMission} from "../../Helpers/helpers.js";

import "../Gamescreen.css";

function M1GameScreen() {

    const {SPIUser, setSPIUser} = useSPIUser();

    const [waveNumber, setWaveNumber] = useState(1);

    return (

        <div>

            {waveNumber <= 5 && SPIUser[2] == false ? (

                <div className = "screenLayout">

                    <div className="SPIouterContainer">

                        <div className = "SPIgameBoardSign"> Wave Number: {waveNumber}</div>

                        <GameBoardM1
                            waveNumber = {waveNumber}
                            setWaveNumber = {setWaveNumber}
                        />

                        
                    </div>

                </div>

            ): (

                <div className = "screenLayout">

                    <div className="SPIouterContainer">

                        <div className = "SPIgameBoardSign"> Game Over. </div>
                        <div className = "SPIendingScreen">

                            {SPIUser[2] == true ? (

                                <h1> You died. </h1>

                            ) : (

                                <h1> You survived! Great job! </h1>

                            )}
                            
                        </div>
                        
                    </div>

                    <Link to="/SPImission" className = "generalbuttonGlitch" onClick = {() => unlockNextMission(SPIUser, setSPIUser)}>
                        Back to Missions Screen
                    </Link>

                </div>

            )}

        </div>

    )

}

export default M1GameScreen;