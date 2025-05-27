import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import GameBoardM4 from "./gameScreenM4Components/gameBoardM4.jsx";

import { useTHRUser } from '../../Providers/THRUserProvider.jsx';
import {unlockNextMission} from "../../helpers/THRhelpers.js"

import "./gameScreenM4.css"

function gameScreenM4() {

    const {THRUser, setTHRUser} = useTHRUser();

    const [bossDefeated, setBossDefeated] = useState(false);
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

            {seconds < 60 && bossDefeated == false && THRUser[2] == false ? (

                <div className = "screenLayout">

                    <div className="THRouterContainerM4">

                        <div className = "THRgameBoardSign"> Timer: {seconds}</div>

                        <GameBoardM4
                            setBossDefeated = {setBossDefeated}
                        />
                        
                    </div>

                </div>

            ): (

                <div className = "screenLayout">

                    <div className="THRouterContainerM4">

                        <div className = "THRgameBoardSign"> Game Over. </div>
                        <div className = "THRendingScreen">

                            {bossDefeated == false ? (

                                THRUser[2] == false ? (

                                    <h1> Your ship was blown up. </h1>
                                    
                                ) : (

                                    <h1> You died before you could defeat the boss. </h1>

                                )

                            ) : (

                                <h1> You defeated the boss and have saved your ship! Great job! </h1>

                            )}
                            
                        </div>
                        
                    </div>

                    <Link to="/THRmission" className = "generalbutton" onClick = {() => unlockNextMission(THRUser, setTHRUser)}>
                        Return to Missions Screen
                    </Link>

                </div>

            )}

        </div>

    )

}

export default gameScreenM4