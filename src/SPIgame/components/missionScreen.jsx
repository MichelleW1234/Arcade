import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { useSPIUser } from '../Providers/SPIUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../Providers/PlayerProvider.jsx';

import "./Missionscreen.css";

import {playSound, claimPoints} from '../../Helpers/helpers.js';
import {quitGame} from '../Helpers/helpers.js';

function Missionscreen() {

    const allMissions = [1, 2, 3, 4];
    const missionNames = ["Surface Sweep", "Defense Protocol", "Strain X", "Operation: Kill the Queen"];

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer } = usePlayer();
    const {SPIUser, setSPIUser} = useSPIUser();

    const [currGamePath, setCurrGamePath] = useState(SPIUser[1][1]);

    useEffect(() => {
        setCurrGamePath(SPIUser[1][1]); 
    }, [SPIUser[1][1]]); 

    return (

        <div>

            <Link to="/selection" className = "generalbutton" onClick={() => quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame)}>
                Quit Game
            </Link>

            <div className = "screenLayout">

                <div className = "headerwords"> Your Mission<span className = "headerwordsGlitch">s</span>: </div>
                <div className = "SPImissionContainer">
                    {allMissions.map((mission, index) => (
                        SPIUser[2] == true ? (

                            <div key = {mission} className="SPImissionWindowUnavailable">
                                
                                <p> X </p>
                            
                            </div>

                        ) : SPIUser[0].includes(mission) ? (
                            <div key = {mission} className= "SPImissionWindowCompleted">
                                
                                <p>Mission {mission} Completed</p>
                            
                            </div>


                        ) : SPIUser[1][0] == mission ? (

                            <div key = {mission} className="SPImissionWindowUnlocked">

                                <p> Mission {mission}:  {missionNames[index]}</p>
                                <Link to= {currGamePath} className = "SPImissionStartButton" onClick = {()=> playSound(12)}>
                                    Start
                                </Link>
                            
                            </div>

                        ) : (

                            <div key = {mission} className="SPImissionWindowLocked">

                                <p> Locked </p>
                            
                            </div>

                        )
                    ))}
                </div>

                {SPIUser[0].length == allMissions.length || SPIUser[2] == true ? (

                    <Link to= "/SPIsummary" className = "generalbuttonGlitch" onClick = {() => claimPoints(ActiveGame, Player, setPlayer, (SPIUser[0].length*ActiveGame[1]))}>
                        View Game Summary
                    </Link>

                ) : (

                    null

                )}

            </div>
        </div>

    )

}
export default Missionscreen