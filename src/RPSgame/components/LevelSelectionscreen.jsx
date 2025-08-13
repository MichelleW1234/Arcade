import { useNavigate, Link } from 'react-router-dom';
import {useState} from 'react';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useRPSUser} from '../Providers/RPSUserProvider.jsx';

import {getInput, getReferences, quitGame} from "../Helpers/helpers.js";
import {playSound} from "../../Helpers/helpers.js";

import "./LevelSelectionscreen.css";

function LevelSelectionscreen (){

    const [activeButton, setActiveButton] = useState(0);

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { RPSUser, setRPSUser} = useRPSUser();
    const {Player, setPlayer} = usePlayer();


    const navigate = useNavigate();
    useKeyboardShortcut("Escape", () => {
        quitGame(setRPSUser, ActiveGame, setActiveGame, setPlayer, Player);
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
    useKeyboardShortcut("ArrowLeft", (event) => {
        event.preventDefault();

        setActiveButton((prev) => {
            const newIndex = (prev - 1 + totalButtons) % totalButtons;
            setActiveButton(newIndex);
            const currLevelInput = getInput(newIndex);
            const currLevelReferences = getReferences(newIndex);
            setRPSUser([newIndex, currLevelInput, currLevelReferences, 0, 0]);
            return newIndex;
        });
        playSound(3);
    });
    useKeyboardShortcut("ArrowRight", (event) => {
        event.preventDefault();

        setActiveButton((prev) => {
            const newIndex = (prev + 1) % totalButtons;
            setActiveButton(newIndex);
            const currLevelInput = getInput(newIndex);
            const currLevelReferences = getReferences(newIndex);
            setRPSUser([newIndex, currLevelInput, currLevelReferences, 0, 0]);
            return newIndex;
        });
        playSound(3);
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

            <Link to= "/selection" className = "generalbutton QuitGame" onClick ={() => quitGame(setRPSUser, ActiveGame, setActiveGame, setPlayer, Player)}>
                Quit Game
            </Link>

            <div className = "gameScreenLayout">

                <h1 className = "headerwords"> Variations: </h1>

                <div className = "RPSlevelsContainer">

                    <div className = "RPSlevelsInnerContainer">
                        <div className = "RPSLevelsWindowContainer">

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

                        <div className = "RPSLevelsWindowContainer">

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

                        <div className = "RPSLevelsWindowContainer">

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
                    Continue to Game
                </Link>
                
            </div>

        </div>
        
    );
}

export default LevelSelectionscreen;