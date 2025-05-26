import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./missionScreen.css";
import { useTHRUser } from '../Providers/THRUserProvider.jsx';

function missionScreen() {

    const {THRUser, setTHRUser} = useTHRUser();

    const allMissions = [1, 2, 3, 4];
    const [currGamePath, setCurrGamePath] = useState(THRUser[1][1]);

    useEffect(() => {
        setCurrGamePath(THRUser[1][1]); 
    }, [THRUser[1][1]]); 

    return (

        <div className = "screenLayout">

            <div className = "headerwords"> Your Mission<span className = "headerwordsGlitch">s</span>: </div>
            <div className = "THRmissionContainer">
                {allMissions.map((mission, index) => (
                    THRUser[0].includes(mission) ? (
                        <div key = {mission} className="THRmissionWindowCompleted">
                            
                            <h1>Mission {mission} Completed</h1>
                        
                        </div>


                    ) : THRUser[1][0] == mission ? (

                        <div key = {mission} className="THRmissionWindowUnlocked">

                            <h1> Click to complete Mission {mission}:</h1>
                            <Link to= {currGamePath} className = "THRmissionButton">
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

            {THRUser[0].length == allMissions.length &&  THRUser[1] == -1 ? (

                <Link to= "/THRsummary" className = "generalbutton">
                    View Summary
                </Link>

            ) : (

                null

            )}

        </div>

    )

}
export default missionScreen