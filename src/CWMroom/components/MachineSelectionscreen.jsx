import { useNavigate, Link } from 'react-router-dom';
import {useRef, useState, useEffect} from 'react';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../Providers/PlayerProvider.jsx';

import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

import CatMachine from "../../Images/ArcadeGameImages/CWMCat.svg";
import SportsMachine from "../../Images/ArcadeGameImages/CWMSports.svg";
import SpaceMachine from "../../Images/ArcadeGameImages/CWMSpace.svg";

import "./MachineSelectionscreen.css";

function MachineSelectionscreen (){

    const { ActiveGame, setActiveGame} = useActiveGame();
    const { Player } = usePlayer(); 

    const [activeButton, setActiveButton] = useState(0);
    const [currGamePath, setCurrGamePath] = useState("/CWMcatinstructions");

    const navigate = useNavigate();
    useKeyboardShortcut("Escape", () => {
        exitClawArcade();
        navigate("/selection");
    },
        ".LeaveClawArcade"
    );

    useKeyboardShortcut("Enter", (event) => {

        event.preventDefault();
        event.stopPropagation();

        if (Player[0] >= ActiveGame[1]){
            playSound(2);
            navigate(currGamePath);
        }
    },
        ".GotoMachine"
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

        switch (activeButton) {
            case 0:
                setCurrGamePath("/CWMcatinstructions");
                break;
            case 1:
                setCurrGamePath("/CWMsportsinstructions");
                break;
            case 2:
                setCurrGamePath("/CWMspaceinstructions");
                break;
            default:
                break;
        }

        // Scroll the active element into view
        itemRefs.current[activeButton]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });
    }, [activeButton]);




    
    const handleClick = (index) => {
    
        playSound(3);
        setActiveButton(index);

        if (index === 0){

            setCurrGamePath("/CWMcatinstructions");

        } else if (index === 1){

            setCurrGamePath("/CWMsportsinstructions");

        } else if (index === 2){

            setCurrGamePath("/CWMspaceinstructions");

        }

    };

    const exitClawArcade = () => {

        playSound(24);
        setActiveGame(retrieveActiveGame(0));

    }

    return (

        <div>
            <Link to="/selection" className = "generalbutton LeaveClawArcade" onClick={() => exitClawArcade()}>
                <div className="buttonNameContainer"> Leave Claw Arcade <br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
            </Link>
            <div className = "gameScreenLayout">

                <h1 className = "instructionsSign"> Your Points: <span className = "signGlitch">{Player[0]}</span></h1>

                <div className = "CWMGameSelectionBoard">

                    <p className='largefont'>[&larr;] [&rarr;]</p>

                    <div className = "CWMGameSelectionBoardInner">

                        <div className = "CWMMachineOptionContainer"
                            ref={(el) => (itemRefs.current[0] = el)}>

                            <div className = "CWMMachine"> 
                                
                                <p> <span className='windowGlitch'>Cats</span></p>
                                <img className= "CWMMachineImages" src = {CatMachine}/>
                                
                            </div>

                            <button
                            className={`CWMMachineButton ${activeButton === 0 ? 'active' : ''}`}
                            onClick={() => handleClick(0)}
                            >
                                Select
                            </button>

                        </div>

                        <div className = "CWMMachineOptionContainer"
                            ref={(el) => (itemRefs.current[1] = el)}>

                            <div className = "CWMMachine"> 
                                
                                <p>Sports</p>
                                <img className = "CWMMachineImages" src={SportsMachine}/>
                                
                            </div>

                            <button
                            className={`CWMMachineButton ${activeButton === 1 ? 'active' : ''}`}
                            onClick={() => handleClick(1)}
                            >
                                Select
                            </button>
                            
                        </div>

                        <div className = "CWMMachineOptionContainer"
                            ref={(el) => (itemRefs.current[2] = el)}>

                            <div className = "CWMMachine"> 
                                
                                <p>Space</p>
                                <img className= "CWMMachineImages" src = {SpaceMachine}/>
                               
                            </div>

                            <button
                            className={`CWMMachineButton ${activeButton === 2 ? 'active' : ''}`}
                            onClick={() => handleClick(2)}
                            >
                                Select
                            </button>
                            
                        </div>

                    </div>

                </div>

                {Player[0] >= ActiveGame[1] ? (
                
                    <Link to={currGamePath} className = "generalbuttonGlitch GotoMachine" onClick = {() => playSound(2)}>
                        <div className="buttonNameContainer"> Go to Machine <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                    </Link>

                ) : (

                    <p className = "largefont"> You don't have enough points to use this machine.</p>

                )}
                
            </div>
        </div>

    );

}


export default MachineSelectionscreen;