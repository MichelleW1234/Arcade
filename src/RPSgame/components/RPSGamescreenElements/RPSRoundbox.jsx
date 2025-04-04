import React, { useState } from 'react';

import { useRPSUser} from '../../Providers/RPSUserProvider.jsx';

import {decideRoundWinnerFunction} from "../../Helpers/RPShelpers.js";

import {playSound} from "../../../Helpers/helpers.js";
import RPSSuccess from "../../../Music/RPSSuccess.mp3";

import "./RPSRoundbox.css";

function Roundbox ({round, setShowFlag, setResult, setTerminationFlag}){

    const { RPSUser, setRPSUser } = useRPSUser();
    const currInput = RPSUser[1];
    const currLevel= RPSUser[0];

    const [error, setError] = useState("");


    const ProcessingInput = () => {
        
        const inputNumber = Number(inputValue);
        if (1 <= inputNumber && inputNumber <= currInput.length) {

            playSound(3);
            setError("");  

            const winner = decideRoundWinnerFunction(currLevel, inputNumber, setResult);

            if (winner === 1){

                new Audio(RPSSuccess).play();
                setRPSUser((prev) => {
                    const updatedUser = [...prev];
                    updatedUser[3] += 1;
                    return updatedUser;
                });

            } else if (winner === 0){

                setRPSUser((prev) => {
                    const updatedUser = [...prev];
                    updatedUser[4] += 1;
                    return updatedUser;
                });

            } else if (winner === 3){

                setRPSUser((prev) => {
                    const updatedUser = [...prev];
                    updatedUser[3] = 10;
                    updatedUser[4] = 0;
                    return updatedUser;
                });

                new Audio(RPSSuccess).play();
                setTerminationFlag(true);
                
            } else if (winner === -3){

                setRPSUser((prev) => {
                    const updatedUser = [...prev];
                    updatedUser[3] = 0;
                    updatedUser[4] = 10;
                    return updatedUser;
                });

                setTerminationFlag(true);

            }

            setShowFlag(true);
            setInputValue("");

        } else {

            playSound(5);
            setError("Please enter a number between 1 and " + currInput.length);

        }

    };

    const [inputValue, setInputValue] = useState("");

    // For textbox:
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