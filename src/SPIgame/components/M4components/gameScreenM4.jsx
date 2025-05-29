import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import GameBoardM4 from "./gameScreenM4Components/gameBoardM4.jsx";

import { useSPIUser } from '../../Providers/SPIUserProvider.jsx';
import {unlockNextMission} from "../../helpers/SPIhelpers.js"

import "../gameScreen.css"

function gameScreenM4() {

    const {SPIUser, setSPIUser} = useSPIUser();

    const [bossDefeated, setBossDefeated] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    useEffect(() => {

        if (seconds >= 60 && bossDefeated == false) {
            setSPIUser(prev => [prev[0], prev[1], true]);
        }

    }, [seconds, bossDefeated]);

    return (

        <div>

            {bossDefeated == false && SPIUser[2] == false ? (

                <div className = "screenLayout">

                    <div className="SPIouterContainerM4">

                        <div className = "SPIgameBoardSign"> Timer: {seconds}</div>

                        <GameBoardM4
                            setBossDefeated = {setBossDefeated}
                        />
                        
                    </div>

                </div>

            ): (

                <div className = "screenLayout">

                    <div className="SPIouterContainerM4">

                        <div className = "SPIgameBoardSign"> Game Over. </div>
                        
                        <div className = "SPIendingScreen">

                            {SPIUser[2] == true ? (

                                seconds >= 60 ? (

                                    <h1> Your flashlight ran out of power.</h1>

                                ) : (

                                    <h1> Your ship was blown up. </h1>

                                )

                            ) : (

                                <h1> You defeated the boss in time and have saved your ship! Great job! </h1>

                            )}
                            
                        </div>
                        
                    </div>

                    <Link to="/SPImission" className = "generalbuttonGlitch" onClick = {() => unlockNextMission(SPIUser, setSPIUser)}>
                        Return to Missions Screen
                    </Link>

                </div>

            )}

        </div>

    )

}

export default gameScreenM4