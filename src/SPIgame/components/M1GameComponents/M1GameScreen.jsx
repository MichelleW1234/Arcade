import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";

import GameBoardM1 from "./M1GameScreenComponents/M1GameBoard.jsx";

import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useSPIUser } from '../../Providers/SPIUserProvider.jsx';

import {unlockNextMission, quitGame} from '../../Helpers/helpers.js';

import "../Gamescreen.css";

function M1GameScreen() {

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer } = usePlayer();
    const {SPIUser, setSPIUser} = useSPIUser();

    const [waveNumber, setWaveNumber] = useState(1);

    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame);
        navigate("/selection");
    },
        ".QuitGame"
    );

    useKeyboardShortcut("Enter", () => {
        if ( waveNumber > 5 || SPIUser[2] == true){
            unlockNextMission(SPIUser, setSPIUser);
            navigate("/SPImission");
        }
    },
        ".BacktoMissionsScreen"
    );

    return (

        <div>
            <Link to= "/selection" className = "generalbutton QuitGame" onClick={() => quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame)}>
                <div className="buttonNameContainer"> Quit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

            {waveNumber <= 5 && SPIUser[2] == false ? (

                <div className = "gameScreenLayout">

                    <div className="SPIouterContainer">

                        <h1 className = "SPIgameBoardSign"> <span className='signGlitch'>Wave Number: {waveNumber}</span></h1>

                        <GameBoardM1
                            waveNumber = {waveNumber}
                            setWaveNumber = {setWaveNumber}
                        />

                    </div>

                </div>

            ): (

                <div className = "gameScreenLayout">

                    <div className="SPIouterContainer">

                        <h1 className = "SPIgameBoardSign"> <span className='signGlitch'>Game Over. </span></h1>
                        <div className = "SPIendingScreen">

                            {SPIUser[2] == true ? (

                                <p> You died. </p>

                            ) : (

                                <p> You survived! Great job! </p>

                            )}
                            
                        </div>
                        
                    </div>

                    <Link to="/SPImission" className = "SPIbutton BacktoMissionsScreen" onClick = {() => unlockNextMission(SPIUser, setSPIUser)}>
                        <div className="buttonNameContainer"> Back to Missions Screen <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                    </Link>

                </div>

            )}

        </div>

    )

}

export default M1GameScreen;