import React, { useState } from 'react';
import { decideRoundWinnerLevel1, decideRoundWinnerLevel2, decideRoundWinnerLevel3 } from "../../Helpers/RPShelpers.js";
import { useInput } from '../../Providers/RPSInputProvider.jsx';
import { useLevel } from '../../Providers/RPSLevelProvider.jsx'; 
import "./RPSRoundbox.css";

function Roundbox ({round, setShowFlag, setComputerWins, setUserWins, result, 
    setResult, setTerminationFlag}){

    const {input} = useInput();
    const currInput = input;
    const {level} = useLevel();
    const currLevel = level;

    const [error, setError] = useState("");

    const functions = {decideRoundWinnerLevel1, decideRoundWinnerLevel2, decideRoundWinnerLevel3};

    const ProcessingInput = () => {

        if (1 <= inputValue && inputValue <= currInput.length) {

            setError(""); 

            const functionName = `decideRoundWinnerLevel${currLevel}`;
            const winner = functions[functionName](Number(inputValue), result, setResult);

            if (winner == 1){

                setUserWins((prevUserWins) => prevUserWins + 1);

            } else if (winner == 0){

                setComputerWins((prevComputerWins) => prevComputerWins + 1);

            } else if (winner == 3){

                setUserWins(10);
                setComputerWins(0);
                setTerminationFlag(true);
                
            } else if (winner == -3){

                setComputerWins(10);
                setUserWins(0);
                setTerminationFlag(true);

            }

            setShowFlag(true);
            setInputValue("");

        } else {

            setError("Please enter a number between 1 and " + currInput.length);

        }

    };

    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (

        <div className="RPSgameScreenContainer">
            <h1 className = "RPSRoundNumberSign"><span className="RPSRoundNumberSignGlitch">Round:</span>{round}</h1>

            <div className = "RPSdirections">
                <p>Enter one of the following in the space below: </p>
                {currInput.map((item, index) => (
                    <p key={index}> &gt; Enter {index+1} for {item} </p>
                ))}
            </div>

            <input 
                className = "RPStextbox"
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Type here..."
            />

            <button className = "RPSenterButton" onClick={ProcessingInput}>Enter </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>

    );
}

export default Roundbox;