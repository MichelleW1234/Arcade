import React, { useState} from "react";
import Round from "./RPSGamescreenElements/RPSRoundbox.jsx";
import Results from "./RPSGamescreenElements/RPSResultsscreen.jsx";
import Navbar from "./RPSGamescreenElements/RPSNavbar.jsx";
import References from "./RPSGamescreenElements/RPSFloatingReferences.jsx";

import { useRPSUser} from '../Providers/RPSUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../Providers/PlayerProvider.jsx';

import {pointsDistribution} from "../../Helpers/helpers.js";



import "./RPSGamescreen.css";

function Gamescreen (){

    const { ActiveGame, setActiveGame } = useActiveGame();
    const { Player, setPlayer } = usePlayer();

    const { RPSUser, setRPSUser } = useRPSUser();

    const [showReferences, setShowReferences] = useState(false);
    const [rounds, setRounds] = useState(1);
    const [showFlag, setShowFlag] = useState(false);
    const [result, setResult] = useState();
    const [terminationFlag, setTerminationFlag] = useState(false);

    const getPoints  = () => {
        
        let winner;

        if (RPSUser[4] > RPSUser[3]){

            winner = 0;

        } else if (RPSUser[4] < RPSUser[3]){

            winner = 1;

        } else {

            winner = -1;

        }
        
        pointsDistribution(ActiveGame, winner, setPlayer);

    }

    return (
        <div>
            
            <Navbar
                setShowReferences = {setShowReferences}
            />

            {showReferences && 
            (<References/>)}
                    
            {rounds < 11 ? (
                
                <div className="RPSgameScreen">

                    <Round 
                        round={rounds} 
                        setShowFlag={setShowFlag}
                        setResult = {setResult}
                        setTerminationFlag = {setTerminationFlag}
                    />

                    {showFlag && (
        
                        <Results
                            result = {result}
                            setRounds={setRounds}
                            setShowFlag={setShowFlag}
                            terminationFlag = {terminationFlag}
                        />

                    )}
                </div>

            ) : (

                <div className="screenLayout">

                    <h1 className = "headerwords"> Game Over. </h1>

                    <a href={"/RPSsummary"}>
                        <button className="generalbutton" onClick={getPoints}> View Game Summary </button>
                    </a>
                
                </div>

            )}

        </div>
    );
}

export default Gamescreen;