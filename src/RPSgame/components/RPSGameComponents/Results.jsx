import "./Results.css";

import {handleHideFlag} from "../../Helpers/helpers.js";

function Results ({result, rounds, setRounds, setShowFlag, terminationFlag}){

    return (
        <div className = "navBarFloatingFlag">

            <div className = "RPSresultsContainer"> 
                
                {result.map((line, index) => (
                    <p 
                        className={`RPSresults${index === 1 ? "glitch" : ""}`}
                        key={index}
                    >
                        {line}
                    </p>
                ))}

                    <button className = "generalbutton" onClick={() => handleHideFlag(terminationFlag, rounds, setRounds, setShowFlag)}> Close </button>
            </div>

        </div>
    );
}

export default Results;