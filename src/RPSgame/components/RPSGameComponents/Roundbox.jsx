import {useEffect, useRef, useState} from 'react';

import { useRPSUser} from '../../Providers/RPSUserProvider.jsx';

import {decideRoundWinnerFunction} from "../../Helpers/helpers.js";

import {playSound} from "../../../Helpers/helpers.js";

import "./Roundbox.css";

function Roundbox ({round, showReferences, showFlag, setShowFlag, setResult, setTerminationFlag}){

    const { RPSUser, setRPSUser } = useRPSUser();
    const currInput = RPSUser[1];
    const currLevel= RPSUser[0];

    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const inputRef = useRef(null);
    useEffect(() => {
        if (!showFlag){
            inputRef.current?.focus();
        }
    }, [showFlag]);

    // For textbox:

    const handleKeyDown = (e) => {
        if (showReferences == false){
            if (e.key === "Enter" && showFlag != true) {
                e.preventDefault(); // prevent form submission or default behaviors
                ProcessingInput();
            }
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const ProcessingInput = () => {
        
        const inputNumber = Number(inputValue);
        if (1 <= inputNumber && inputNumber <= currInput.length) {

            playSound(3);
            setError("");  

            const winner = decideRoundWinnerFunction(currLevel, inputNumber, setResult);

            if (winner === 1){

                playSound(16);

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

                playSound(16);
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


    return (

        <div className="RPSgameBoard">
            <h1 className = "RPSSign"><span className="signGlitch">Round:{round}</span></h1>

            <div className = "RPSdirections">
                <p>Enter one of the following in the space below: </p>
                {currInput.map((item, index) => (
                    <p key={index}> &gt; Enter {index+1} for {item} </p>
                ))}
            </div>

            <input 
                className = "RPStextbox"
                type="text"
                ref={inputRef}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={showFlag}
                placeholder="Type here..."
            />

            <button className = "RPSenterButton" onClick={() => ProcessingInput()}>Enter </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>

    );
}

export default Roundbox;