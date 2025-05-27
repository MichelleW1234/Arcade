import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import GameBoardM4 from "./gameScreenM4Components/gameBoardM4.jsx";

import { useTHRUser } from '../../Providers/THRUserProvider.jsx';
import {unlockNextMission} from "../../helpers/THRhelpers.js"

import "./gameScreenM4.css"

function gameScreenM4() {

    const {THRUser, setTHRUser} = useTHRUser();

    const [bossDefeated, setBossDefeated] = useState(false);
    const [killed, setKilled] = useState(false);
    const [seconds, setSeconds] = useState(0);


    useEffect(() => {
    // Set up interval
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

    // Clear interval on unmount
        return () => clearInterval(interval);
    }, []);

    return (

        <div>

            {seconds < 60 && bossDefeated == false && killed == false? (

                <div className = "screenLayout">

                    <div className="THRouterContainerM4">

                        <div className = "THRgameBoardSign"> Timer: {seconds}</div>

                        <GameBoardM4
                            setBossDefeated = {setBossDefeated}
                            setKilled={setKilled}
                        />
                        
                    </div>

                </div>

            ): (

                <div className = "screenLayout">

                    <div className="THRouterContainerM4">

                        <div className = "THRgameBoardSign"> Game Over. </div>
                        <div className = "THRendingScreen">

                            {bossDefeated == false ? (

                                killed == true ? (

                                    <h1> Your ship was blown up. </h1>
                                    
                                ) : (

                                    <h1> You died before you could defeat the boss. </h1>

                                )

                            ) : (

                                <h1> You defeated the boss and have saved your ship! Great job! </h1>

                            )}
                            
                        </div>
                        
                    </div>

                    {bossDefeated == false ? (

                        <Link to="/THRsummary" className = "generalbutton">
                            View Game Summary
                        </Link>
                    
                    ) : (

                        <Link to="/THRmission" className = "generalbutton" onClick = {() => unlockNextMission(THRUser, setTHRUser)}>
                            Return to Game Screen
                        </Link>

                    )}

                </div>

            )}

        </div>

    )

}

export default gameScreenM4