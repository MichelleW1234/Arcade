import React from 'react';
import "./Resultsscreen.css";

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
        <div className = "floatingFlag">

            <div className = "resultsContainer"> 
                
            {result.map((line, index) => (
                <p 
                    className={`results${index === 1 ? "glitch" : ""}`}
                    key={index}
                >
                    {line}
                </p>
            ))}

                <button className = "floatingButton" onClick={handleHideFlag}> Close </button>
            </div>

        </div>
    );
}

export default Resultsscreen;