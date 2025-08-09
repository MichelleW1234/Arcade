import "./Results.css";

import {playSound} from "../../../Helpers/helpers.js";

function Results ({result, rounds, setRounds, setShowFlag, terminationFlag, closeButtonRef}){

    const handleHideFlag = () => {

        playSound(3);
        if (terminationFlag == true){

            setRounds(11);
            setShowFlag(false);
            playSound(6);

        } else {

            if (rounds == 10){

                playSound(6);

            }

            setRounds((prevRounds) => prevRounds + 1);
            setShowFlag(false);

        }

    }

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

                    <button ref = {closeButtonRef} className = "generalbutton" onClick={() => handleHideFlag()}> Close </button>
            </div>

        </div>
    );
}

export default Results;