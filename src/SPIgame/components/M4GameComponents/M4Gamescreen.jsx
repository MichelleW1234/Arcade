import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";
import { useExitPoints } from "../../../hooks/useExitPoints";
import { storage } from "../../../storage";

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

    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame);
        navigate("/selection");
    },
        ".QuitGame"
    );

    useKeyboardShortcut("Enter", () => {
        if (bossDefeated == true || SPIUser[2] == true){
            unlockNextMission(SPIUser, setSPIUser);
            navigate("/SPImission");
        }
    },
        ".ReturntoMissionsScreen"
    );


    useExitPoints(() => {
        const adjustedPoints = [Player[0] - ActiveGame[1]];
        storage.set("Player", adjustedPoints);
        setPlayer(adjustedPoints);
    });


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
            <Link to= "/selection" className = "generalbutton QuitGame" onClick={() => quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame)}>
                <div className="buttonNameContainer"> Quit Game<br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

            <div className = "gameScreenLayout">

                {bossDefeated == false && SPIUser[2] == false ? (

                    <div className="SPIouterContainerM4">

                        <h1 className = "SPIgameBoardSign"> <span className='signGlitch'>Timer: {seconds}</span></h1>

                        <GameBoardM4
                            setBossDefeated = {setBossDefeated}
                            setBlownUp = {setBlownUp}
                        />
                        
                    </div>

                ): (

                    <>

                        <div className="SPIouterContainerM4">

                            <h1 className = "SPIgameBoardSign"> <span className='signGlitch'>Game Over. </span></h1>
                            
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

                        <Link to="/SPImission" className = "SPIbutton ReturntoMissionsScreen" onClick = {() => unlockNextMission(SPIUser, setSPIUser)}>
                            <div className="buttonNameContainer"> Return to Missions Screen <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                        </Link>

                    </>

                )}

            </div>

        </div>

    )

}

export default M4Gamescreen;