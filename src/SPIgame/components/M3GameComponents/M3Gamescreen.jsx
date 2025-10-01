import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";
import { useExitPoints } from "../../../hooks/useExitPoints";
import { storage } from "../../../storage";

import GameBoardM3 from "./M3GameScreenComponents/M3GameBoard.jsx";

import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useSPIUser } from '../../Providers/SPIUserProvider.jsx';

import {unlockNextMission, quitGame} from '../../Helpers/helpers.js';

import "../Gamescreen.css";

function M3GameScreen() {

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer } = usePlayer();
    const {SPIUser, setSPIUser} = useSPIUser();

    const [waveNumber, setWaveNumber] = useState(1);
    const [gameOver, setGameOver] = useState(false);

    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        quitGame(setSPIUser, setPlayer, ActiveGame, setActiveGame);
        navigate("/selection");
    },
        ".QuitGame"
    );

    useKeyboardShortcut("Enter", () => {
        if (gameOver === true){
            unlockNextMission(SPIUser, setSPIUser);
            navigate("/SPImission");
        }
    },
        ".BacktoMissionsScreen"
    );


    useExitPoints(() => {
        const adjustedPoints = [Player[0] - ActiveGame[1]];
        storage.set("Player", adjustedPoints);
        setPlayer(adjustedPoints);
    });
    

    useEffect(() => {

        if (SPIUser[2] === true || waveNumber > 5) {

            setGameOver(true);

        }

    }, [SPIUser, waveNumber]);


    return (

        <div>
            <Link to= "/selection" className = "generalbutton QuitGame" onClick={() => quitGame(setSPIUser, setPlayer, ActiveGame, setActiveGame)}>
                <div className="buttonNameContainer">Quit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

            <div className = "gameScreenLayout">

                {gameOver === false ? (

                    <div className="SPIouterContainer">

                        <h1 className = "SPIgameBoardSign"> <span className='signGlitch'>Wave Number: {waveNumber}</span></h1>

                        <GameBoardM3
                            waveNumber = {waveNumber}
                            setWaveNumber = {setWaveNumber}
                            gameOver = {gameOver}
                        />
                        
                    </div>

                ): (

                    <>

                        <div className="SPIouterContainer">

                            <h1 className = "SPIgameBoardSign"> <span className='signGlitch'>Game Over. </span></h1>

                            <div className = "SPIendingScreen">

                                {SPIUser[2] === true ? (

                                    <p> You died. </p>

                                ) : (

                                    <p> You survived! Great job! </p>

                                )}
                                
                            </div>
                            
                        </div>

                        <Link to="/SPImission" className = "SPIbutton BacktoMissionsScreen" onClick = {() => unlockNextMission(SPIUser, setSPIUser)}>
                            <div className="buttonNameContainer"> Back to Missions Screen <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                        </Link>

                    </>

                )}

            </div>

        </div>

    )

}

export default M3GameScreen;