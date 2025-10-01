import {useEffect, useRef, useState} from 'react';

import { useRPSUser} from '../../Providers/RPSUserProvider.jsx';

import {decideRoundWinnerFunction} from "../../Helpers/helpers.js";

import {playSound} from "../../../Helpers/helpers.js";

import "./Roundbox.css";

function Roundbox ({round, showReferences, showFlag, setShowFlag, setResult, terminationFlag, setTerminationFlag}){

    const { RPSUser, setRPSUser } = useRPSUser();
    const currInput = RPSUser[1];
    const currLevel= RPSUser[0];

    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const inputRef = useRef(null);
    useEffect(() => {
        if (showFlag === false){
            inputRef.current?.focus();
        }
    }, [showFlag]);



    const handleKeyDown = (e) => {
        if (showReferences === false && round < 11 && terminationFlag === false){
            if (e.key === "Enter" && showFlag === false) {
                e.preventDefault();

                document.querySelectorAll(".Enter").forEach(el => {
                    el.classList.add("active");
                    setTimeout(() => el.classList.remove("active"), 100);
                });

                processingInput();
            }
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const processingInput = () => {
        
        const inputNumber = Number(inputValue);
        if (1 <= inputNumber && inputNumber <= currInput.length) {

            playSound(3);
            setError("");  

            const winner = decideRoundWinnerFunction(currLevel, inputNumber, setResult);

            if (winner === 1){

                playSound(16);

                setRPSUser(prev => {
                    const updatedUser = [...prev];
                    updatedUser[3] += 1;
                    return updatedUser;
                });

            } else if (winner === 0){

                setRPSUser(prev => {
                    const updatedUser = [...prev];
                    updatedUser[4] += 1;
                    return updatedUser;
                });

            } else if (winner === 3){

                setRPSUser(prev => {
                    const updatedUser = [...prev];
                    updatedUser[3] = 10;
                    updatedUser[4] = 0;
                    return updatedUser;
                });

                playSound(16);
                setTerminationFlag(true);
                
            } else if (winner === -3){

                setRPSUser(prev => {
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

            <button className = "RPSenterButton Enter" onClick={() => processingInput()}>
                <div className="buttonNameContainer">Enter <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>

    );
}

export default Roundbox;