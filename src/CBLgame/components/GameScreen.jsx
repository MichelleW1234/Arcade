import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect} from "react";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import { useExitPoints } from "../../hooks/useExitPoints";

import InnerGameScreen from "./CBLGameComponents/InnerGamescreen.jsx";

import {playSound, retrieveActiveGame, claimPoints, achievementsUpdate} from "../../Helpers/helpers.js";

import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {useCBLUser} from "../Providers/CBLUserProvider.jsx";
import { useAchievements } from '../../Providers/AchievementsProvider.jsx';

import "./Gamescreen.css";

function Gamescreen (){

    const { Player, setPlayer} = usePlayer();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const {CBLUser, setCBLUser} = useCBLUser();
    const { Achievements, setAchievements} = useAchievements();

    const [colorToBlast, setColorToBlast] = useState(Math.floor(Math.random() * 4));
    const [colorAppearances, setColorAppearances] = useState(0);

    const [wrongColorBlasted, setWrongColorBlasted] = useState(false);


    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        exitGame();
        navigate("/selection");
    },
        ".QuitGame"
    );

    useKeyboardShortcut("Enter", () => {
        if (colorAppearances >= 50 || wrongColorBlasted == true ){
            result();
            navigate("/CBLsummary");
        }
    },
        ".ViewResults"
    );


    useExitPoints(() => {
        const adjustedPoints = [Player[0] - ActiveGame[1]];
        localStorage.setItem("Player", JSON.stringify(adjustedPoints));
        setPlayer(adjustedPoints);
    });


    useEffect(() => {

        if (wrongColorBlasted == true) {

            return;

        }

        const interval = setInterval(() => {

            const newColor = Math.floor(Math.random() * 4);
            setColorToBlast(newColor);

        }, 3500);

        return () => clearInterval(interval);

    }, [wrongColorBlasted]);
    

    const exitGame = () => {
        
        playSound(4);

        setCBLUser([0]);
        setPlayer([Player[0] - ActiveGame[1]]);
        setActiveGame(retrieveActiveGame(0));

    }


    const result = () => {
    
        if (CBLUser[0] >= 15){

            achievementsUpdate(setAchievements, 6);

        }

        claimPoints(ActiveGame, Player, setPlayer, CBLUser[0]*3);

    }



    return (

        <div>             
            
            <Link to="/selection" className = "generalbutton QuitGame" onClick={() => exitGame()}> 
                <div className="buttonNameContainer"> Quit Game <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>

            <div className = "gameScreenLayout">

                {colorAppearances < 50 && wrongColorBlasted == false ? (
            
                    <div className = "CBLOuterGameContainer">

                        <h1 className="CBLsign"> <span className='signGlitch'>Colors Blasted: {CBLUser[0]} </span></h1>

                        <InnerGameScreen
                            setColorAppearances = {setColorAppearances}
                            colorToBlast = {colorToBlast}
                            setWrongColorBlasted = {setWrongColorBlasted}
                            wrongColorBlasted = {wrongColorBlasted}
                        />
        
                    </div>

                ) : (

                    <div className = "CBLOuterGameContainer">

                        <h1 className="CBLsign"> <span className='signGlitch'> Game Over. </span></h1>

                        <div className = "CBLGameBoardEndingScreen">

                            {wrongColorBlasted ? (

                                <p> You blasted the wrong color. </p>

                            ) : (

                                <p> Game Over.</p>

                            )}
                            
                        </div>

                        <Link to="/CBLsummary" className = "CBLbutton ViewResults" onClick = {() => result()}> 
                            <div className="buttonNameContainer">View Results <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                        </Link>

                    </div>

                )}

            </div>
        </div>

    );

}


export default Gamescreen;