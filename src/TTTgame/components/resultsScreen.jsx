import { useStarter } from '../Providers/StarterProvider.jsx';
import { useWinner } from '../Providers/WinnerProvider.jsx';
import "./resultsScreen.css";

function resultsScreen() {

    const { Starter, setStarter} = useStarter();
    const { Winner, setWinner} = useWinner();

    const reset = () => {

        setStarter(-1);
        setWinner(-1);

    }

    return (
        <div className = "screenLayout">

            <div className = "scoreboard">
                <h1> Result: </h1>
                <h1>{Winner === 0 ? ("You lost. :("): Winner === 1 ? ("You won! :)") : ("It's a draw!")}</h1>
            </div>
           
           <div className = "buttonsContainer">
                <a href = "/arcadeStart">
                    <button className = "generalbutton" onClick={() => reset()}> Exit Game </button>
                </a>

                <a href = "/TTTcoinFlip">
                    <button className = "generalbutton" onClick={() => reset()}> Play Again </button>
                </a>
            </div>
        </div>
    )
}

export default resultsScreen