import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

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

    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame);
        navigate("/selection");
    },
        ".QuitGame"
    );

    useKeyboardShortcut("Enter", () => {
        if (SPIUser[0] == allMissions.length || SPIUser[2] == true){
            document.querySelectorAll(".ViewResults").forEach(el => {
                el.classList.add("active");
                setTimeout(() => el.classList.remove("active"), 100);
            });
            document.querySelectorAll(".Start").forEach(el => el.classList.remove("active"));

            claimPoints(ActiveGame, Player, setPlayer, (SPIUser[0]*ActiveGame[1]))
            navigate("/SPIsummary");
        } else {
            document.querySelectorAll(".Start").forEach(el => {
                el.classList.add("active");
                setTimeout(() => el.classList.remove("active"), 100);
            });
            document.querySelectorAll(".ViewResults").forEach(el => el.classList.remove("active"));

            playSound(12);
            navigate(currGamePath);
        }
    });



    useEffect(() => {
        setCurrGamePath(SPIUser[1][1]); 
    }, [SPIUser[1][1]]); 

    

    return (

        <div>

            <Link to="/selection" className = "generalbutton QuitGame" onClick={() => quitGame(setSPIUser, Player, setPlayer, ActiveGame, setActiveGame)}>
                <div className="buttonNameContainer"> Quit Game<br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

            <div className = "screenLayout">

                <h1 className = "headerwords"> Your Mission<span className = "headerwordsGlitch">s</span>: </h1>
                <div className = "SPImissionContainer">
                    {allMissions.map((mission, index) => (
                        SPIUser[2] == true ? (

                            <div key = {mission} className="SPImissionWindowUnavailable">
                                
                                <p> X </p>
                            
                            </div>

                        ) : SPIUser[0] >= mission ? (
                            <div key = {mission} className= "SPImissionWindowCompleted">
                                
                                <p>Mission {mission} Completed</p>
                            
                            </div>


                        ) : SPIUser[1][0] == mission ? (

                            <div key = {mission} className="SPImissionWindowUnlocked">

                                <p> Mission {mission}:  {missionNames[index]}</p>
                                <Link to= {currGamePath} className = "SPImissionStartButton Start" onClick = {()=> playSound(12)}>
                                    <div className="buttonNameContainer">Start <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                                </Link>
                            
                            </div>

                        ) : (

                            <div key = {mission} className="SPImissionWindowLocked">

                                <p> Locked </p>
                            
                            </div>

                        )
                    ))}
                </div>

                {SPIUser[0] == allMissions.length || SPIUser[2] == true ? (

                    <Link to= "/SPIsummary" className = "generalbuttonGlitch ViewResults" onClick = {() => claimPoints(ActiveGame, Player, setPlayer, (SPIUser[0]*ActiveGame[1]))}>
                        <div className="buttonNameContainer">View Results <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                    </Link>

                ) : (

                    null

                )}

            </div>
        </div>

    )

}
export default Missionscreen