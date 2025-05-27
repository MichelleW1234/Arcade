import { useState } from 'react';
import { Link } from 'react-router-dom';

import GameBoardM2 from "./gameScreenM2Components/gameBoardM2.jsx";

import { useTHRUser } from '../../Providers/THRUserProvider.jsx';
import {unlockNextMission} from "../../helpers/THRhelpers.js";

import "./gameScreenM2.css";

function gameScreenM2() {

    const {THRUser, setTHRUser} = useTHRUser();

    const [waveNumber, setWaveNumber] = useState(1);

    return (

        <div>

            {waveNumber <= 5 && THRUser[2] == false ? (

                <div className = "screenLayout">

                    <div className="THRouterContainer">

                        <div className = "THRgameBoardSign"> Wave Number: {waveNumber}</div>

                        <GameBoardM2
                            waveNumber = {waveNumber}
                            setWaveNumber = {setWaveNumber}
                        />
                        
                    </div>

                </div>

            ): (

                <div className = "screenLayout">

                    <div className="THRouterContainer">

                        <div className = "THRgameBoardSign"> Game Over. </div>
                        <div className = "THRendingScreen">

                            {THRUser[2] == true ? (

                                <h1> You died. </h1>

                            ) : (

                                <h1> You survived! Great job! </h1>

                            )}
                            
                        </div>
                        
                    </div>

                    <Link to="/THRmission" className = "generalbutton" onClick = {() => unlockNextMission(THRUser, setTHRUser)}>
                        Back to Missions Screen
                    </Link>


                </div>

            )}

        </div>

    )

}

export default gameScreenM2