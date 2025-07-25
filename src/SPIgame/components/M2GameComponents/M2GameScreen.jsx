import { useState } from 'react';
import { Link } from 'react-router-dom';

import GameBoardM2 from "./M2GameScreenComponents/M2GameBoard.jsx";

import { useSPIUser } from '../../Providers/SPIUserProvider.jsx';
import {unlockNextMission} from "../../Helpers/helpers.js";

import "../Gamescreen.css";

function M2GameScreen() {

    const {SPIUser, setSPIUser} = useSPIUser();

    const [waveNumber, setWaveNumber] = useState(1);

    return (

        <div>

            {waveNumber <= 5 && SPIUser[2] == false ? (

                <div className = "gameScreenLayout">

                    <div className="SPIouterContainer">

                        <div className = "SPIgameBoardSign"> Wave Number: {waveNumber}</div>

                        <GameBoardM2
                            waveNumber = {waveNumber}
                            setWaveNumber = {setWaveNumber}
                        />
                        
                    </div>

                </div>

            ): (

                <div className = "gameScreenLayout">

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

export default M2GameScreen;