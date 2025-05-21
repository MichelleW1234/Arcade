import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useTHRUser } from '../../Providers/THRUserProvider.jsx';
import {unlockNextMission} from "../../helpers/THRhelpers.js"

import "./gameScreenM3.css"

function gameScreenM3() {

    const {THRUser, setTHRUser} = useTHRUser();

    const [waveNumber, setWaveNumber] = useState(1);
    const [thresholdBreached, setThresholdBreached] = useState(false);

    return (

        <div>

            {waveNumber <= 10 && thresholdBreached == false ? (

                <div className = "screenLayout">

                   <h1>Hello</h1>

                </div>

            ): (

                <div className = "screenLayout">

                    <h1>Hello</h1>

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

export default gameScreenM3