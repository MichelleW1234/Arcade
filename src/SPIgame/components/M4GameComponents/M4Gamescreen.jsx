import { useEffect, useState, useRef} from 'react';
import { Link } from 'react-router-dom';

import GameBoardM4 from "./M4GameScreenComponents/M4GameBoard.jsx";

import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useSPIUser } from '../../Providers/SPIUserProvider.jsx';

import {unlockNextMission, quitGame} from '../../Helpers/helpers.js';

import "../Gamescreen.css";

import {playSound} from '../../../Helpers/helpers.js';

function M4Gamescreen() {

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer } = usePlayer();
    const {SPIUser, setSPIUser} = useSPIUser();

    const [bossDefeated, setBossDefeated] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [blownUp, setBlownUp] = useState(false);
    const [bossRoared, setBossRoared] = useState(false);


    /* Clear and restart their interval whenever anything in their dependency array changes
    so that callback always uses the current value */

    /* Timer */
    useEffect(() => {

        if (SPIUser[2] == true){

            return;

        }

        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [SPIUser]);

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
            <Link to= "/selection" className = "generalbutton" onClick={() => quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame)}>
                Quit Game
            </Link>

            {bossDefeated == false && SPIUser[2] == false ? (

                <div className = "gameScreenLayout">

                    <div className="SPIouterContainerM4">

                        <div className = "SPIgameBoardSign"> Timer: {seconds}</div>

                        <GameBoardM4
                            setBossDefeated = {setBossDefeated}
                            setBlownUp = {setBlownUp}
                        />
                        
                    </div>

                </div>

            ): (

                <div className = "gameScreenLayout">

                    <div className="SPIouterContainerM4">

                        <div className = "SPIgameBoardSign"> Game Over. </div>
                        
                        <div className = "SPIendingScreen">

                            {SPIUser[2] == true ? (

                                blownUp == false ? (

                                    <p> Your beamlight ran out of power.</p>

                                ) : (

                                    <p> You were blown up by the Queen. </p>

                                )

                            ) : (

                                <p> You defeated the Queen in time and have saved your ship! Great job! </p>

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

export default M4Gamescreen;