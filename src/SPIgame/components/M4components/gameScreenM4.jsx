import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import GameBoardM4 from "./gameScreenM4Components/gameBoardM4.jsx";

import { useSPIUser } from '../../Providers/SPIUserProvider.jsx';
import {unlockNextMission} from "../../helpers/SPIhelpers.js"; 

import "../gameScreen.css";

import {playSound} from '../../../Helpers/helpers.js';

function gameScreenM4() {

    const {SPIUser, setSPIUser} = useSPIUser();

    const [bossDefeated, setBossDefeated] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [blownUp, setBlownUp] = useState(false);
    const [bossRoared, setBossRoared] = useState(false);

    /*Timer */
    useEffect(() => {

        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);

        }, 1000);

        return () => clearInterval(interval);

    }, []);

    /*Beamlight battery runs out */
    useEffect(() => {

        if (seconds >= 60 && bossDefeated == false && blownUp == false) {
            setSPIUser(prev => [prev[0], prev[1], true]);

            if (bossRoared == false){

                playSound(14);
                setBossRoared(true);

            }

        }

    }, [seconds, bossDefeated, bossRoared, blownUp]);


    return (

        <div>

            {bossDefeated == false && SPIUser[2] == false ? (

                <div className = "screenLayout">

                    <div className="SPIouterContainerM4">

                        <div className = "SPIgameBoardSign"> Timer: {seconds}</div>

                        <GameBoardM4
                            setBossDefeated = {setBossDefeated}
                            setBlownUp = {setBlownUp}
                        />
                        
                    </div>

                </div>

            ): (

                <div className = "screenLayout">

                    <div className="SPIouterContainerM4">

                        <div className = "SPIgameBoardSign"> Game Over. </div>
                        
                        <div className = "SPIendingScreen">

                            {SPIUser[2] == true ? (

                                blownUp == false ? (

                                    <h1> Your beamlight ran out of power.</h1>

                                ) : (

                                    <h1> You were blown up by the Queen. </h1>

                                )

                            ) : (

                                <h1> You defeated the Queen in time and have saved your ship! Great job! </h1>

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