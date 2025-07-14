import React, { useState} from "react";
import { Link } from 'react-router-dom';

import Round from "./RPSGameComponents/Roundbox.jsx";
import Results from "./RPSGameComponents/Results.jsx";
import Navbar from "./RPSGameComponents/Navbar.jsx";
import References from "./RPSGameComponents/FloatingReferences.jsx";

import { useRPSUser} from '../Providers/RPSUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../Providers/PlayerProvider.jsx';

import {playSound, pointsDistribution} from "../../Helpers/helpers.js";

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

    
    const viewSummary  = () => {

        playSound(1);
        getPoints();

    }

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

            {showReferences && (<References/>)}
            
            <div className="RPSgameScreenLayout">

                {rounds < 11 ? (

                    <>
                        <Round 
                            round={rounds} 
                            setShowFlag={setShowFlag}
                            setResult = {setResult}
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
                            <span className = "RPSSignGlitch">Game Over.</span>
                        </h1>

                        <Link to="/RPSsummary" className="RPSButton" onClick={() => viewSummary()}>
                            View Game Summary
                        </Link>
                    </div>
                    
                )}
            </div>

        </div>
    );
}

export default Gamescreen;