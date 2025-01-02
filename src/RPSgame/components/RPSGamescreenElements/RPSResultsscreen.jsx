import React from 'react';
import "./RPSResultsscreen.css";

function Resultsscreen ({result, setRounds, setShowFlag, terminationFlag}){

    const handleHideFlag = () => {

        if (terminationFlag == true){

            setRounds(11);
            setShowFlag(false);

        } else {

            setRounds((prevRounds) => prevRounds + 1);
            setShowFlag(false);

        }

    }

    return (
        <div className = "RPSfloatingFlag">

            <div className = "RPSresultsContainer"> 
                
            {result.map((line, index) => (
                <p 
                    className={`RPSresults${index === 1 ? "glitch" : ""}`}
                    key={index}
                >
                    {line}
                </p>
            ))}

                <button className = "RPSfloatingButton" onClick={handleHideFlag}> Close </button>
            </div>

        </div>
    );
}

export default Resultsscreen;