import {useNavigate, Link } from 'react-router-dom';
import {useState} from "react";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import { useExitPoints } from "../../hooks/useExitPoints";

import Round from "./RPSGameComponents/Roundbox.jsx";
import Results from "./RPSGameComponents/Results.jsx";
import Navbar from "./RPSGameComponents/Navbar.jsx";
import References from "./RPSGameComponents/FloatingReferences.jsx";

import { useRPSUser} from '../Providers/RPSUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../Providers/PlayerProvider.jsx';

import {handleHideFlag} from "../Helpers/helpers.js";
import {pointsDistribution} from "../../Helpers/helpers.js";

import "./Gamescreen.css";

function Gamescreen (){

    const { ActiveGame, setActiveGame } = useActiveGame();
    const { Player, setPlayer } = usePlayer();

    const { RPSUser, setRPSUser } = useRPSUser();

    const [showReferences, setShowReferences] = useState(false);
    const [rounds, setRounds] = useState(1);
    const [showFlag, setShowFlag] = useState(false);
    const [result, setResult] = useState();
    const [terminationFlag, setTerminationFlag] = useState(false);


    const navigate = useNavigate();
    
    useKeyboardShortcut("Enter", () => {
        if (showReferences == false && showFlag == false){
            if (rounds >= 11 || terminationFlag == true){
                document.querySelectorAll(".ViewResults").forEach(el => {
                    el.classList.add("active");
                    setTimeout(() => el.classList.remove("active"), 100);
                });
                document.querySelectorAll(".Close").forEach(el => el.classList.remove("active"));

                getWinner();
                navigate("/RPSsummary");
            }
        } else if (showReferences == false){
            if (showFlag == true){
                document.querySelectorAll(".Close").forEach(el => {
                    el.classList.add("active");
                    setTimeout(() => el.classList.remove("active"), 100);
                });
                document.querySelectorAll(".ViewResults").forEach(el => el.classList.remove("active"));

                handleHideFlag(terminationFlag, rounds, setRounds, setShowFlag);
            }
        }
    });



    useExitPoints(() => {
        const adjustedPoints = [Player[0] - ActiveGame[1]];
        localStorage.setItem("Player", JSON.stringify(adjustedPoints));
        setPlayer(adjustedPoints);
    });

    

    const getWinner  = () => {
        
        let winner;

        if (RPSUser[4] > RPSUser[3]){

            winner = 0;

        } else if (RPSUser[4] < RPSUser[3]){

            winner = 1;

        } else {

            winner = -1;

        }
        
        pointsDistribution(ActiveGame, winner, setPlayer, Player);

    }

    return (
        <div>

            <Navbar
                showReferences = {showReferences}
                setShowReferences = {setShowReferences}
                showFlag = {showFlag}
            />

            {showReferences && (<References
                setShowReferences = {setShowReferences}
            />)}
            
            <div className="gameScreenLayout">

                {rounds < 11 ? (

                    <>
                        <Round 
                            round={rounds} 
                            showReferences = {showReferences}
                            showFlag = {showFlag}
                            setShowFlag={setShowFlag}
                            setResult = {setResult}
                            terminationFlag = {terminationFlag}
                            setTerminationFlag = {setTerminationFlag}
                        />

                        {showFlag && (
            
                            <Results
                                result = {result}
                                rounds = {rounds}
                                setRounds={setRounds}
                                setShowFlag={setShowFlag}
                                terminationFlag = {terminationFlag}
                            />

                        )}
                    </>

                ) : (

                    <div className = "RPSgameBoard">
                        <h1 className = "RPSSign">
                            <span className = "signGlitch">Game Over.</span>
                        </h1>

                        <Link to="/RPSsummary" className="RPSButton ViewResults" onClick={() => getWinner()}>
                            <div className="buttonNameContainer"> View Results <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                        </Link>
                    </div>
                    
                )}
            </div>

        </div>
    );
}

export default Gamescreen;