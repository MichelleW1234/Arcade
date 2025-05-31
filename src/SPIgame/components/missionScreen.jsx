import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { useSPIUser } from '../Providers/SPIUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../Providers/PlayerProvider.jsx';

import "./missionScreen.css";

import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

function missionScreen() {

    const allMissions = [1, 2, 3, 4];
    const missionNames = ["Surface Sweep", "Defense Protocol", "Strain X", "Operation: Kill the Queen"];

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer } = usePlayer();
    const {SPIUser, setSPIUser} = useSPIUser();

    const [currGamePath, setCurrGamePath] = useState(SPIUser[1][1]);

    const reset = () => {
        
        playSound(4);
        setSPIUser([[],[1, "/SPIM1Instructions"], false]);

        const difference = Player[0] - ActiveGame[1];
    
        if (difference >= 0){
    
            setPlayer(prev => [difference, prev[0]]);
    
        } else {
    
            setPlayer(prev => [0, prev[0]]);
    
        }

        setActiveGame(retrieveActiveGame(1));
        
    }

    useEffect(() => {
        setCurrGamePath(SPIUser[1][1]); 
    }, [SPIUser[1][1]]); 

    const calculatePoints = () => {

        const pointDifference = (Player[0] - ActiveGame[1]) + (SPIUser[0].length*ActiveGame[1]);
        setPlayer(prev => [pointDifference, prev[0]]);

        playSound(2);

    }

    return (

        <div>

            <Link to="/selection" className = "generalbutton" onClick={reset}>
                Quit Game
            </Link>

            <div className = "screenLayout">

                <div className = "headerwords"> Your Mission<span className = "headerwordsGlitch">s</span>: </div>
                <div className = "SPImissionContainer">
                    {allMissions.map((mission, index) => (
                        SPIUser[2] == true ? (

                            <div key = {mission} className="SPImissionWindowUnavailable">
                                
                                <h1> X </h1>
                            
                            </div>

                        ) : SPIUser[0].includes(mission) ? (
                            <div key = {mission} className= "SPImissionWindowCompleted">
                                
                                <h1>Mission {mission} Completed</h1>
                            
                            </div>


                        ) : SPIUser[1][0] == mission ? (

                            <div key = {mission} className="SPImissionWindowUnlocked">

                                <h1> Mission {mission}:  {missionNames[index]}</h1>
                                <Link to= {currGamePath} className = "SPImissionStartButton" onClick = {()=> playSound(12)}>
                                    Start
                                </Link>
                            
                            </div>

                        ) : (

                            <div key = {mission} className="SPImissionWindowLocked">

                                <h1> Locked </h1>
                            
                            </div>

                        )
                    ))}
                </div>

                {SPIUser[0].length == allMissions.length || SPIUser[2] == true ? (

                    <Link to= "/SPIsummary" className = "generalbuttonGlitch" onClick = {() => calculatePoints()}>
                        View Game Summary
                    </Link>

                ) : (

                    null

                )}

            </div>
        </div>

    )

}
export default missionScreen