import { useNavigate, Link } from 'react-router-dom';
import {useRef, useState, useEffect} from 'react';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import { useExitPoints } from "../../hooks/useExitPoints";
import { storage } from "../../storage";

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useRPSUser} from '../Providers/RPSUserProvider.jsx';

import {getInput, getReferences, quitGame} from "../Helpers/helpers.js";
import {playSound} from "../../Helpers/helpers.js";

import "./LevelSelectionscreen.css";

function LevelSelectionscreen (){

    const [activeButton, setActiveButton] = useState(0);

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { setRPSUser} = useRPSUser();
    const {Player, setPlayer} = usePlayer();


    const navigate = useNavigate();
    useKeyboardShortcut("Escape", () => {
        quitGame(setRPSUser, ActiveGame, setActiveGame, setPlayer);
        navigate("/selection");
    },
        ".QuitGame"
    );

    useKeyboardShortcut("Enter", (event) => {

        event.preventDefault();
        event.stopPropagation();

        playSound(18);
        navigate("/RPSgame");
    },
        ".ContinuetoGame"
    );
    
    const totalButtons = 3;
    const itemRefs = useRef([]);

    useKeyboardShortcut("ArrowLeft", (event) => {
        event.preventDefault();

        setActiveButton(prev => (prev - 1 + totalButtons) % totalButtons);
        playSound(3);
    });

    useKeyboardShortcut("ArrowRight", (event) => {
        event.preventDefault();

        setActiveButton(prev => (prev + 1) % totalButtons);
        playSound(3);
    });

    useEffect(() => {
        const currLevelInput = getInput(activeButton);
        const currLevelReferences = getReferences(activeButton);

        setRPSUser([activeButton, currLevelInput, currLevelReferences, 0, 0]);

        // scroll the new element into view
        itemRefs.current[activeButton]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });
    }, [activeButton]);




    useExitPoints(() => {
        const adjustedPoints = [Player[0] - ActiveGame[1]];
        storage.set("Player", adjustedPoints);
        setPlayer(adjustedPoints);
    });



    const handleClick = (index) => {

        playSound(3);
        setActiveButton(index);

        const currLevelInput = getInput(index);
        const currLevelReferences = getReferences(index);
        setRPSUser([index, currLevelInput, currLevelReferences, 0, 0]);

    };

    return (

        <div>

            <Link to= "/selection" className = "generalbutton QuitGame" onClick ={() => quitGame(setRPSUser, ActiveGame, setActiveGame, setPlayer)}>
                <div className="buttonNameContainer">Quit Game<br/> <span className = "buttonKeyDescription"> [Return] </span></div>
            </Link>

            <div className = "gameScreenLayout">

                <h1 className = "instructionsSign"> <span className='signGlitch'>Variations:</span></h1>

                <div className = "RPSlevelsContainer">

                    <p className='largefont'>[&larr;] [&rarr;]</p>

                    <div className = "RPSlevelsInnerContainer">

                        <div className = "RPSLevelsWindowContainer"
                            ref={(el) => (itemRefs.current[0] = el)}>

                            <div className = "RPSLevelsWindow"> 
                                <p> <span className="windowGlitch">Rock, Paper, Scissors</span> </p>
                            </div>
                            <button
                            className={`RPSLevelButton ${activeButton === 0 ? 'active' : ''}`}
                            onClick={() => handleClick(0)}
                            >
                                Select
                            </button>

                        </div>   

                        <div className = "RPSLevelsWindowContainer"
                            ref={(el) => (itemRefs.current[1] = el)}>

                            <div className = "RPSLevelsWindow"> 
                                <p>Rock, Paper, Scissors, <span className="RPSLevelGlitch">Lizard, Spock</span></p> 
                            </div>
                            <button
                            className={`RPSLevelButton ${activeButton === 1 ? 'active' : ''}`}
                            onClick={() => handleClick(1)}
                            >
                                Select
                            </button>

                        </div>    

                        <div className = "RPSLevelsWindowContainer"
                            ref={(el) => (itemRefs.current[2] = el)}>

                            <div className = "RPSLevelsWindow"> 
                                <p>Rock, Paper, Scissors, Gun, Shield</p>
                            </div>
                            <button
                            className={`RPSLevelButton ${activeButton === 2 ? 'active' : ''}`}
                            onClick={() => handleClick(2)}
                            >
                                Select
                            </button>

                        </div> 

                    </div>  

                </div>

                <Link to= "/RPSgame" className = "generalbuttonGlitch ContinuetoGame" onClick={() => playSound(18)}>
                    <div className="buttonNameContainer">Continue to Game <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                </Link>
                
            </div>

        </div>
        
    );
}

export default LevelSelectionscreen;