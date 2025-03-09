import React, { useState} from "react";
import Round from "./RPSGamescreenElements/RPSRoundbox.jsx";
import Results from "./RPSGamescreenElements/RPSResultsscreen.jsx";
import Navbar from "./RPSGamescreenElements/RPSNavbar.jsx";
import References from "./RPSGamescreenElements/RPSFloatingReferences.jsx";
import "./RPSGamescreen.css";

function Gamescreen (){

    const [showReferences, setShowReferences] = useState(false);
    const [rounds, setRounds] = useState(1);
    const [showFlag, setShowFlag] = useState(false);
    const [computerWins, setComputerWins] = useState(0);
    const [userWins, setUserWins] = useState(0);
    const [result, setResult] = useState();
    const [terminationFlag, setTerminationFlag] = useState(false);

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
                        setComputerWins = {setComputerWins}
                        setUserWins = {setUserWins}
                        result = {result}
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

                    <a href={`/RPSsummary?computerWins=${computerWins}&userWins=${userWins}`}>
                        <button className="generalbutton"> View Game Summary </button>
                    </a>
                
                </div>

            )}

        </div>
    );
}

export default Gamescreen;