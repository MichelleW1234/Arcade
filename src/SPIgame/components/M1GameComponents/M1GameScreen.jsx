import { useState } from 'react';
import { Link } from 'react-router-dom';

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

    return (

        <div>
            <Link to= "/selection" className = "generalbutton" onClick={() => quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame)}>
                Quit Game
            </Link>

            {waveNumber <= 5 && SPIUser[2] == false ? (

                <div className = "gameScreenLayout">

                    <div className="SPIouterContainer">

                        <div className = "SPIgameBoardSign"> Wave Number: {waveNumber}</div>

                        <GameBoardM1
                            waveNumber = {waveNumber}
                            setWaveNumber = {setWaveNumber}
                        />

                        
                    </div>

                </div>

            ): (

                <div className = "gameScreenLayout">

                    <div className="SPIouterContainer">

                        <div className = "SPIgameBoardSign"> Game Over. </div>
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

export default M1GameScreen;