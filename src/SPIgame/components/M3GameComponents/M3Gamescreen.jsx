import { useNavigate, Link } from 'react-router-dom';
import { useState} from 'react';
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";

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

    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame);
        navigate("/selection");
    });

    useKeyboardShortcut("Enter", () => {
        if ( waveNumber > 5 || SPIUser[2] == true){
            unlockNextMission(SPIUser, setSPIUser);
            navigate("/SPImission");
        }
    });

    

    return (

        <div>
            <Link to= "/selection" className = "generalbutton" onClick={() => quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame)}>
                Quit Game
            </Link>

            {waveNumber <= 5 && SPIUser[2] == false ? (

                <div className = "gameScreenLayout">

                    <div className="SPIouterContainer">

                        <h1 className = "SPIgameBoardSign"> <span className='signGlitch'>Wave Number: {waveNumber}</span></h1>

                        <GameBoardM3
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

                    <Link to="/SPImission" className = "generalbuttonGlitch" onClick = {() => unlockNextMission(SPIUser, setSPIUser)}>
                        Back to Missions Screen
                    </Link>

                </div>

            )}

        </div>

    )

}

export default M3GameScreen;