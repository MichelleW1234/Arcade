import { useState, } from 'react';
import { Link } from 'react-router-dom';
import "./missionScreen.css";
import { useTHRUser } from '../Providers/THRUserProvider.jsx';

function missionScreen() {

    const allMissions = [1, 2, 3];

    const {THRUser, setTHRUser} = useTHRUser();

    return (

        <div className = "screenLayout">
            <div className = "THRmissionContainerOuter">
                <div className = "THRmissionContainerInner">
                    {allMissions.map((mission, index) => (
                        THRUser[0].includes(mission) ? (
                            <div key = {mission} className="THRmissionWindowCompleted">
                                
                                <h1>Mission {mission} Completed</h1>
                            
                            </div>


                        ) : THRUser[1] == mission ? (

                            <div key = {mission} className="THRmissionWindowUnlocked">

                                <h1> Click to complete Mission {mission}:</h1>
                                <Link to="/THRgameM1" className = "THRmissionButton">
                                    Start
                                </Link>
                            
                            </div>

                        ) : (

                            <div key = {mission} className="THRmissionWindowLocked">

                                <h1> Locked </h1>
                            
                            </div>

                        )
                    ))}
                </div>
            </div>
        </div>

    )

}
export default missionScreen