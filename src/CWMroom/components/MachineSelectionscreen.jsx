import { useNavigate, Link } from 'react-router-dom';
import {useState, useRef} from 'react';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../Providers/PlayerProvider.jsx';

import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

import CatMachine from "../../Images/image 27.svg";
import SportsMachine from "../../Images/image 28.svg";
import SpaceMachine from "../../Images/image 29.svg";

import "./MachineSelectionscreen.css";

function MachineSelectionscreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player, setPlayer } = usePlayer(); 

    const [activeButton, setActiveButton] = useState(0);
    const [currGamePath, setCurrGamePath] = useState("/CWMcatinstructions");

    const navigate = useNavigate();
    useKeyboardShortcut("Escape", () => {
        exitClawArcade();
        navigate("/selection");
    });

    useKeyboardShortcut("Enter", () => {
        playSound(2);
        navigate(currGamePath);
    });

    const totalButtons = 3;
    const leftRightButtonsRef = useRef([]);
    useKeyboardShortcut("ArrowLeft", () => {
        setActiveButton((prev) => {
            const newIndex = (prev - 1 + totalButtons) % totalButtons;
            if (newIndex == 0){

                setCurrGamePath("/CWMcatinstructions");

            } else if (newIndex == 1){

                setCurrGamePath("/CWMsportsinstructions");

            } else if (newIndex == 2){

                setCurrGamePath("/CWMspaceinstructions");

            }
            return newIndex;
        });
        playSound(3);
    });
    useKeyboardShortcut("ArrowRight", () => {
        setActiveButton((prev) => {
            const newIndex = (prev + 1) % totalButtons;
            if (newIndex == 0){

                setCurrGamePath("/CWMcatinstructions");

            } else if (newIndex == 1){

                setCurrGamePath("/CWMsportsinstructions");

            } else if (newIndex == 2){

                setCurrGamePath("/CWMspaceinstructions");

            }
            return newIndex;
        });
        playSound(3);
    });




    const handleClick = (index) => {
    
        playSound(3);
        setActiveButton(index);

        if (index == 0){

            setCurrGamePath("/CWMcatinstructions");

        } else if (index == 1){

            setCurrGamePath("/CWMsportsinstructions");

        } else if (index == 2){

            setCurrGamePath("/CWMspaceinstructions");

        }

    };

    const exitClawArcade = () => {

        playSound(24);
        setActiveGame(retrieveActiveGame(0));

    }

    return (

        <div>
            <Link to="/selection" className = "generalbutton" onClick={() => exitClawArcade()}>
                Leave Claw Arcade
            </Link>
            <div className = "gameScreenLayout">

                <h1 className = "pointsSign"> Your Points: <span className = "signGlitch">{Player[0]}</span></h1>

                <div className = "CWMGameSelectionBoard">

                    <div className = "CWMGameSelectionBoardInner">

                        <div className = "CWMMachineOptionContainer">

                            <div className = "CWMMachine"> 
                                
                                <p> <span className='windowGlitch'>Cats</span></p>
                                <img className= "CWMMachineImages" src = {CatMachine}/>
                                
                            </div>

                            <button
                            ref={(el) => (leftRightButtonsRef.current[0] = el)}
                            className={`CWMMachineButton ${activeButton === 0 ? 'active' : ''}`}
                            onClick={() => handleClick(0)}
                            >
                                Select
                            </button>

                        </div>

                        <div className = "CWMMachineOptionContainer">

                            <div className = "CWMMachine"> 
                                
                                <p>Sports</p>
                                <img className = "CWMMachineImages" src={SportsMachine}/>
                                
                            </div>

                            <button
                            ref={(el) => (leftRightButtonsRef.current[1] = el)}
                            className={`CWMMachineButton ${activeButton === 1 ? 'active' : ''}`}
                            onClick={() => handleClick(1)}
                            >
                                Select
                            </button>
                            
                        </div>

                        <div className = "CWMMachineOptionContainer">

                            <div className = "CWMMachine"> 
                                
                                <p>Space</p>
                                <img className= "CWMMachineImages" src = {SpaceMachine}/>
                               
                            </div>

                            <button
                            ref={(el) => (leftRightButtonsRef.current[2] = el)}
                            className={`CWMMachineButton ${activeButton === 2 ? 'active' : ''}`}
                            onClick={() => handleClick(2)}
                            >
                                Select
                            </button>
                            
                        </div>

                    </div>

                </div>

                {Player[0] >= ActiveGame[1] ? (
                
                    <Link to={currGamePath} className = "generalbuttonGlitch" onClick = {() => playSound(2)}>
                        Go to Machine
                    </Link>

                ) : (

                    <p className = "largefont"> You don't have enough points to use this machine.</p>

                )}
                
            </div>
        </div>

    );

}


export default MachineSelectionscreen;